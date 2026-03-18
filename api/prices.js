// Top 100 MLB Prospect Card Price Tracker API v3
// Full parallel/variation parsing engine + Bowman + Pro Debut dual search
// 6-hour cache to minimize API calls within eBay rate limits

const ALL_PROSPECTS = [
  // BATCH 1 (prospects 1-10)
  { key: 'griffin', name: 'Konnor Griffin', search: 'Konnor Griffin', team: 'PIT' },
  { key: 'mcgonigle', name: 'Kevin McGonigle', search: 'Kevin McGonigle', team: 'DET' },
  { key: 'made', name: 'Jesús Made', search: 'Jesus Made', team: 'MIL' },
  { key: 'devries', name: 'Leo De Vries', search: 'Leo De Vries', team: 'OAK' },
  { key: 'wetherholt', name: 'JJ Wetherholt', search: 'JJ Wetherholt', team: 'STL' },
  { key: 'mclean', name: 'Nolan McLean', search: 'Nolan McLean', team: 'NYM' },
  { key: 'walcott', name: 'Sebastian Walcott', search: 'Sebastian Walcott', team: 'TEX' },
  { key: 'basallo', name: 'Samuel Basallo', search: 'Samuel Basallo', team: 'BAL' },
  { key: 'emerson', name: 'Colt Emerson', search: 'Colt Emerson', team: 'SEA' },
  { key: 'clark', name: 'Max Clark Tigers', search: 'Max Clark Tigers', team: 'DET' },

  // BATCH 2 (prospects 11-20)
  { key: 'chandler', name: 'Bubba Chandler', search: 'Bubba Chandler', team: 'PIT' },
  { key: 'yesavage', name: 'Trey Yesavage', search: 'Trey Yesavage', team: 'TOR' },
  { key: 'willits', name: 'Eli Willits', search: 'Eli Willits', team: 'WSH' },
  { key: 'jenkins', name: 'Walker Jenkins', search: 'Walker Jenkins', team: 'MIN' },
  { key: 'depaula', name: 'Josue De Paula', search: 'Josue De Paula', team: 'LAD' },
  { key: 'benge', name: 'Carson Benge', search: 'Carson Benge', team: 'NYM' },
  { key: 'white', name: 'Thomas White Marlins', search: 'Thomas White Marlins', team: 'MIA' },
  { key: 'jensen', name: 'Carter Jensen Royals', search: 'Carter Jensen Royals', team: 'KC' },
  { key: 'tolle', name: 'Payton Tolle', search: 'Payton Tolle', team: 'BOS' },
  { key: 'bazzana', name: 'Travis Bazzana', search: 'Travis Bazzana', team: 'CLE' },

  // BATCH 3 (prospects 21-30)
  { key: 'anderson', name: 'Kade Anderson', search: 'Kade Anderson Mariners', team: 'SEA' },
  { key: 'stewart', name: 'Sal Stewart', search: 'Sal Stewart Reds', team: 'CIN' },
  { key: 'miller', name: 'Aidan Miller', search: 'Aidan Miller Phillies', team: 'PHI' },
  { key: 'holliday', name: 'Ethan Holliday', search: 'Ethan Holliday', team: 'COL' },
  { key: 'eldridge', name: 'Bryce Eldridge', search: 'Bryce Eldridge', team: 'SF' },
  { key: 'lpena', name: 'Luis Peña', search: 'Luis Pena Brewers', team: 'MIL' },
  { key: 'hope', name: 'Zyhir Hope', search: 'Zyhir Hope', team: 'LAD' },
  { key: 'painter', name: 'Andrew Painter', search: 'Andrew Painter', team: 'PHI' },
  { key: 'shernandez', name: 'Seth Hernandez', search: 'Seth Hernandez Pirates', team: 'PIT' },
  { key: 'quintero', name: 'Eduardo Quintero', search: 'Eduardo Quintero Dodgers', team: 'LAD' },

  // BATCH 4 (prospects 31-40)
  { key: 'arias', name: 'Franklin Arias', search: 'Franklin Arias Red Sox', team: 'BOS' },
  { key: 'lombard', name: 'George Lombard Jr.', search: 'George Lombard Jr', team: 'NYY' },
  { key: 'sloan', name: 'Ryan Sloan', search: 'Ryan Sloan Mariners', team: 'SEA' },
  { key: 'doyle', name: 'Liam Doyle', search: 'Liam Doyle Cardinals', team: 'STL' },
  { key: 'rainer', name: 'Bryce Rainer', search: 'Bryce Rainer', team: 'DET' },
  { key: 'montgomery', name: 'Braden Montgomery', search: 'Braden Montgomery', team: 'CWS' },
  { key: 'rrodriguez', name: 'Rainiel Rodriguez', search: 'Rainiel Rodriguez Cardinals', team: 'STL' },
  { key: 'duno', name: 'Alfredo Duno', search: 'Alfredo Duno', team: 'CIN' },
  { key: 'snelling', name: 'Robby Snelling', search: 'Robby Snelling', team: 'MIA' },
  { key: 'briceno', name: 'Josue Briceño', search: 'Josue Briceno', team: 'DET' },

  // BATCH 5 (prospects 41-50)
  { key: 'arnold', name: 'Jamie Arnold', search: 'Jamie Arnold Athletics', team: 'OAK' },
  { key: 'caissie', name: 'Owen Caissie', search: 'Owen Caissie', team: 'MIA' },
  { key: 'montes', name: 'Lazaro Montes', search: 'Lazaro Montes', team: 'SEA' },
  { key: 'jgonzalez', name: 'Josuar Gonzalez', search: 'Josuar Gonzalez', team: 'SF' },
  { key: 'parker', name: 'JoJo Parker', search: 'JoJo Parker Blue Jays', team: 'TOR' },
  { key: 'delauter', name: 'Chase DeLauter', search: 'Chase DeLauter', team: 'CLE' },
  { key: 'arquette', name: 'Aiva Arquette', search: 'Aiva Arquette', team: 'MIA' },
  { key: 'tong', name: 'Jonah Tong', search: 'Jonah Tong', team: 'NYM' },
  { key: 'schultz', name: 'Noah Schultz', search: 'Noah Schultz White Sox', team: 'CWS' },
  { key: 'florentino', name: 'Edward Florentino', search: 'Edward Florentino', team: 'PIT' },

  // BATCH 6 (prospects 51-60)
  { key: 'jwilliams', name: 'Jett Williams', search: 'Jett Williams', team: 'MIL' },
  { key: 'culpepper', name: 'Kaelen Culpepper', search: 'Kaelen Culpepper', team: 'MIN' },
  { key: 'crawford', name: 'Justin Crawford', search: 'Justin Crawford Phillies', team: 'PHI' },
  { key: 'sykora', name: 'Travis Sykora', search: 'Travis Sykora', team: 'WSH' },
  { key: 'ballesteros', name: 'Moisés Ballesteros', search: 'Moises Ballesteros', team: 'CHC' },
  { key: 'early', name: 'Connelly Early', search: 'Connelly Early', team: 'BOS' },
  { key: 'jump', name: 'Gage Jump', search: 'Gage Jump Athletics', team: 'OAK' },
  { key: 'wiggins', name: 'Jaxon Wiggins', search: 'Jaxon Wiggins', team: 'CHC' },
  { key: 'waldschmidt', name: 'Ryan Waldschmidt', search: 'Ryan Waldschmidt', team: 'ARI' },
  { key: 'sirota', name: 'Mike Sirota', search: 'Mike Sirota Dodgers', team: 'LAD' },

  // BATCH 7 (prospects 61-70)
  { key: 'bonemer', name: 'Caleb Bonemer', search: 'Caleb Bonemer', team: 'CWS' },
  { key: 'mack', name: 'Joe Mack', search: 'Joe Mack Marlins', team: 'MIA' },
  { key: 'cwilliams', name: 'Carson Williams', search: 'Carson Williams Rays', team: 'TB' },
  { key: 'pratt', name: 'Cooper Pratt', search: 'Cooper Pratt', team: 'MIL' },
  { key: 'tait', name: 'Eduardo Tait', search: 'Eduardo Tait', team: 'MIN' },
  { key: 'genao', name: 'Angel Genao', search: 'Angel Genao', team: 'CLE' },
  { key: 'arroyo', name: 'Michael Arroyo', search: 'Michael Arroyo Mariners', team: 'SEA' },
  { key: 'caminiti', name: 'Cam Caminiti', search: 'Cam Caminiti', team: 'ATL' },
  { key: 'beavers', name: 'Dylan Beavers', search: 'Dylan Beavers', team: 'BAL' },
  { key: 'condon', name: 'Charlie Condon', search: 'Charlie Condon', team: 'COL' },

  // BATCH 8 (prospects 71-80)
  { key: 'ford', name: 'Harry Ford', search: 'Harry Ford Nationals', team: 'WSH' },
  { key: 'hsmith', name: 'Hagen Smith', search: 'Hagen Smith White Sox', team: 'CWS' },
  { key: 'carlson', name: 'Billy Carlson', search: 'Billy Carlson White Sox', team: 'CWS' },
  { key: 'erodriguez', name: 'Emmanuel Rodriguez', search: 'Emmanuel Rodriguez Twins', team: 'MIN' },
  { key: 'bmitchell', name: 'Blake Mitchell', search: 'Blake Mitchell Royals', team: 'KC' },
  { key: 'gillen', name: 'Theo Gillen', search: 'Theo Gillen Rays', team: 'TB' },
  { key: 'nimmala', name: 'Arjun Nimmala', search: 'Arjun Nimmala', team: 'TOR' },
  { key: 'farmelo', name: 'Jonny Farmelo', search: 'Jonny Farmelo', team: 'SEA' },
  { key: 'lagrange', name: 'Carlos Lagrange', search: 'Carlos Lagrange', team: 'NYY' },
  { key: 'susana', name: 'Jarlin Susana', search: 'Jarlin Susana', team: 'WSH' },

  // BATCH 9 (prospects 81-90)
  { key: 'bremner', name: 'Tyler Bremner', search: 'Tyler Bremner Angels', team: 'LAA' },
  { key: 'elrodriguez', name: 'Elmer Rodríguez', search: 'Elmer Rodriguez Yankees', team: 'NYY' },
  { key: 'hall', name: 'Steele Hall', search: 'Steele Hall Reds', team: 'CIN' },
  { key: 'witherspoon', name: 'Kyson Witherspoon', search: 'Kyson Witherspoon', team: 'BOS' },
  { key: 'hopkins', name: 'Brody Hopkins', search: 'Brody Hopkins Rays', team: 'TB' },
  { key: 'lowder', name: 'Rhett Lowder', search: 'Rhett Lowder', team: 'CIN' },
  { key: 'jbaez', name: 'Joshua Báez', search: 'Joshua Baez Cardinals', team: 'STL' },
  { key: 'schoolcraft', name: 'Kruz Schoolcraft', search: 'Kruz Schoolcraft', team: 'SD' },
  { key: 'velazquez', name: 'Ralphy Velazquez', search: 'Ralphy Velazquez', team: 'CLE' },
  { key: 'ritchie', name: 'JR Ritchie', search: 'JR Ritchie Braves', team: 'ATL' },

  // BATCH 10 (prospects 91-100)
  { key: 'cijntje', name: 'Jurrangelo Cijntje', search: 'Jurrangelo Cijntje', team: 'STL' },
  { key: 'morales', name: 'Emil Morales', search: 'Emil Morales Dodgers', team: 'LAD' },
  { key: 'ngeorge', name: 'Nate George', search: 'Nate George Orioles', team: 'BAL' },
  { key: 'kilby', name: 'Dax Kilby', search: 'Dax Kilby Yankees', team: 'NYY' },
  { key: 'messick', name: 'Parker Messick', search: 'Parker Messick', team: 'CLE' },
  { key: 'barco', name: 'Hunter Barco', search: 'Hunter Barco', team: 'PIT' },
  { key: 'ewing', name: 'A.J. Ewing', search: 'AJ Ewing Mets', team: 'NYM' },
  { key: 'bernal', name: 'Leo Bernal', search: 'Leo Bernal Cardinals', team: 'STL' },
  { key: 'ingle', name: 'Cooper Ingle', search: 'Cooper Ingle', team: 'CLE' },
  { key: 'sproat', name: 'Brandon Sproat', search: 'Brandon Sproat', team: 'MIL' },
];

