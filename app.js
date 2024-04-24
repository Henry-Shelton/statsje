//to start locally in folder cmd run: pm2 start app.js
//other: pm2 status, pm2 restart app.js, pm2 stop app.js

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

//initialise express
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://www.stats.je');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


//----------------------------//
// API / csv / graphs
//----------------------------//

const request = require('request');

// API
app.get('/api', (req, res) => {
  res.json('HTTP GET request recieved')
})

// Create a custom proxy route
app.get('/proxy', (req, res) => {
  const apiUrl = req.query.targetUrl;

  if (!apiUrl) {
    res.status(400).json({ error: 'Missing target URL' });
    return;
  }

  // Create a proxy request to the target API
  request(apiUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      res.status(response.statusCode || 500).json({ error: 'Failed to fetch data from the API' });
    }
  });
});


// APIs + GRAPHS

// ECONANDBUSINESS APIs
const ECONANDBUSINESSapiRoutes = [
  //econandbusiness/gdp/
  { path: 'gdp', title: 'GDP API' },
  { path: 'gdpSL', title: 'GDP_SL API' },
  { path: 'gdpgrowth', title: 'GDPGrowth API' },
  { path: 'gdppercapita', title: 'GDPperCapita API' },
  //econandbusiness/gva/
  { path: 'gva', title: 'GVA API' },
  { path: 'gvaSL', title: 'GVA_SL API' },
  //econandbusiness/inflation/
  { path: 'rpiy', title: 'RPIY API' },
  { path: 'rpiySL', title: 'RPIY_SL API' },
  { path: 'rpi', title: 'RPI API' },
  { path: 'rpichange', title: 'RPIchange API' },
  //econandbusiness/performance/
  { path: 'economicactivitygrowth', title: 'economicactivitygrowth API' },
  { path: 'costsprices', title: 'costsprices API' },
  { path: 'financialhealth', title: 'financialhealth API' },
  { path: 'economicactivitygrowthSL', title: 'economicactivitygrowth_SL API' },
  //econandbusiness/outlook/
  { path: 'futurebusinessemploy', title: 'futurebusinessemploy API' },
  { path: 'futureprices', title: 'futureprices API' },
  { path: 'futurebusinessemploySL', title: 'futurebusinessemploy_SL API' },
];
ECONANDBUSINESSapiRoutes.forEach(route => {
  app.get(`/api/econandbusiness/${route.path}`, (req, res) => {
    res.render(`api/econandbusiness/${route.path}`, { title: route.title });
  });
});

// EMPLOYMENTANDHOUSING APIs
const EMPLOYMENTANDHOUSINGapiRoutes = [
  //employmentandhousing/employment
  { path: 'employment', title: 'employment API' },
  { path: 'employmentSL', title: 'employment_SL API' },
  { path: 'employmentchange', title: 'employmentchange API' },
  { path: 'unemployment', title: 'unemployment API' },
  //employmentandhousing/employmentbysector
  { path: 'employmentprimary', title: 'employmentsectorprimary API' },
  { path: 'employmentsecondary', title: 'employmentsectorsecondary API' },
  { path: 'employmenttertiary', title: 'employmentsectortertiary API' },
  { path: 'employmentcomparison', title: 'employmentsectorcomparison API' },
  { path: 'employmentcomparisonSL', title: 'employmentcomparisonSL API' },
  //employmentandhousing/hpi
  { path: 'hpi', title: 'hpi API' },
  { path: 'hpiSL', title: 'hpiSL API' },
  { path: 'affordability', title: 'affordability API' },
  //employmentandhousing/averagehouseprice
  { path: 'averagehouseprice', title: 'averagehouseprice API' },
  { path: 'averagehousepriceSL', title: 'averagehousepriceSL API' },
  //employmentandhousing/transactions
  { path: 'transactions', title: 'transactions API' },
  { path: 'transactionsSL', title: 'transactionsSL API' },
  { path: 'transactionsbytype', title: 'transactionsbytype API' },
  { path: 'transactionsbyparish', title: 'transactionsbyparish API' },

];
EMPLOYMENTANDHOUSINGapiRoutes.forEach(route => {
  app.get(`/api/employmentandhousing/${route.path}`, (req, res) => {
    res.render(`api/employmentandhousing/${route.path}`, { title: route.title });
  });
});


