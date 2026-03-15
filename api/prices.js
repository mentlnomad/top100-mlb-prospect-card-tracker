// Top 100 MLB Prospect Card Price Tracker API
// Batched eBay API calls for efficient data fetching
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
  { key: 'clark', name: 'Max Clark', search: 'Max Clark Tigers', team: 'DET' },

  // BATCH 2 (prospects 11-20)
  { key: 'chandler', name: 'Bubba Chandler', search: 'Bubba Chandler', team: 'PIT' },
  { key: 'yesavage', name: 'Trey Yesavage', search: 'Trey Yesavage', team: 'TOR' },
  { key: 'willits', name: 'Eli Willits', search: 'Eli Willits', team: 'WSH' },
  { key: 'jenkins', name: 'Walker Jenkins', search: 'Walker Jenkins', team: 'MIN' },
  { key: 'depaula', name: 'Josue De Paula', search: 'Josue De Paula', team: 'LAD' },
  { key: 'benge', name: 'Carson Benge', search: 'Carson Benge', team: 'NYM' },
  { key: 'white', name: 'Thomas White', search: 'Thomas White Marlins', team: 'MIA' },
  { key: 'jensen', name: 'Carter Jensen', search: 'Carter Jensen Royals', team: 'KC' },
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

// Cache for OAuth tokens to reduce token generation calls
let cachedAccessToken = null;
let tokenExpiresAt = 0;

/**
 * Determine if a listing is graded based on title keywords
 */
function isGraded(title) {
  const gradedKeywords = /\b(psa|bgs|sgc|cgc|hga|csg|isa|graded|slab|gem\s+mint|pristine)\b/i;
  return gradedKeywords.test(title);
}

/**
 * Check if listing is relevant Bowman autograph
 */
function isRelevantBowman(title) {
  const hasBowman = /bowman/i.test(title);
  const hasAuto = /\b(auto|autograph)\b/i.test(title);
  return hasBowman && hasAuto;
}

/**
 * Filter out junk listings
 */
function isJunk(title) {
  const junkKeywords = /\b(lot|lots|bulk|reprint|digital|sticker|custom|fake|mystery|break|random)\b/i;
  return junkKeywords.test(title);
}

/**
 * Calculate trimmed mean (remove top 10% and bottom 10%)
 */
function trimmedMean(prices) {
  if (prices.length === 0) return 0;
  if (prices.length === 1) return prices[0];

  const sorted = [...prices].sort((a, b) => a - b);
  const trimCount = Math.floor(sorted.length * 0.1);
  const trimmed = sorted.slice(trimCount, sorted.length - trimCount);

  if (trimmed.length === 0) return sorted[0];

  const sum = trimmed.reduce((a, b) => a + b, 0);
  return sum / trimmed.length;
}

/**
 * Aggregate listings into all/raw/graded categories
 */
function aggregateSplit(listings) {
  const all = [];
  const raw = [];
  const graded = [];

  listings.forEach(item => {
    const price = parseFloat(item.price) || 0;
    if (price > 0) {
      all.push(price);
      if (isGraded(item.title)) {
        graded.push(price);
      } else {
        raw.push(price);
      }
    }
  });

  const buildSummary = (prices) => ({
    count: prices.length,
    avg: prices.length > 0 ? trimmedMean(prices) : 0,
    high: prices.length > 0 ? Math.max(...prices) : 0,
    low: prices.length > 0 ? Math.min(...prices) : 0,
    items: prices.length > 0 ? prices : []
  });

  return {
    all: buildSummary(all),
    raw: buildSummary(raw),
    graded: buildSummary(graded)
  };
}

/**
 * Get eBay OAuth token using Client Credentials flow
 */
