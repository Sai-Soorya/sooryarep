var mongoClient = require('mongodb').MongoClient
var http = require('http')
var express = require('express')
var app = express()
app.use(express.json())
mongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){console.log("error in connection")}
    else{
        db = client.db('empdb')
        console.log("connection established")
    }
})

app.get('/emps',(req,res)=>{
    db.collection('emp').find().toArray((err,items)=>{
        res.json(items)
    })
})
app.post('/addemp',(req,res)=>{
    db.collection('emp').insertOne(req.body)
    console.log("Inserted successfully")
    res.end()
})
app.put('/updateemp/:id',(req,res)=>{
    var  id=parseInt(req.params.id)
    db.collection('emp').update({"_id":"id"},{$set:{"salary":req.body.salary}})
    res.end()
})
app.delete('/deleteemp/:id',(req,res)=>{
    var id=req.params.id
    db.collection('emp').remove({"_id":"id"})
    res.end()
})
// app.get('/emp/:id',(req,res)=>{
    
// })
app.listen(2000,()=>{
    console.log("server started")
})