const CATEGORY_ID = '261328'; // Sports Trading Cards
const AFFILIATE_CAMPAIGN = '5339144695';

// Cache for OAuth tokens
let cachedAccessToken = null;
let tokenExpiresAt = 0;

// ═══════════════════════════════════════════════════════════════════
// TITLE PARSING ENGINE
// Extracts structured data from eBay listing titles
// ═══════════════════════════════════════════════════════════════════

/**
 * Parse an eBay listing title into structured card data
 */
function parseListingTitle(title) {
  var t = title || '';

  return {
    year: extractYear(t),
    product: extractProduct(t),
    cardType: extractCardType(t),
    isFirstBowman: detectFirstBowman(t),
    isAuto: detectAuto(t),
    parallel: extractParallel(t),
    serial: extractSerial(t),
    grade: extractGrade(t),
    gradeCompany: extractGradeCompany(t),
    isNumbered: /\/\d{1,4}\b/.test(t) || /1\/1/i.test(t),
    isSuperFractor: /superfractor|1\/1/i.test(t),
    isPrintingPlate: /printing\s*plate|cyan\s*plate|magenta\s*plate|yellow\s*plate|black\s*plate/i.test(t),
    isSP: /\b(sp|ssp|short\s*print|super\s*short\s*print)\b/i.test(t),
  };
}

