#!/usr/bin/env nodejs
const express = require('express')
var MongoClient = require('mongodb').MongoClient;
const app = express()
const port = 8080
const url = "mongodb://localhost:27017/";

var mongodb;
MongoClient.connect(url, {  
	poolSize: 5
	// other options can go here
}, function(err, client) {
	mongodb=client.db('chainwatch');
	console.log("Connected to MongoDB");
});


app.get('/', function(req, res){
	res.send('Hello World!')
});


app.get('/reorg_events', async function(req, res){
	var data = await mongodb.collection("reorg_events").find().toArray();
	res.json(data);
});

app.get('/density_events', async function(req, res){
	var data = await mongodb.collection("density_events").find().toArray();
	res.json(data);
});

app.get('/statistics', async function(req, res){
	var data = await mongodb.collection("statistics").find().toArray();
	res.json(data);
});

app.listen(port, () => console.log(`Chainwatch Server listening on port ${port}!`))