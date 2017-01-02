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

let accountDB, userDB;

const port = 7777;
Promise.all([
    db.open('../wizwork/database.db', { Promise }),
    db.open('./admin.db', { Promise }),
  ]).then(([db1, db2]) => {
    accountDB = db1;
    userDB = db2;
  })
  .catch(err => console.error(err.stack))
  .finally(() => app.listen(port, (err) => { console.log("http oppened on " + port) }));

app.get('/', (req, res, next) => {
  res.render('admin');
});

app.get('/api/order_list', (req, res, next) => {
  const offset = req.query && req.query.offset || 0;
  const per = 15;
  Promise.all([
    accountDB.all(`SELECT * FROM 'ORDER' LIMIT ? OFFSET ?`, per, per * offset),
    accountDB.all(`SELECT * FROM 'ORDER'`)
  ]).then(db => {
    res.json({ success: true, orders: db[0], total: db[1].length });
  })
});

app.get('/api/account_list', (req, res) => {
  const offset = req.query && req.query.offset || 0;
  const per = 15;
  Promise.all([
    accountDB.all(`SELECT * FROM 'COMPANY' LIMIT ? OFFSET ?`, per, per * offset),
    accountDB.all(`SELECT * FROM 'COMPANY'`)
  ]).then(([company, total]) => {
    res.json({ success: true, company: company, total: total.length });
  })
})

app.post('/api/login', (req, res) => {
  const { name, password } = req.body;
  userDB.get(`SELECT * FROM 'admin' where name = ? and password = ?`, name, password)
  .then(user => {
    if (user) {
      return res.send({
        success: true,
        user,
      })
    }
    res.send({
      success: false,
    })
  })
  .catch(err => {
    res.send({ success: false });
  })
})

app.post('/api/update', (req, res) => {
  const { name, id, rest_time, mobile, password } = req.body;
  accountDB.run(`UPDATE 'COMPANY' SET NAME = ?, REST_TIME = ?, MOBILE = ?,
   PASSWORD = ? WHERE ID = ${id}`, name, rest_time, mobile, password)
    .then(resp => {
      res.send({
        success: true,
      })
    })
    .catch(err => {
      console.log(err);
      res.send({ success: false });
    })
})

app.post('/api/insert', (req, res) => {
  const { name, id, rest_time, mobile, password } = req.body;
  accountDB.get(`SELECT * FROM 'COMPANY' where id = ?`, id).then(company => {
    if(company) return res.send({success: false, err: 'INVALID_ID'})
    accountDB.run(`INSERT INTO 'COMPANY' (name, rest_time, mobile, id, password)
      VALUES(?, ?, ?, ?, ?)`, name, rest_time, mobile, password)
      .then(resp => {
        res.send({
          success: true,
        })
      })
  }).catch(err => {
      console.log(err);
      res.send({ success: false });
    })
})

app.post('/api/delete', (req, res) => {
  const { id } = req.body;
  console.log(id);
  accountDB.get(`SELECT * FROM 'COMPANY' where id = ${id}`).then(company => {
    if(!company) return res.send({success: false, err: 'INVALID_ID'})
    accountDB.run(`DELETE FROM 'COMPANY' where id = ${id}`)
      .then(resp => {
        res.send({
          success: true,
        })
      })
  }).catch(err => {
      console.log(err);
      res.send({ success: false });
    })
})

// const port = 7777;
// app.listen(port, (err) => { console.log("http oppened on " + port) });