// POPULATIONANDSOCIETY APIs
const POPULATIONANDSOCIETYapiRoutes = [
  //populationandsociety/populationandmigration
  { path: 'populationandmigration', title: 'populationandmigration API' },
  { path: 'populationandmigrationSL', title: 'populationandmigrationSL API' },
  { path: 'populationchange', title: 'populationchange API' },
  { path: 'populationmigrationchange', title: 'populationmigrationchange API' },
  //populationandsociety/populationpyramid
  { path: 'populationpyramiddata', title: 'populationpyramiddata API' }, //CUSTOM DATA SOURCE API
  { path: 'populationpyramid', title: 'populationpyramid API' },
  { path: 'populationpyramidSL', title: 'populationpyramidSL API' },
  { path: 'populationpyramiddata2010', title: 'populationpyramiddata2010 API' }, //CUSTOM DATA SOURCE API
  { path: 'populationpyramid2010', title: 'populationpyramid API' },
  //populationandsociety/birthsdeaths
  { path: 'births', title: 'births API' },
  { path: 'deaths', title: 'deaths API' },
  { path: 'birthdeathsSL', title: 'birthdeathsSL API' },

];
POPULATIONANDSOCIETYapiRoutes.forEach(route => {
  app.get(`/api/populationandsociety/${route.path}`, (req, res) => {
    res.render(`api/populationandsociety/${route.path}`, { title: route.title });
  });
});


// HEALTHANDGOV APIs
const HEALTHANDGOVapiRoutes = [
  //healthandgov/generalhealth
  { path: 'obesity', title: 'obesity API' },
  { path: 'obesitySL', title: 'obesitySL API' },
  { path: 'illness', title: 'illness API' },
  //healthandgov/behaviouralhealthtrends
  { path: 'activity', title: 'activity API' },
  { path: 'alcohol', title: 'alcohol API' },
  { path: 'smoking', title: 'smoking API' },
  { path: 'behaviouralhealthtrendsSL', title: 'behaviouralhealthtrendsSL API' },
  //healthandgov/lifeexpectancy
  { path: 'lifeexpectancy', title: 'lifeexpectancy API' },
  { path: 'lifeexpectancySL', title: 'lifeexpectancy API' },
  //healthandgov/immunisation
  { path: 'flu', title: 'flu API' },
  { path: 'fluSL', title: 'fluSL API' },

  //healthandgov/govreports



];
HEALTHANDGOVapiRoutes.forEach(route => {
  app.get(`/api/healthandgov/${route.path}`, (req, res) => {
    res.render(`api/healthandgov/${route.path}`, { title: route.title });
  });
});




// REPORTS APIs

// PUBLIC 2023
const PUBLICapiRoutes = [
  //reports/public2023
  { path: 'tnse', title: 'tnse API' },


];
PUBLICapiRoutes.forEach(route => {
  app.get(`/api/reports/public/${route.path}`, (req, res) => {
    res.render(`api/reports/public/${route.path}`, { title: route.title });
  });
});




//----------------------------//
// Middleware
//----------------------------//

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))

// Set Templating Engine
app.use(expressLayouts)
app.set('layout', './layout')
app.set('reportlayout', './reportlayout')
app.set('view engine', 'ejs')


// Routes

//MAIN PAGE
app.get('/', (req, res) => {
  res.render('index', { title: 'StatsJE - Data Insights & Analytics', meta: 'Statistical insights for Jersey and the Channel Islands. Economic Data, Indicators, Charts, News, Forecasts, AI, and Solutions for Informed Decisions' });
});

//ECONOMIC CALENDAR PAGE
app.get('/calendar', (req, res) => {
  res.render('subsections/calendar', { title: 'Economic Calendar - StatsJE', meta: 'Jersey and UK Economic Calendar, recently released events and older Jersey reports' });
});

//FORECASTS PAGE
app.get('/forecasts', (req, res) => {
  res.render('subsections/forecasts', { title: 'Jersey Forecasts - StatsJE', meta: 'Economic forecasts for Jersey and the Channel Islands. Gain valuable insights for strategic planning and informed decision-making. Markets and Credit Ratings.' });
});

//COMPARISONS PAGE
app.get('/comparisons', (req, res) => {
  res.render('subsections/comparisons', { title: 'Comparisons - StatsJE', meta: 'Explore comparisons between Jersey and other countries on economic and social indicators' });
});

//PROSPECTS PAGE
app.get('/prospects', (req, res) => {
  res.render('subsections/prospects', { title: 'Prospects - StatsJE', meta: 'Elevate your organisations potential with Stats.JE. Unleash the power of cutting-edge analytics and strategic insights designed to empower Jersey-based organizations. Navigate challenges with confidence and make informed decisions for a thriving future.' });
});

//INSIGHTS PAGE
app.get('/insights', (req, res) => {
  res.render('subsections/insights', { title: 'Insights  - StatsJE', meta: 'Stats.JE, latest headlines and insights into Jerseys economy, society, health, and population' });
});

