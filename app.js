const express = require('express');
const favicon = require('serve-favicon');
const newsapi = require('newsapi');
const keywordExtractor = require('keyword-extractor');
const _ = require('underscore');

const port = 3000;
const app = express();
const news = new newsapi('c5cecb3b40704ed8985c14ecafe07f5b');

const pageSize = 100;

app.set('views', './views');
app.set('view engine', 'pug');
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/images', express.static(__dirname + '/images'));
app.use(favicon(__dirname + '/images/favicon.ico'));

function getKeywords(category) {
  var keywords = [];
  return news.v2.topHeadlines({
    country: 'us',
    language: 'en',
    category: category,
    pageSize: pageSize
  }).then(response => {
    _.each(response.articles, article => {
      var title = article.title;
      var source = article.source.name;
      var regex = new RegExp(source, 'g');
      title = title.split(' - ').slice(0, -1).join(' ');
      title = title.replace(regex, '');
      keywords = keywords.concat(keywordExtractor.extract(title, {
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