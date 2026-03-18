// MLB Stats API integration for Prospect Card Radar
// Fetches player bios, stats, and level info from statsapi.mlb.com
// No authentication needed — completely free API

// In-memory caches
var idCache = {};       // name -> mlbId
var statsCache = {};    // key -> { data, timestamp }
var STATS_CACHE_TTL = 4 * 60 * 60 * 1000; // 4 hours

// Look up MLB player ID by name
async function lookupPlayerId(name) {
  var cleanName = name.replace(/ (Tigers|Marlins|Reds|Phillies|Mariners|Royals|Cardinals|Red Sox|Athletics|Blue Jays|White Sox|Rays|Nationals|Pirates|Dodgers|Brewers|Angels|Yankees)$/i, '');
  if (idCache[cleanName]) return idCache[cleanName];

  try {
    var url = 'https://statsapi.mlb.com/api/v1/people/search?names=' + encodeURIComponent(cleanName);
    var res = await fetch(url);
    if (!res.ok) return null;
    var data = await res.json();
    if (data.people && data.people.length > 0) {
      // Try to find active player, prefer younger players (prospects)
      var sorted = data.people.sort(function(a, b) { return (b.currentAge || 0) - (a.currentAge || 0); });
      // Prefer players under 26 (prospects)
      var prospect = sorted.find(function(p) { return p.currentAge && p.currentAge < 26; }) || sorted[0];
      idCache[cleanName] = prospect.id;
      return prospect.id;
    }
  } catch (e) {
    console.error('MLB ID lookup error for ' + name + ':', e.message);
  }
  return null;
}

async function fetchPlayerData(mlbId) {
  try {
    var url = 'https://statsapi.mlb.com/api/v1/people/' + mlbId
      + '?hydrate=currentTeam,stats(group=[hitting,pitching],type=season)';
    var res = await fetch(url);
    if (!res.ok) return null;
    var data = await res.json();
    var player = data.people && data.people[0];
    if (!player) return null;

    // Extract bio
    var bio = {
      mlbId: player.id,
      fullName: player.fullName,
      age: player.currentAge,
      height: player.height,
      weight: player.weight,
      bats: player.batSide ? player.batSide.code : null,
      throws: player.pitchHand ? player.pitchHand.code : null,
      position: player.primaryPosition ? player.primaryPosition.abbreviation : null,
      positionName: player.primaryPosition ? player.primaryPosition.name : null,
      birthDate: player.birthDate,
      birthCity: player.birthCity,
      birthCountry: player.birthCountry,
      draftYear: player.draftYear || null,
      mlbDebutDate: player.mlbDebutDate || null,
    };

    // Current team/level
    var currentTeam = null;
    var level = null;
    if (player.currentTeam) {
      currentTeam = {
        id: player.currentTeam.id,
        name: player.currentTeam.name,
        abbreviation: player.currentTeam.abbreviation || null,
        parentOrgName: player.currentTeam.parentOrgName || player.currentTeam.name,
        sport: player.currentTeam.sport ? player.currentTeam.sport.name : null,
        sportId: player.currentTeam.sport ? player.currentTeam.sport.id : null,
      };
      var sportId = currentTeam.sportId;
      if (sportId === 1) level = 'MLB';
      else if (sportId === 11) level = 'AAA';
      else if (sportId === 12) level = 'AA';
      else if (sportId === 13) level = 'A+';
      else if (sportId === 14) level = 'A';
      else if (sportId === 15) level = 'A-';
      else if (sportId === 16) level = 'ROK';
      else if (sportId === 17) level = 'WIN';
      else level = 'MiLB';
    }

    // Extract stats
    var hitting = null;
    var pitching = null;
    if (player.stats) {
      player.stats.forEach(function(s) {
        if (s.group && s.group.displayName === 'hitting' && s.splits && s.splits.length > 0) {
          var split = s.splits[s.splits.length - 1];
          if (split.stat) {
            hitting = {
              avg: split.stat.avg || null,
              obp: split.stat.obp || null,
              slg: split.stat.slg || null,
              ops: split.stat.ops || null,
              hr: split.stat.homeRuns || 0,
              rbi: split.stat.rbi || 0,
              sb: split.stat.stolenBases || 0,
              hits: split.stat.hits || 0,
              gamesPlayed: split.stat.gamesPlayed || 0,
              atBats: split.stat.atBats || 0,
              season: split.season || null,
              team: split.team ? split.team.name : null,
            };
          }
        }
        if (s.group && s.group.displayName === 'pitching' && s.splits && s.splits.length > 0) {
          var split = s.splits[s.splits.length - 1];
          if (split.stat) {
            pitching = {
              era: split.stat.era || null,
              whip: split.stat.whip || null,
              wins: split.stat.wins || 0,
              losses: split.stat.losses || 0,
              strikeOuts: split.stat.strikeOuts || 0,
              inningsPitched: split.stat.inningsPitched || null,
              gamesPlayed: split.stat.gamesPlayed || 0,
              gamesStarted: split.stat.gamesStarted || 0,
              saves: split.stat.saves || 0,
              season: split.season || null,
              team: split.team ? split.team.name : null,
            };
          }
        }
      });
    }

    var headshot = 'https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/' + mlbId + '/headshot/67/current';

    return {
      bio: bio,
      currentTeam: currentTeam,
      level: level,
      hitting: hitting,
      pitching: pitching,
      headshot: headshot,
    };
  } catch (err) {
    console.error('MLB Stats API error for ID ' + mlbId + ':', err.message);
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=14400, stale-while-revalidate=28800');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // Accept a comma-separated list of prospect names to look up
    var names = req.query.names ? req.query.names.split(',').map(function(n) { return n.trim(); }) : [];
    var keys = req.query.keys ? req.query.keys.split(',').map(function(k) { return k.trim(); }) : [];

    if (names.length === 0 && keys.length === 0) {
      return res.status(200).json({
        success: true,
        usage: {
          byNames: '/api/mlb-stats?names=Konnor+Griffin,JJ+Wetherholt',
          byKeys: '/api/mlb-stats?keys=griffin,wetherholt',
        }
      });
    }

    var results = {};
    var lookups = names.length > 0 ? names : keys;
    var isKeys = keys.length > 0;

    for (var i = 0; i < lookups.length; i++) {
      var lookup = lookups[i];
      var cacheKey = lookup.toLowerCase().replace(/\s+/g, '-');

      // Check cache
      if (statsCache[cacheKey] && (Date.now() - statsCache[cacheKey].timestamp) < STATS_CACHE_TTL) {
        results[cacheKey] = statsCache[cacheKey].data;
        continue;
      }

      // Look up MLB ID by name
      var mlbId = await lookupPlayerId(lookup);
      if (!mlbId) {
        results[cacheKey] = { error: 'Player not found', name: lookup };
        continue;
      }

      var data = await fetchPlayerData(mlbId);
      if (data) {
        statsCache[cacheKey] = { data: data, timestamp: Date.now() };
        results[cacheKey] = data;
      } else {
        results[cacheKey] = { error: 'Failed to fetch stats', mlbId: mlbId };
      }

      // Small delay between lookups
      if (i < lookups.length - 1) {
        await new Promise(function(r) { setTimeout(r, 150); });
      }
    }

    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      count: Object.keys(results).length,
      prospects: results,
    });

  } catch (error) {
    console.error('MLB Stats handler error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