function extractYear(t) {
  var match = t.match(/\b(20[0-3][0-9])\b/);
  return match ? parseInt(match[1]) : null;
}

function extractProduct(t) {
  var lower = t.toLowerCase();
  if (/bowman\s*sapphire/i.test(t)) return 'Bowman Sapphire';
  if (/bowman\s*sterling/i.test(t)) return 'Bowman Sterling';
  if (/bowman\s*draft/i.test(t)) return 'Bowman Draft';
  if (/bowman\s*chrome/i.test(t)) return 'Bowman Chrome';
  if (/bowman/i.test(t)) return 'Bowman';
  if (/topps\s*chrome\s*pro\s*debut/i.test(t)) return 'Topps Chrome Pro Debut';
  if (/pro\s*debut/i.test(t)) return 'Topps Pro Debut';
  if (/topps\s*chrome/i.test(t)) return 'Topps Chrome';
  if (/topps/i.test(t)) return 'Topps';
  return 'Other';
}

function extractCardType(t) {
  var lower = t.toLowerCase();
  if (/sapphire/i.test(t)) return 'Sapphire';
  if (/sterling/i.test(t)) return 'Sterling';
  if (/mojo/i.test(t)) return 'Mojo';
  if (/chrome/i.test(t)) return 'Chrome';
  if (/paper/i.test(t)) return 'Paper';
  return 'Base';
}