//HELP PAGE
app.get('/help', (req, res) => {
  res.render('subsections/help', { title: 'Help - StatsJE', meta: 'Get help from Stats.JE' });
});

//ABOUT US PAGE
app.get('/about', (req, res) => {
  res.render('subsections/about', { title: 'About - StatsJE', meta: 'Information about the origins, mission, and future aspirations of Stats.JE' });
});

//CHANGELOG PAGE
app.get('/changelog', (req, res) => {
  res.render('subsections/changelog', { title: 'Changelog - StatsJE', meta: 'Stats.JE Updates' });
});




// SITEMAP
app.get('/sitemap.xml', function(req, res) {
  const sitemapPath = path.join(__dirname, 'views', 'sitemap.xml');
  
  // Send the file as the response
  res.sendFile(sitemapPath);
});

// FAVICON
app.get('/favicon.ico', function(req, res) {
  const favicon = path.join(__dirname, 'views', 'favicon.ico');
  
  // Send the file as the response
  res.sendFile(favicon);
});

// ROBOTS
app.get('/robots.txt', function(req, res) {
  const robotsPath = path.join(__dirname, 'views', 'robots.txt');
  
  // Send the file as the response
  res.sendFile(robotsPath);
});






//----------------------------//
//SUBSECTIONS + PAGES
//----------------------------//


//ECONANDBUSINESS
app.get('/econandbusiness', (req, res) => {
  res.render('subsections/econandbusiness', { 
    title: 'Economy and Business', 
    meta: 'Explore Jersey\'s economic statistics, including GDP, GVA, inflation, business performance, and future business outlook.' 
  });
});

const ECONANDBUSINESSsubsections = [
  { path: 'gdp', title: 'GDP', meta: 'Discover Jersey\'s Gross Domestic Product (GDP) statistics and economic performance.' },
  { path: 'gva', title: 'GVA', meta: 'Explore Gross Value Added (GVA) data for Jersey and understand its economic contribution.' },
  { path: 'inflation', title: 'Inflation and RPI', meta: 'Stay informed about inflation rates and Retail Price Index (RPI) trends impacting Jersey\'s economy.' },
  { path: 'performance', title: 'Business Performance', meta: 'Gain insights into the performance of businesses in Jersey and their impact on the economy.' },
  { path: 'outlook', title: 'Future Business Outlook', meta: 'Explore the future business outlook in Jersey and anticipate upcoming economic trends.' },
];

ECONANDBUSINESSsubsections.forEach(subsection => {
  app.get(`/econandbusiness/${subsection.path}`, (req, res) => {
    res.render(`subsections/econandbusiness/${subsection.path}`, { 
      title: subsection.title, 
      meta: `Explore ${subsection.title.toLowerCase()} in Jersey. ${subsection.meta.toLowerCase()}` 
    });
  });
});



//EMPLOYMENTANDHOUSING
app.get('/employmentandhousing', (req, res) => {
  res.render('subsections/employmentandhousing', { 
    title: 'Employment and Housing',
    meta: 'Explore Jersey statistics for housing and employment data. Learn about total employment, employment by sector, House Price Index, average house prices, and property transaction data.' 
  });
});

const EMPLOYMENTANDHOUSINGsubsections = [
  { path: 'employment', title: 'Total Employment', meta: 'Discover comprehensive statistics for total employment in Jersey, including trends and analysis.' },
  { path: 'employmentbysector', title: 'Employment by Sector', meta: 'Explore employment distribution by sector in Jersey. Gain insights into industry-specific employment trends.' },
  { path: 'hpi', title: 'House Price Index', meta: 'Access Jersey House Price Index data. Stay informed about property market trends and house price fluctuations.' },
  { path: 'averagehouseprice', title: 'Average House Price', meta: 'Learn about average house prices in Jersey. Stay updated on residential property values and market conditions.' },
  { path: 'transactions', title: 'Property Transaction Data', meta: 'Get detailed data on property transactions in Jersey. Stay informed about real estate transactions and market activity.' },
];

EMPLOYMENTANDHOUSINGsubsections.forEach(subsection => {
  app.get(`/employmentandhousing/${subsection.path}`, (req, res) => {
    res.render(`subsections/employmentandhousing/${subsection.path}`, { 
      title: subsection.title, 
      meta: `Explore ${subsection.title.toLowerCase()} in Jersey. ${subsection.meta.toLowerCase()}` 
    });
  });
});



