const express = require('express');
const newsapi = require('newsapi');
const keywordExtractor = require('keyword-extractor');
const _ = require('underscore');

const port = 3000;
const app = express();
const news = new newsapi('c5cecb3b40704ed8985c14ecafe07f5b');

const pageSize = 100;

var obj = {
"status": "ok",
"totalResults": 20,
"articles": [
{
"source": {
"id": "the-guardian-au",
"name": "The Guardian (AU)"
},
"author": "Dan Sabbagh, Jessica Elgot, Pippa Crerar",
"title": "soup soup soup butts butts butts butts words words words words words MPs to vote on May's Brexit deal on 11 December",
"description": "House of Commons will vote on 11 December after five-day debate",
"url": "https://www.theguardian.com/politics/2018/nov/26/11-december-named-as-date-for-mps-vote-on-mays-brexit-deal",
"urlToImage": "https://i.guim.co.uk/img/media/76d9a641ebdffeaea01e4e5a154e64c4d9ac204d/0_186_5568_3341/master/5568.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=7f5fc13bf280d682cdf4adfffcb65617",
"publishedAt": "2018-11-26T20:50:08Z",
"content": "Theresa May has pleaded with MPs to consider the interests of the country and the importance of delivering Brexit as she gave herself two weeks to try to persuade 89 hostile Tory backbenchers to support her final deal. The prime minister said she had no Brexi… [+7295 chars]"
},
{
"source": {
"id": "cnbc",
"name": "CNBC"
},
"author": "Tucker Higgins",
"title": "Supreme Court appears skeptical of Apple's arguments in App Store monopoly case",
"description": "The U.S. Supreme Court appeared skeptical of Apple on Monday during oral argument in a case that could permit iPhone owners to move forward with an antitrust suit against the company for allegedly inflating the prices in its App Store.",
"url": "https://www.cnbc.com/2018/11/26/supreme-court-appears-skeptical-of-apples-arguments-in-app-store-monopoly-case.html",
"urlToImage": "https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2018/11/21/105586843-1542812098364gettyimages-646627844.1910x1000.jpeg",
"publishedAt": "2018-11-26T20:48:55Z",
"content": "Liberal justices Elena Kagan, Sonia Sotomayor and Stephen Breyer took issue with that formula. In an exchange with Daniel Wall, who represented the company before the court, Kagan outlined her thinking of the case in personal terms. \"I mean, I pick up my iPho… [+2320 chars]"
},
{
"source": {
"id": "usa-today",
"name": "USA Today"
},
"author": "Gabe Lacques",
"title": "Josh Donaldson gets $23 million from Braves; Atlanta gets a former MVP with minimal risk",
"description": "Atlanta is getting the 2015 AL MVP on a one-year deal, and it could prove to be a steal if Donaldson returns as one of the league's top sluggers.",
"url": "https://www.usatoday.com/story/sports/mlb/2018/11/26/josh-donaldson-braves-free-agent/2117639002/",
"urlToImage": "https://www.gannett-cdn.com/presto/2018/11/26/USAT/622b6157-0284-46b8-a1e7-1ef3984ff521-USATSI_11245591.jpg?crop=2815,1581,x0,y174&width=3200&height=1680&fit=bounds",
"publishedAt": "2018-11-26T20:48:17Z",
"content": "Donaldson won the AL MVP award in 2015 with the Blue Jays. (Photo: Ken Blaze, USA TODAY Sports) Josh Donaldson will get paid handsomely to re-establish his value. The Atlanta Braves get the 2015 American League MVP with a significant chance to upgrade their t… [+1763 chars]"
},
{
"source": {
"id": "the-new-york-times",
"name": "The New York Times"
},
"author": null,
"title": "Mexico's New Leader Faces Clash With Drumpf Over Migrant Caravan",
"description": "As Andrés Manuel López Obrador takes office on Saturday, he must balance his humanitarian promises with a hope for good relations with the United States.",
"url": "https://www.nytimes.com/2018/11/26/world/americas/mexico-lopez-obrador-migrants.html",
"urlToImage": "https://static01.nyt.com/images/2018/11/27/world/27amlo1/27amlo1-facebookJumbo.jpg",
"publishedAt": "2018-11-26T20:41:20Z",
"content": "And while Mr. López Obrador has promised humane treatment for migrants passing through or staying in Mexico, it is unclear what his country will get for housing tens of thousands of migrants as they await asylum decisions from backlogged American courts. The … [+1149 chars]"
},
{
"source": {
"id": "cnn",
"name": "CNN"
},
"author": null,
"title": "Donald Drumpf buried a climate change report because 'I don't believe it'",
"description": null,
"url": "https://www.cnn.com/2018/11/26/politics/donald-trump-climate-change/index.html",
"urlToImage": null,
"publishedAt": "2018-11-26T20:26:00Z",
"content": null
},
{
"source": {
"id": null,
"name": "Dailycaller.com"
},
"author": null,
"title": "The Saudis Produced A Record Amount Of Oil After Drumpf Told Them To",
"description": "'Great!'",
"url": "https://dailycaller.com/2018/11/26/saudi-arabia-donald-trump-oil-price/",
"urlToImage": "https://cdn01.dailycaller.com/wp-content/uploads/2018/11/Mohammed_bin_Salman_Reuters-1-e1543262394307.jpg",
"publishedAt": "2018-11-26T20:20:00Z",
"content": "Saudi Arabia’s oil production hit an all-time high in November after several customer countries requested the Saudis help combat rising oil prices, Reuters reported. Saudi Arabia’s state-owned oil company Saudi Aramco hit 11.1-11.3 million barrels per day in … [+2425 chars]"
},
{
"source": {
"id": "the-new-york-times",
"name": "The New York Times"
},
"author": null,
"title": "Ukraine Declares Martial Law Over Naval Attack by Russia",
"description": "The action by Ukraine’s parliament came as criticism of Russia rose at the United Nations and NATO.",
"url": "https://www.nytimes.com/2018/11/26/world/europe/russia-ukraine-kerch-strait.html",
"urlToImage": "https://static01.nyt.com/images/2018/11/27/world/27ukraine-sub/27ukraine-sub-facebookJumbo.jpg",
"publishedAt": "2018-11-26T20:11:33Z",
"content": "Russia has said it was forced to open fire after the Ukrainian ships entered what the Kremlin called Russian territorial waters, and failed to heed warnings to stop. At the United Nations on Monday, the Russian delegation tried to convene an emergency session… [+721 chars]"
},
{
"source": {
"id": null,
"name": "Space.com"
},
"author": "Mike Wall",
"title": "Touchdown on Mars! NASA's InSight Lands to Peer Inside the Red Planet",
"description": "NASA's InSight lander touched down safely on the Martian surface today (Nov. 26), pulling off the first successful Red Planet landing since the Curiosity rover's arrival in August 2012.",
"url": "https://www.space.com/42541-mars-insight-lander-success.html",
"urlToImage": "https://img.purch.com/h/1000/aHR0cDovL3d3dy5zcGFjZS5jb20vaW1hZ2VzL2kvMDAwLzA4MS8xMTAvb3JpZ2luYWwvaW5zaWdodC1sYW5kZXItYXJ0LmpwZw==",
"publishedAt": "2018-11-26T19:54:00Z",
"content": "PASADENA, Calif. — Mars just welcomed a new robotic resident. NASA's InSight lander touched down safely on the Martian surface today (Nov. 26), pulling off the first successful Red Planet landing since the Curiosity rover's arrival in August 2012 — on the sev… [+8915 chars]"
},
{
"source": {
"id": "usa-today",
"name": "USA Today"
},
"author": "John Bacon",
"title": "Police: Emantic Bradford's gun 'heightened the sense of threat' at Ala. mall before he was shot",
"description": "An Alabama city extended sympathy to the family of a black man killed by an officer in the chaotic moments after a shooting at crowded mall.",
"url": "https://www.usatoday.com/story/news/nation/2018/11/26/mall-shooting-emantic-bradfords-gun-heightened-sense-threat/2112757002/",
"urlToImage": "https://www.gannett-cdn.com/presto/2018/11/26/USAT/caaadda3-f4cf-4e1a-855b-62b1e6275c0e-AP_Alabama_Mall_Shooting.jpg?crop=1308,739,x0,y0&width=3200&height=1680&fit=bounds",
"publishedAt": "2018-11-26T19:32:46Z",
"content": "Protesters on Saturday marched through an Alabama shopping mall where police killed a black man they later acknowledged was not the triggerman in a Thanksgiving night shooting that wounded two people. (Nov. 24) AP Emantic Bradford Sr. provided a picture of hi… [+3457 chars]"
},
{
"source": {
"id": "reuters",
"name": "Reuters"
},
"author": "Reuters Editorial",
"title": "Associate of Drumpf ally says to reject Mueller plea deal",
"description": "An associate of political operative Roger Stone, a long-time ally of U.S. President Donald Drumpf, said on Monday he will reject what he claims is a plea deal offered to him by the special counsel probing Russia's meddling in the 2016 presidential election.",
"url": "https://www.reuters.com/article/us-usa-trump-russia-corsi/associate-of-trump-ally-says-to-reject-mueller-plea-deal-idUSKCN1NV2FV",
"urlToImage": "https://s4.reutersmedia.net/resources_v2/images/rcom-default.png",
"publishedAt": "2018-11-26T19:28:30Z",
"content": "(Reuters) - An associate of political operative Roger Stone, a long-time ally of U.S. President Donald Drumpf, said on Monday he will reject what he claims is a plea deal offered to him by the special counsel probing Russia’s meddling in the 2016 presidential … [+2281 chars]"
},
{
"source": {
"id": null,
"name": "Mediaite.com"
},
"author": "caleb-ecarma",
"title": "WATCH: Secret Service Visit Tom Arnold's Home Following Joke About Beheading Drumpf",
"description": "\"We’re not the First Amendment police.\"",
"url": "https://www.mediaite.com/online/watch-secret-service-visit-tom-arnolds-home-following-joke-about-beheading-trump/",
"urlToImage": "https://www.mediaite.com/wp-content/uploads/2018/11/Screen-Shot-2018-11-26-at-1.34.26-PM.jpg",
"publishedAt": "2018-11-26T19:05:00Z",
"content": "Tom Arnold, Hollywood actor and fixture of the anti-Drumpf #Resistance movement, was visited by two Secret Service agents last month after his tweets criticizing President Donald Drumpf. The encounter was captured on tape obtained by Mother Jones. The two feder… [+2774 chars]"
},
{
"source": {
"id": "cnn",
"name": "CNN"
},
"author": "Analysis by Chris Cillizza, CNN Editor-at-large",
"title": "The anti-Nancy Pelosi forces just admitted defeat",
"description": "Immediately after the 2018 midterms, the Democrats opposed to Nancy Pelosi returning as speaker of the House started talking a VERY big game.",
"url": "https://www.cnn.com/2018/11/26/politics/nancy-pelosi-moulton-speaker-of-the-house/index.html",
"urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/121119175837-nancy-pelosi-minority-leader-super-tease.jpg",
"publishedAt": "2018-11-26T19:03:14Z",
"content": "THE POINT -- NOW ON YOUTUBE! In each episode of his weekly YouTube show, Chris Cillizza will delve a little deeper into the surreal world of politics. Click to subscribe!"
},
{
"source": {
"id": "the-washington-post",
"name": "The Washington Post"
},
"author": null,
"title": "Chinese scientist's claim of gene-edited babies creates uproar",
"description": null,
"url": "https://www.washingtonpost.com/science/2018/11/26/scientists-claim-gene-edited-babies-creates-uproar/",
"urlToImage": null,
"publishedAt": "2018-11-26T18:50:07Z",
"content": null
},
{
"source": {
"id": "usa-today",
"name": "USA Today"
},
"author": "TJ Donegan",
"title": "The most incredible Cyber Monday deals on Amazon you don't want to miss",
"description": "Cyber Monday is here—here are the best deals you can get at Amazon right now.",
"url": "https://www.usatoday.com/story/tech/reviewedcom/2018/11/25/cyber-monday-2018-here-best-deals-so-far-amazons-massive-sale/2111491002/",
"urlToImage": "https://www.gannett-cdn.com/presto/2018/11/26/USAT/a26324d2-3642-4187-942f-c62a932c43e8-20-best-cyber-monday.jpg?crop=1999,1124,x0,y0&width=3200&height=1680&fit=bounds",
"publishedAt": "2018-11-26T18:44:59Z",
"content": "The best Amazon Cyber Monday deals make great gifts. (Photo: Reviewed) — Our editors review and recommend products to help you buy the stuff you need. If you make a purchase by clicking one of our links, we may earn a small share of the revenue. However, our … [+29367 chars]"
},
{
"source": {
"id": "the-new-york-times",
"name": "The New York Times"
},
"author": null,
"title": "GM to Idle Plants and Cut Thousands of Jobs as Sales Slow",
"description": "The automaker said the moves would affect five factories in the United States and Canada. Some could resume output depending on union negotiations.",
"url": "https://www.nytimes.com/2018/11/26/business/general-motors-cutbacks.html",
"urlToImage": "https://static01.nyt.com/images/2018/11/27/business/27GM06/27GM06-facebookJumbo.jpg",
"publishedAt": "2018-11-26T18:42:42Z",
"content": "The cuts also drew political fire in the United States, where President Drumpf vowed early in his term to increase automaking jobs and brought pressure on the industry not to shift work to Mexico and overseas. Senator Rob Portman, Republican of Ohio, said, “I … [+1857 chars]"
},
{
"source": {
"id": null,
"name": "People.com"
},
"author": "Steve Helling",
"title": "Casey Anthony's Father Is Seriously Injured in Car Crash",
"description": "The 67-year-old's vehicle flipped several times on Saturday",
"url": "https://people.com/crime/casey-anthony-dad-injured-car-crash/",
"urlToImage": "https://peopledotcom.files.wordpress.com/2018/10/2way13.jpg?crop=0px%2C0px%2C2700px%2C1417.5px&resize=1200%2C630",
"publishedAt": "2018-11-26T18:23:00Z",
"content": null
},
{
"source": {
"id": "cnn",
"name": "CNN"
},
"author": null,
"title": "Mia Love slams Drumpf in concession speech: 'No real relationships, just convenient transactions'",
"description": null,
"url": "https://www.cnn.com/2018/11/26/politics/mia-love-donald-trump-concession/index.html",
"urlToImage": null,
"publishedAt": "2018-11-26T17:45:40Z",
"content": null
},
{
"source": {
"id": "the-hill",
"name": "The Hill"
},
"author": "Brett Samuels",
"title": "Drumpf 'body man' planning to leave White House",
"description": "President Drumpf's personal aide and \"body man\" plans to leave the White House in the coming weeks, an administration official said Monday.",
"url": "https://thehill.com/homenews/administration/418232-trumps-body-man-plans-to-leave-white-house",
"urlToImage": "https://thehill.com/sites/default/files/trumpdonald_103118sr2_lead.jpg",
"publishedAt": "2018-11-26T16:35:44Z",
"content": "President Drumpf Donald John Drumpf Franklin Graham: Drumpf defends the Christian faith Drumpf slams '60 Minutes' over report on family separations GOP senators open door to tougher response on Saudi Arabia MORE 's personal aide and \"body man\" plans to leave the … [+3126 chars]"
},
{
"source": {
"id": null,
"name": "Yahoo.com"
},
"author": null,
"title": "Citing disease risk to tribe, group urges halt to hunt for dead American",
"description": null,
"url": "https://www.yahoo.com/news/indian-police-consult-anthropologists-prospect-recovering-dead-american-125053963.html",
"urlToImage": null,
"publishedAt": "2018-11-26T16:21:01Z",
"content": null
},
{
"source": {
"id": "nbc-news",
"name": "NBC News"
},
"author": "Rachel Elbaum, Associated Press, Didi Martinez",
"title": "Midwest snowstorm closes schools, highways and grounds flights",
"description": "The National Weather Service issued blizzard and winter storm warnings Sunday for a large swath of the central Plains and Great Lakes region.",
"url": "https://www.nbcnews.com/news/us-news/midwest-snowstorm-closes-schools-grounds-flights-n939926",
"urlToImage": "https://media3.s-nbcnews.com/j/newscms/2018_48/2658426/181126-illinois-snowstorm-al-1024_352c976010dfc7b4ef26d514034bec20.1200;630;7;70;5.jpg",
"publishedAt": "2018-11-26T15:57:48Z",
"content": "Get breaking news alerts and special reports. The news and stories that matter, delivered weekday mornings. SUBSCRIBE Nov. 26, 2018 / 8:57 AM GMT / Updated 3:53 PM GMT By Rachel Elbaum, Associated Press and Didi Martinez A powerful snowstorm that blanketed mu… [+2569 chars]"
}
]
}