async function getAccessToken() {
  const now = Date.now();

  // Return cached token if still valid
  if (cachedAccessToken && now < tokenExpiresAt) {
    return cachedAccessToken;
  }

  const clientId = process.env.EBAY_CLIENT_ID;
  const clientSecret = process.env.EBAY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing eBay API credentials (EBAY_CLIENT_ID, EBAY_CLIENT_SECRET)');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope'
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`eBay OAuth error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  cachedAccessToken = data.access_token;
  tokenExpiresAt = now + (data.expires_in * 1000) - 60000; // Refresh 1 min early

  return cachedAccessToken;
}

/**
 * Fetch active listings from eBay Browse API
 */
async function fetchActiveBowmanListings(searchQuery, accessToken) {
  const catalogQuery = `${searchQuery} Bowman autograph`;

  const response = await fetch('https://api.ebay.com/buy/browse/v1/item_summary/search', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    },
    search: new URLSearchParams({
      q: catalogQuery,
      filter: 'conditionIds:{3000}', // New condition
      limit: 100,
      sort: '-price'
    }).toString()
  });

  if (!response.ok) {
    console.error(`Browse API error: ${response.status}`);
    return [];
  }

  const data = await response.json();
  const items = data.itemSummaries || [];

  return items
    .filter(item => isRelevantBowman(item.title) && !isJunk(item.title))
    .map(item => ({
      title: item.title,
      price: item.price?.value || '0',
      condition: item.condition,
      url: item.itemWebUrl
    }));
}

/**
 * Fetch sold/completed listings from eBay Finding API
 */
async function fetchSoldBowmanListings(searchQuery, clientId) {
  const catalogQuery = `${searchQuery} Bowman autograph`;

  const response = await fetch('https://svcs.ebay.com/services/search/FindingService/v1', {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    },
    search: new URLSearchParams({
      OPERATION_NAME: 'findCompletedItems',
      SERVICE_VERSION: '1.0.0',
      SECURITY_APPNAME: clientId,
      RESPONSE_DATA_FORMAT: 'JSON',
      REST_PAYLOAD: 'true',
      keywords: catalogQuery,
      itemFilter: 'ListingStatus:Completed',
      outputSelector: 'SellerInfo',
      paginationInput: 'entriesPerPage:100'
    }).toString()
  });

  if (!response.ok) {
    console.error(`Finding API error: ${response.status}`);
    return [];
  }

  const data = await response.json();
  const items = data.findCompletedItemsResponse?.[0]?.searchResult?.[0]?.item || [];

  return items
    .filter(item => {
      const title = item.title?.[0] || '';
      return isRelevantBowman(title) && !isJunk(title);
    })
    .map(item => ({
      title: item.title?.[0] || '',
      price: item.sellingStatus?.[0]?.convertedCurrentPrice?.[0]?.__value__ || '0',
      condition: item.condition?.[0]?.conditionDisplayName?.[0] || '',
      url: item.viewItemURL?.[0] || ''
    }));
}

/**
 * Build affiliate URL for eBay listings
 */
function buildAffiliateUrl(prospectName) {
  const campaignId = process.env.EBAY_AFFILIATE_CAMPAIGN_ID || '5339144695';
  const query = encodeURIComponent(`${prospectName} Bowman autograph`);
  return `https://www.ebay.com/sch/i.html?_nkw=${query}&campid=${campaignId}`;
}

/**
 * Fetch data for a single prospect
 */
async function fetchProspectData(prospect, accessToken, clientId) {
  try {
    const [activeListing, soldListings] = await Promise.all([
      fetchActiveBowmanListings(prospect.search, accessToken),
      fetchSoldBowmanListings(prospect.search, clientId)
    ]);

    return {
      key: prospect.key,
      name: prospect.name,
      team: prospect.team,
      bowmanChrome: {
        active: aggregateSplit(activeListing),
        sold: aggregateSplit(soldListings),
        activeTotal: activeListing.length,
        soldTotal: soldListings.length,
        affiliateUrl: buildAffiliateUrl(prospect.name)
      }
    };
  } catch (error) {
    console.error(`Error fetching data for ${prospect.name}:`, error);
    return {
      key: prospect.key,
      name: prospect.name,
      team: prospect.team,
      bowmanChrome: {
        active: { all: { count: 0, avg: 0, high: 0, low: 0, items: [] }, raw: { count: 0, avg: 0, high: 0, low: 0, items: [] }, graded: { count: 0, avg: 0, high: 0, low: 0, items: [] } },
        sold: { all: { count: 0, avg: 0, high: 0, low: 0, items: [] }, raw: { count: 0, avg: 0, high: 0, low: 0, items: [] }, graded: { count: 0, avg: 0, high: 0, low: 0, items: [] } },
        activeTotal: 0,
        soldTotal: 0,
        affiliateUrl: buildAffiliateUrl(prospect.name),
        error: error.message
      }
    };
  }
}

/**
 * Main handler for Vercel serverless function
 */
export default async function handler(req, res) {
  // Set 6-hour cache on Vercel CDN + stale-while-revalidate
  res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=43200');
  res.setHeader('Content-Type', 'application/json');

  try {
    // Parse batch number from query params (1-10)
    let batchNum = parseInt(req.query.batch) || 1;
    if (batchNum < 1 || batchNum > 10) {
      batchNum = 1;
    }

    // Get prospects for this batch
    const startIdx = (batchNum - 1) * 10;
    const endIdx = startIdx + 10;
    const batchProspects = ALL_PROSPECTS.slice(startIdx, endIdx);

    // Get OAuth token
    const accessToken = await getAccessToken();
    const clientId = process.env.EBAY_CLIENT_ID;

    // Fetch data for all 10 prospects in parallel
    const prospects = await Promise.all(
      batchProspects.map(prospect => fetchProspectData(prospect, accessToken, clientId))
    );

    // Return successful response
    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      batch: batchNum,
      totalBatches: 10,
      prospects
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