function detectFirstBowman(t) {
  return /1st\s*bowman|bowman\s*1st|first\s*bowman/i.test(t);
}

function detectAuto(t) {
  return /\b(auto|autograph|signed)\b/i.test(t);
}

function extractParallel(t) {
  // Check patterns first (more specific before generic colors)
  if (/superfractor/i.test(t)) return 'Superfractor';
  if (/printing\s*plate/i.test(t)) {
    if (/cyan/i.test(t)) return 'Cyan Printing Plate';
    if (/magenta/i.test(t)) return 'Magenta Printing Plate';
    if (/yellow/i.test(t)) return 'Yellow Printing Plate';
    if (/black/i.test(t)) return 'Black Printing Plate';
    return 'Printing Plate';
  }
  if (/canary\s*diamond/i.test(t)) return 'Canary Diamond';
  if (/rose\s*gold\s*wave/i.test(t)) return 'Rose Gold Wave';
  if (/rose\s*gold/i.test(t)) return 'Rose Gold';
  if (/lunar/i.test(t)) return 'Lunar Refractor';
  if (/mini\s*diamond/i.test(t)) return 'Mini Diamond';
  if (/ray\s*wave/i.test(t)) return 'RayWave';

  // Pattern refractors
  if (/aqua\s*lava/i.test(t)) return 'Aqua Lava';
  if (/gold\s*lava/i.test(t)) return 'Gold Lava';
  if (/red\s*lava/i.test(t)) return 'Red Lava';
  if (/lava/i.test(t)) return 'Lava Refractor';
  if (/blue\s*wave/i.test(t)) return 'Blue Wave';
  if (/green\s*wave/i.test(t)) return 'Green Wave';
  if (/gold\s*wave/i.test(t)) return 'Gold Wave';
  if (/orange\s*wave/i.test(t)) return 'Orange Wave';
  if (/red\s*wave/i.test(t)) return 'Red Wave';
  if (/wave/i.test(t)) return 'Wave Refractor';
  if (/speckle/i.test(t)) return 'Speckle Refractor';
  if (/shimmer/i.test(t)) return 'Shimmer Refractor';
  if (/atomic/i.test(t)) return 'Atomic Refractor';
  if (/mojo/i.test(t)) return 'Mojo Refractor';

  // Color refractors (check "color refractor" combos, then standalone colors)
  if (/sky\s*blue/i.test(t)) return 'Sky Blue Refractor';
  if (/purple\s*refractor/i.test(t)) return 'Purple Refractor';
  if (/blue\s*refractor/i.test(t)) return 'Blue Refractor';
  if (/green\s*refractor/i.test(t)) return 'Green Refractor';
  if (/gold\s*refractor/i.test(t)) return 'Gold Refractor';
  if (/orange\s*refractor/i.test(t)) return 'Orange Refractor';
  if (/red\s*refractor/i.test(t)) return 'Red Refractor';
  if (/aqua\s*refractor/i.test(t)) return 'Aqua Refractor';
  if (/pink\s*refractor/i.test(t)) return 'Pink Refractor';
  if (/magenta\s*refractor/i.test(t)) return 'Magenta Refractor';
  if (/yellow\s*refractor/i.test(t)) return 'Yellow Refractor';
  if (/white\s*refractor/i.test(t)) return 'White Refractor';
  if (/black\s*refractor/i.test(t)) return 'Black Refractor';
  if (/independence\s*day/i.test(t)) return 'Independence Day';

  // Standalone refractor
  if (/refractor/i.test(t)) return 'Refractor';

  // Standalone colors with /serial context (likely parallels)
  if (/\/\d/.test(t)) {
    if (/\bpurple\b/i.test(t)) return 'Purple';
    if (/\bblue\b/i.test(t)) return 'Blue';
    if (/\bgreen\b/i.test(t)) return 'Green';
    if (/\bgold\b/i.test(t)) return 'Gold';
    if (/\borange\b/i.test(t)) return 'Orange';
    if (/\bred\b/i.test(t)) return 'Red';
    if (/\bblack\b/i.test(t)) return 'Black';
    if (/\baqua\b/i.test(t)) return 'Aqua';
    if (/\bpink\b/i.test(t)) return 'Pink';
  }

  return 'Base';
}