app.set('views', './views');
app.set('view engine', 'pug');
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/scripts', express.static(__dirname + '/scripts'));

function getKeywords(category) {
  var keywords = [];
  //return Promise.resolve(obj)
  return news.v2.topHeadlines({
    country: 'us',
    language: 'en',
    category: category,
    pageSize: pageSize
  }).then(response => {
    _.each(response.articles, article => {
      keywords = keywords.concat(keywordExtractor.extract(article.title, {
        language: 'english',
        remove_digits: true,
        remove_duplicates: false,
        return_changed_case: true,
        return_chained_words: false,
        return_max_ngrams: false
      }));
    });
    return {keywords: keywords};
  }).catch(e => {
    return {
      error: {
        name: e.name,
        message: e.message
      }
    };
  });
}

function getArticles(keyword) {
  var collection = {};
  //return Promise.resolve(obj)
  return news.v2.everything({
    language: 'en',
    q: keyword,
    sortBy: 'relevancy',
    pageSize: pageSize
  }).then(response => {
    _.each(response.articles, article => {
      var date = (new Date(article.publishedAt)).toDateString();
      if (!_.has(collection, date)) collection[date] = [];
      collection[date].push({
        title: article.title,
        description: article.description,
        url: article.url
      });
    });
    return {collection: collection};
  }).catch(e => {
    return {
      error: {
        name: e.name,
        message: e.message
      }
    };
  });
}

