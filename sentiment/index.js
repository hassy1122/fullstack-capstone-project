const natural = require('natural');

const tokenizer = new natural.WordTokenizer();
const TfIdf = natural.TfIdf;
const SentimentAnalyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new SentimentAnalyzer("English", stemmer, "afinn");

module.exports = { natural, tokenizer, TfIdf, SentimentAnalyzer, analyzer };
