'use strict';
const express = require('express');
const morgan     = require('morgan');
const cors       = require('cors');
const app = express();
app.use(cors());
app.use(morgan('dev'));
// var path = require('path')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/user_db');
var Schema = mongoose.Schema;
 
var userSchema = new Schema({
  name: String,
  email: String,
  phone: Number,
  password: String,
  place: String,
});
var userModel = mongoose.model('userSchema', userSchema);
app.use(express.static('src'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
const router = express.Router();
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'src/index.html'));
// });
app.get('/user', (req, res) => {
  userModel.find({}, (err, data) =>{
    res.send(data)
  })
})

app.get('/user/:id', (req, res) => {
  let id = req.params.id;
  console.log(id)
  userModel.findOne({'_id':id}, (err, data) =>{
    console.log(data)
    res.send(data)
  })
})

app.put('/user/:id', (req, res) => {
  let id = req.params.id;
  console.log(id)
  userModel.findOneAndUpdate({'_id':id}, req.body,{new : true}, (err, data) =>{
    res.send(data)
  })
})

app.delete('/user/:id', (req, res) => {
  let id = req.params.id;
  console.log(id)
  userModel.remove({'_id':id}, (err, data) =>{
    res.send(data)
  })
})

app.post('/user', (req,res)=>{
var UserData = new userModel(req.body);

UserData.save(function (err, userData) {
  if (err) {
  res.send(err)
  console.log(err)
  }else if(userData){
    res.send(userData)
  }else{
    res.send("No Data")
  }

});
})
const port = 4321;
app.listen(port,()=>{
    console.log('Server start')
})
