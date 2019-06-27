const express = require('express');
const router = express.Router();
const http = require('http')

const MongoClient = require('mongodb').MongoClient;

const URL = "mongodb://localhost/ps8DB";
let str = null;
const bodyParser = require('body-parser')

router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next()
})
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

/* GET home page. */
router.get('/', function(req, res, next) {

  getPeopleInfo().then((parsedData)=>{
    res.render('index', {people: parsedData['people']})
  })
      .catch((error) =>{
  console.log(error)})
})


/* GET home page. */
router.post('/', function(req, res, next) {
  MongoClient.connect(URL,{useNewUrlParser: true})
      .then(function(client) {
        return new Promise(function (resolve) {
          let db = client.db('Database');
          db.collection('data').findOne({}, function (err, result) {
            str = result
          })
          client.close()
              .catch(function () {
                console.log("Could not close initial Database")
              })
          resolve(str);
        })
            .then(function (str) {
              if (str != null){
              res.json(str)
            }
            else{
              postPeopleInfo().then((parsedData) => {
                parsedData['string'] = req.body.name
                res.json(parsedData)
              })
                  .catch((error) => {
                    console.log(error)
                  })

            }})
      })
      .catch( function(){
        console.log("Could not connect to Database inside router.post()");
      });
})



const getPeopleInfo = () =>{
  return new Promise ((resolve, reject) => {
    const req = http.get('http://api.open-notify.org/astros.json', (res) => {
      let rawData = []

      res.on('data', (chunk) => {
        rawData.push(chunk)
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (e) {
          reject(e.message);
        }
      });
      req.on('error', function(e) {
        console.log('ERROR: ' + e.message);
        reject(e.message)
      });
    })})}



const postPeopleInfo = () =>{
  return new Promise ((resolve, reject) => {
    const req = http.get('http://api.open-notify.org/astros.json', (res) => {
      let rawData = []

      res.on('data', (chunk) => {
        rawData.push(chunk)
      });

      res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            MongoClient.connect(URL,{useNewUrlParser: true})
                .then(function(client){
                var db = client.db('Database');
              db.collection("data").insertOne(parsedData, function(err, result){
                if(err) console.log(err);
                else console.log(result.ops[0].people[0].craft);
              });
              db.collection("data").updateOne({},{$set:{"Cached" : "True"}})
                  .then(function(){console.log("Succesfully updated entry")})
                  .catch(function(){console.log("Could not update entry")})
              client.close()
                  .then(function(){console.log("Succesfully closed client")})
                  .catch(function(){console.log("Could not close client")})
            })
                .catch(function(){
                  console.log("Could not connect to database inside postPeopleInfo")
                })
          resolve(parsedData);
        } catch (e) {
          reject(e.message);
        }
      });
      req.on('error', function(e) {
        console.log('ERROR: ' + e.message);
        reject(e.message)
      });
    })})}

module.exports = router;