function extractSerial(t) {
  // Match /number patterns like /150, /50, /25, /5, /1
  var match = t.match(/\/(\d{1,4})\b/);
  if (match) return parseInt(match[1]);
  if (/1\/1/i.test(t) || /superfractor/i.test(t)) return 1;
  return null;
}

function extractGrade(t) {
  // PSA 10, PSA10, BGS 9.5, SGC 10, etc.
  var match = t.match(/\b(?:psa|bgs|sgc|cgc|hga|csg|isa)\s*(\d+\.?\d*)/i);
  if (match) return parseFloat(match[1]);
  if (/gem\s*mint/i.test(t)) return 10;
  if (/pristine/i.test(t)) return 10;
  return null;
}

function extractGradeCompany(t) {
  if (/\bpsa\b/i.test(t)) return 'PSA';
  if (/\bbgs\b/i.test(t)) return 'BGS';
  if (/\bsgc\b/i.test(t)) return 'SGC';
  if (/\bcgc\b/i.test(t)) return 'CGC';
  if (/\bhga\b/i.test(t)) return 'HGA';
  if (/\bcsg\b/i.test(t)) return 'CSG';
  if (/\bisa\b/i.test(t)) return 'ISA';
  return null;
}


// ═══════════════════════════════════════════════════════════════════
// CARD RELEVANCE FILTERS
// ═══════════════════════════════════════════════════════════════════

function isRelevantBowman(title) {
  return /auto(graph)?/i.test(title) && /bowman/i.test(title);
}

function isRelevantProDebut(title) {
  return /auto(graph)?/i.test(title) && /pro\s*debut/i.test(title);
}

function isJunk(title) {
  return /\blot\b|\blots\b|bulk|reprint|digital|sticker|custom|fake|\brp\b|mystery|break|random/i.test(title);
}

function isGraded(title) {
  return /\bpsa\b|\bbgs\b|\bsgc\b|\bcgc\b|\bhga\b|\bcsg\b|\bisa\b|\bgraded\b|\bslab\b|\bgem\s*mint\b|\bpristine\b/i.test(title);
}


// ═══════════════════════════════════════════════════════════════════
// PRICE ANALYTICS
// ═══════════════════════════════════════════════════════════════════

function trimmedMean(prices) {
  if (prices.length === 0) return null;
  if (prices.length <= 4) {
    var sum = prices.reduce(function(a, b) { return a + b; }, 0);
    return Math.round(sum / prices.length * 100) / 100;
  }
  var sorted = prices.slice().sort(function(a, b) { return a - b; });
  var trimCount = Math.max(1, Math.floor(sorted.length * 0.1));
  var trimmed = sorted.slice(trimCount, sorted.length - trimCount);
  if (trimmed.length === 0) trimmed = sorted;
  var sum = trimmed.reduce(function(a, b) { return a + b; }, 0);
  return Math.round(sum / trimmed.length * 100) / 100;
}

/**
 * Aggregate listings into all/raw/graded with parsed data
 */
function aggregateSplit(items) {
  var rawItems = items.filter(function(i) { return !i.graded; });
  var gradedItems = items.filter(function(i) { return i.graded; });

  function agg(list) {
    if (list.length === 0) return null;
    var prices = list.map(function(i) { return i.price; }).sort(function(a, b) { return a - b; });
    return {
      count: list.length,
      avg: trimmedMean(prices),
      high: prices[prices.length - 1],
      low: prices[0],
      items: list.slice(0, 6),
    };
  }

  return {
    all: agg(items),
    raw: agg(rawItems),
    graded: agg(gradedItems),
  };
}

/**
 * Build parallel distribution from parsed items
 */
function buildParallelDistribution(items) {
  var dist = {};
  items.forEach(function(item) {
    if (item.parsed) {
      var p = item.parsed.parallel || 'Base';
      if (!dist[p]) dist[p] = { count: 0, avgPrice: 0, prices: [] };
      dist[p].count++;
      dist[p].prices.push(item.price);
    }
  });
  // Calculate averages
  Object.keys(dist).forEach(function(key) {
    dist[key].avgPrice = trimmedMean(dist[key].prices) || 0;
    delete dist[key].prices; // Clean up
  });
  return dist;
}