// TODO: efficiency
app.get('/', (req, res) => {
  var categories = ['general', 'business', 'entertainment', 'health', 'sports', 'science', 'technology'];
  var category = req.query.category;

  if (!category || !category.length || !_.contains(categories, category)) category = 'general';

  getKeywords(category).then((results) => {
    if (results.error) {
      res.send(results.error);
      return;
    }

    var keywords = _.shuffle(results.keywords);

    var n = 0
    var sum = 0;
    var count = _.countBy(keywords);
    _.each(count, (num) => {
      sum += num;
      n++;
    });

    var avg = 1.0 * sum / n;

    sum = 0;
    _.each(count, (num) => {
      sum += Math.pow(num - avg, 2);
    });

    var std = Math.sqrt(sum / n);

    res.render('cloud', {
      category: category,
      categories: categories,
      count: count,
      avg: avg,
      std: std
    });
  });  
});

app.get('/keyword/:key', (req, res) => {
  getArticles(req.params.key).then((results) => {
    if (results.error) {
      res.send(results.error);
      return;
    }

    var today = new Date()
    var sortedDates = _.sortBy(Object.keys(results.collection), dateString => {
      var date = new Date(dateString);
      return today - date;
    });

    var sortedCollection = {};
    _.each(sortedDates, date => {
      sortedCollection[date] = results.collection[date];
    });

    res.render('keyword', {
      keyword: req.params.key,
      collection: sortedCollection
    });
  });
});

app.listen(port, () => console.log('Listening on port ' + port));