//POPULATIONANDSOCIETY
app.get('/populationandsociety', (req, res) => {
  res.render('subsections/populationandsociety', { 
    title: 'Population and Society', 
    meta: 'Explore Jersey\'s population statistics, including migration, births, deaths, life expectancy, population pyramid, and census data.' 
  });
});

const POPULATIONANDSOCIETYsubsections = [
  { path: 'populationandmigration', title: 'Population and Migration', meta: 'Discover Jersey\'s population and migration trends. Understand demographic changes and migration patterns.' },
  { path: 'birthsdeaths', title: 'Births, Deaths & Life Expectancy', meta: 'Explore data on births, deaths, and life expectancy in Jersey. Understand demographic shifts and health trends.' },
  { path: 'populationpyramid', title: 'Population Pyramid', meta: 'View Jersey\'s population pyramid and understand the age distribution across different demographic groups.' },
  { path: 'census', title: 'Census Data', meta: 'Access comprehensive census data for Jersey. Explore detailed demographic and socio-economic information.' },
];

POPULATIONANDSOCIETYsubsections.forEach(subsection => {
  app.get(`/populationandsociety/${subsection.path}`, (req, res) => {
    res.render(`subsections/populationandsociety/${subsection.path}`, { 
      title: subsection.title, 
      meta: `Explore ${subsection.title.toLowerCase()} in Jersey. ${subsection.meta.toLowerCase()}` 
    });
  });
});



//HEALTHANDGOV
app.get('/healthandgov', (req, res) => {
  res.render('subsections/healthandgov', { 
    title: 'Health and Government', 
    meta: 'Explore Jersey\'s health and governmental statistics, including health trends, life expectancy, immunization data, and government reports.' 
  });
});

const HEALTHANDGOVsubsections = [
  { path: 'health', title: 'Health Statistics', meta: 'Access comprehensive health statistics for Jersey. Explore health indicators and trends affecting the population.' },
  { path: 'behaviouralhealthtrends', title: 'Behavioural Health Trends', meta: 'Understand behavioural health trends in Jersey. Explore data related to mental health and well-being.' },
  { path: 'lifeexpectancy', title: 'Life Expectancy', meta: 'Learn about life expectancy in Jersey. Explore factors influencing life expectancy and population health.' },
  { path: 'immunisation', title: 'Immunisation Data', meta: 'Access data on immunization rates in Jersey. Stay informed about vaccination coverage and public health initiatives.' },
  { path: 'govreports', title: 'Gov Reports Data', meta: 'Explore government reports data for Jersey. Access information on public policy, governance, and official reports.' },
];

HEALTHANDGOVsubsections.forEach(subsection => {
  app.get(`/healthandgov/${subsection.path}`, (req, res) => {
    res.render(`subsections/healthandgov/${subsection.path}`, { 
      title: subsection.title, 
      meta: `Explore ${subsection.title.toLowerCase()} in Jersey. ${subsection.meta.toLowerCase()}` 
    });
  });
});




// REPORTS
// META TAGS DIRECTLY ON PAGES

// OFFERINGS
app.get('/offerings', (req, res) => {
  res.render('subsections/reports/home', { title: 'Offerings', layout: 'reportlayout' });
});


// REPORTS HOME
app.get('/reports', (req, res) => {
  res.render('subsections/reports/reports', { title: 'StatsJE - Reports', layout: 'reportlayout' });
});



// BUSINESS2023
app.get('/reports/business2023', (req, res) => {
  res.render('subsections/reports/business2023', { title: 'Business | 2024', layout: 'reportlayout' });
});

 
// GOV2023
app.get('/reports/public2023', (req, res) => {
  res.render('subsections/reports/public2023', { title: 'Housing | 2024', layout: 'reportlayout' });
});




// OTHER

// AI
app.get('/AI', (req, res) => {
  res.render('subsections/reports/AI', { title: 'StatsJE - AI & ML', layout: 'reportlayout' });
});

// TOOLS
app.get('/tools', (req, res) => {
  res.render('subsections/reports/tools', { title: 'StatsJE - Tools', layout: 'reportlayout' });
});


// ENQUIRE
app.get('/enquire', (req, res) => {
  res.render('subsections/reports/enquire', { title: 'Enquiries', layout: 'reportlayout' });
});













//----------------------------//
// EMAIL
//----------------------------//







//----------------------------//
// PAGE NOT FOUND
//----------------------------//

app.get('*', (req, res) => {
  res.status(404);
  res.render('subsections/notfound', { title: '404',  meta: 'Page Not Found' });
});




//----------------------------//
// Finalise
//----------------------------//

app.listen(3000, () => console.log('App is listening on port 3000 (localhost:3000)'));