/**
 * Build grade distribution from parsed items
 */
function buildGradeDistribution(items) {
  var dist = {};
  items.forEach(function(item) {
    if (item.parsed && item.parsed.gradeCompany) {
      var key = item.parsed.gradeCompany + ' ' + (item.parsed.grade || '?');
      if (!dist[key]) dist[key] = { count: 0, avgPrice: 0, prices: [] };
      dist[key].count++;
      dist[key].prices.push(item.price);
    }
  });
  Object.keys(dist).forEach(function(key) {
    dist[key].avgPrice = trimmedMean(dist[key].prices) || 0;
    delete dist[key].prices;
  });
  return dist;
}

/**
 * Build product distribution from parsed items
 */
function buildProductDistribution(items) {
  var dist = {};
  items.forEach(function(item) {
    if (item.parsed) {
      var p = item.parsed.product || 'Other';
      if (!dist[p]) dist[p] = { count: 0, avgPrice: 0, prices: [] };
      dist[p].count++;
      dist[p].prices.push(item.price);
    }
  });
  Object.keys(dist).forEach(function(key) {
    dist[key].avgPrice = trimmedMean(dist[key].prices) || 0;
    delete dist[key].prices;
  });
  return dist;
}


// ═══════════════════════════════════════════════════════════════════
// EBAY API INTEGRATION
// ═══════════════════════════════════════════════════════════════════

async function getAccessToken() {
  if (cachedAccessToken && Date.now() < tokenExpiresAt - 60000) return cachedAccessToken;
  var clientId = process.env.EBAY_CLIENT_ID;
  var clientSecret = process.env.EBAY_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error('Missing eBay credentials');
  var credentials = Buffer.from(clientId + ':' + clientSecret).toString('base64');
  var res = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + credentials,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope',
  });
  if (!res.ok) throw new Error('OAuth failed: ' + res.status);
  var data = await res.json();
  cachedAccessToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in * 1000);
  return cachedAccessToken;
}

/**
 * Browse API: Active listings with full title parsing
 */
async function searchActive(token, query) {
  var campaignId = process.env.EBAY_AFFILIATE_CAMPAIGN_ID || AFFILIATE_CAMPAIGN;
  var params = new URLSearchParams({
    q: query,
    category_ids: CATEGORY_ID,
    limit: '100',
    sort: 'newlyListed',
  });

  try {
    var res = await fetch(
      'https://api.ebay.com/buy/browse/v1/item_summary/search?' + params,
      {
        headers: {
          'Authorization': 'Bearer ' + token,
          'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
          'X-EBAY-C-ENDUSERCTX': 'affiliateCampaignId=' + campaignId,
        },
      }
    );
    if (!res.ok) {
      var errBody = '';
      try { errBody = await res.text(); } catch(e2) {}
      console.error('Browse API HTTP ' + res.status + ': ' + errBody);
      return { items: [], total: 0, debug: 'HTTP ' + res.status + ': ' + errBody.substring(0, 200) };
    }
    var data = await res.json();
    return {
      items: (data.itemSummaries || []).map(function(item) {
        var title = item.title || '';
        var parsed = parseListingTitle(title);
        return {
          price: item.price ? parseFloat(item.price.value) : null,
          title: title,
          graded: isGraded(title),
          condition: item.condition || '',
          url: item.itemAffiliateWebUrl || item.itemWebUrl || '',
          image: (item.thumbnailImages && item.thumbnailImages[0] ? item.thumbnailImages[0].imageUrl : null) || (item.image ? item.image.imageUrl : null),
          source: 'active',
          parsed: parsed,
        };
      }).filter(function(i) { return i.price && i.price > 0 && !isJunk(i.title); }),
      total: data.total || 0,
    };
  } catch (e) {
    console.error('Browse API error:', e.message);
    return { items: [], total: 0, debug: 'exception: ' + e.message };
  }
}

/**
 * Finding API: Sold/completed listings with full title parsing
 */
