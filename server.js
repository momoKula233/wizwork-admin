const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const Promise = require('bluebird');
const db = require('sqlite');

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const swig = require('swig');


app.set('view engine', 'html');
app.set('view cache', false);
app.set('views', './')
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.engine('html', swig.renderFile);
app.use(express.static('dist', {'extensions': ['html']}));
app.use(express.query());

app.get('/', (req, res, next) => {
  res.render('admin');
});

app.get('/api/order_list', (req, res, next) => {
  const offset = req.query && req.query.offset || 0;
  const per = 15;
  Promise.all([
    db.all(`SELECT * FROM 'ORDER' LIMIT ? OFFSET ?`, per, per * offset),
    db.all(`SELECT * FROM 'ORDER'`)
  ]).then(db => {
    res.json({ success: true, orders: db[0], total: db[1].length });
  })
})

app.get('/api/account_list', (req, res) => {
  const offset = req.query && req.query.offset || 0;
  const per = 15;
  Promise.all([
    db.all(`SELECT * FROM 'COMPANY' LIMIT ? OFFSET ?`, per, per * offset),
    db.all(`SELECT * FROM 'COMPANY'`)
  ]).then(([company, total]) => {
    res.json({ success: true, company: company, total: total.length });
  })
})

const port = 7777;
Promise.resolve()
  .then(() => db.open('../wizwork/database.db', { Promise }))
  .catch(err => console.error(err.stack))
  .finally(() => app.listen(port, (err) => { console.log("http oppened on " + port) }));

// const port = 7777;
// app.listen(port, (err) => { console.log("http oppened on " + port) });