async function searchSold(appId, query) {
  var url = 'https://svcs.ebay.com/services/search/FindingService/v1'
    + '?OPERATION-NAME=findCompletedItems'
    + '&SERVICE-VERSION=1.13.0'
    + '&SECURITY-APPNAME=' + encodeURIComponent(appId)
    + '&RESPONSE-DATA-FORMAT=JSON'
    + '&REST-PAYLOAD'
    + '&keywords=' + encodeURIComponent(query)
    + '&categoryId=' + CATEGORY_ID
    + '&itemFilter(0).name=SoldItemsOnly'
    + '&itemFilter(0).value=true'
    + '&sortOrder=StartTimeNewest'
    + '&paginationInput.entriesPerPage=100';

  try {
    var res = await fetch(url);
    var responseText = await res.text();

    if (!res.ok) {
      console.error('Finding API HTTP ' + res.status);
      return { items: [], total: 0, debug: 'HTTP ' + res.status };
    }

    var data;
    try {
      data = JSON.parse(responseText);
    } catch (parseErr) {
      return { items: [], total: 0, debug: 'JSON parse error' };
    }

    var response = data.findCompletedItemsResponse;
    if (!response || !response[0]) {
      return { items: [], total: 0, debug: 'no response object' };
    }

    var ack = response[0].ack ? response[0].ack[0] : '';
    if (ack === 'Failure') {
      var errMsg = '';
      if (response[0].errorMessage && response[0].errorMessage[0] && response[0].errorMessage[0].error) {
        errMsg = response[0].errorMessage[0].error.map(function(e) { return (e.message ? e.message[0] : ''); }).join('; ');
      }
      return { items: [], total: 0, debug: 'API failure: ' + errMsg };
    }

    var searchResult = response[0].searchResult;
    if (!searchResult || !searchResult[0] || !searchResult[0].item) {
      var count = searchResult && searchResult[0] ? (searchResult[0]['@count'] || '0') : '0';
      return { items: [], total: 0, debug: 'no items, count=' + count };
    }

    var totalEntries = 0;
    if (response[0].paginationOutput && response[0].paginationOutput[0]) {
      totalEntries = parseInt(response[0].paginationOutput[0].totalEntries[0]) || 0;
    }

    var items = searchResult[0].item.map(function(item) {
      var price = null;
      if (item.sellingStatus && item.sellingStatus[0] && item.sellingStatus[0].currentPrice) {
        price = parseFloat(item.sellingStatus[0].currentPrice[0].__value__);
      }
      var title = item.title ? item.title[0] : '';
      var parsed = parseListingTitle(title);
      var soldDate = null;
      if (item.listingInfo && item.listingInfo[0] && item.listingInfo[0].endTime) {
        soldDate = item.listingInfo[0].endTime[0];
      }

      return {
        price: price,
        title: title,
        graded: isGraded(title),
        url: item.viewItemURL ? item.viewItemURL[0] : '',
        image: item.galleryURL ? item.galleryURL[0] : null,
        soldDate: soldDate,
        source: 'sold',
        parsed: parsed,
      };
    }).filter(function(i) { return i.price && i.price > 0 && !isJunk(i.title); });

    return { items: items, total: totalEntries, debug: 'ok, items=' + items.length };
  } catch (e) {
    console.error('Finding API error:', e.message);
    return { items: [], total: 0, debug: 'exception: ' + e.message };
  }
}


// ═══════════════════════════════════════════════════════════════════
// PROSPECT DATA FETCHING
// ═══════════════════════════════════════════════════════════════════

function buildAffiliateUrl(prospectName, searchType) {
  var campid = process.env.EBAY_AFFILIATE_CAMPAIGN_ID || AFFILIATE_CAMPAIGN;
  var suffix = searchType === 'prodebut' ? ' Pro Debut auto' : ' Bowman auto';
  var query = encodeURIComponent(prospectName + suffix);
  return 'https://www.ebay.com/sch/i.html?_nkw=' + query
    + '&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=' + campid + '&toolid=10001&mkevt=1';
}

async function fetchProspectData(prospect, accessToken, clientId) {
  try {
    var bowmanQuery = prospect.search + ' Bowman auto';
    var proDebutQuery = prospect.search + ' Pro Debut auto';

    var results = await Promise.allSettled([
      searchActive(accessToken, bowmanQuery),
      searchSold(clientId, bowmanQuery),
      searchActive(accessToken, proDebutQuery),
      searchSold(clientId, proDebutQuery),
    ]);

    var bowmanActiveRaw = results[0].status === 'fulfilled' ? results[0].value : { items: [], total: 0 };
    var bowmanSoldRaw = results[1].status === 'fulfilled' ? results[1].value : { items: [], total: 0 };
    var pdActiveRaw = results[2].status === 'fulfilled' ? results[2].value : { items: [], total: 0 };
    var pdSoldRaw = results[3].status === 'fulfilled' ? results[3].value : { items: [], total: 0 };

    // Filter to relevant cards
    var bowmanActiveItems = bowmanActiveRaw.items.filter(function(i) { return isRelevantBowman(i.title); });
    var bowmanSoldItems = bowmanSoldRaw.items.filter(function(i) { return isRelevantBowman(i.title); });
    var pdActiveItems = pdActiveRaw.items.filter(function(i) { return isRelevantProDebut(i.title); });
    var pdSoldItems = pdSoldRaw.items.filter(function(i) { return isRelevantProDebut(i.title); });

    // Aggregate with raw/graded split
    var bowmanActiveSplit = aggregateSplit(bowmanActiveItems);
    var bowmanSoldSplit = aggregateSplit(bowmanSoldItems);
    var pdActiveSplit = aggregateSplit(pdActiveItems);
    var pdSoldSplit = aggregateSplit(pdSoldItems);

    // Build distributions from ALL bowman items (active + sold)
    var allBowmanItems = bowmanActiveItems.concat(bowmanSoldItems);
    var parallelDist = buildParallelDistribution(allBowmanItems);
    var gradeDist = buildGradeDistribution(allBowmanItems);
    var productDist = buildProductDistribution(allBowmanItems);

    // Count 1st Bowman items
    var firstBowmanCount = allBowmanItems.filter(function(i) { return i.parsed && i.parsed.isFirstBowman; }).length;
    var numberedCount = allBowmanItems.filter(function(i) { return i.parsed && i.parsed.isNumbered; }).length;

    console.log(prospect.name + ': Bowman active=' + bowmanActiveItems.length +
      ' sold=' + bowmanSoldItems.length +
      ', PD active=' + pdActiveItems.length +
      ' sold=' + pdSoldItems.length +
      ', 1st=' + firstBowmanCount +
      ', numbered=' + numberedCount);

    return {
      key: prospect.key,
      name: prospect.name,
      team: prospect.team,
      bowmanChrome: {
        active: bowmanActiveSplit,
        sold: bowmanSoldSplit,
        activeTotal: bowmanActiveRaw.total,
        soldTotal: bowmanSoldRaw.total,
        affiliateUrl: buildAffiliateUrl(prospect.name, 'bowman'),
      },
      proDebut: {
        active: pdActiveSplit,
        sold: pdSoldSplit,
        activeTotal: pdActiveRaw.total,
        soldTotal: pdSoldRaw.total,
        affiliateUrl: buildAffiliateUrl(prospect.name, 'prodebut'),
      },
      insights: {
        parallelDistribution: parallelDist,
        gradeDistribution: gradeDist,
        productDistribution: productDist,
        firstBowmanCount: firstBowmanCount,
        numberedCount: numberedCount,
        totalListings: allBowmanItems.length + pdActiveItems.length + pdSoldItems.length,
      },
      debug: {
        bowmanActive: bowmanActiveRaw.debug || 'ok, items=' + bowmanActiveItems.length,
        bowmanSold: bowmanSoldRaw.debug || 'no debug',
        pdActive: pdActiveRaw.debug || 'ok, items=' + pdActiveItems.length,
        pdSold: pdSoldRaw.debug || 'no debug',
      }
    };
  } catch (error) {
    console.error('Error fetching data for ' + prospect.name + ':', error);
    return {
      key: prospect.key,
      name: prospect.name,
      team: prospect.team,
      bowmanChrome: {
        active: { all: null, raw: null, graded: null },
        sold: { all: null, raw: null, graded: null },
        activeTotal: 0,
        soldTotal: 0,
        affiliateUrl: buildAffiliateUrl(prospect.name, 'bowman'),
        error: error.message,
      },
      proDebut: {
        active: { all: null, raw: null, graded: null },
        sold: { all: null, raw: null, graded: null },
        activeTotal: 0,
        soldTotal: 0,
        affiliateUrl: buildAffiliateUrl(prospect.name, 'prodebut'),
      },
      insights: {
        parallelDistribution: {},
        gradeDistribution: {},
        productDistribution: {},
        firstBowmanCount: 0,
        numberedCount: 0,
        totalListings: 0,
      }
    };
  }
}


// ═══════════════════════════════════════════════════════════════════
// MAIN HANDLER
// ═══════════════════════════════════════════════════════════════════

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=43200');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    var batchNum = parseInt(req.query.batch) || 1;
    if (batchNum < 1 || batchNum > 10) batchNum = 1;

    var startIdx = (batchNum - 1) * 10;
    var endIdx = startIdx + 10;
    var batchProspects = ALL_PROSPECTS.slice(startIdx, endIdx);

    var accessToken = await getAccessToken();
    var clientId = process.env.EBAY_CLIENT_ID;

    var prospects = await Promise.all(
      batchProspects.map(function(prospect) {
        return fetchProspectData(prospect, accessToken, clientId);
      })
    );

    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      batch: batchNum,
      totalBatches: 10,
      version: 3,
      prospects: prospects,
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}
