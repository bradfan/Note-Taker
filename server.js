const express = require("express");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const http = require("http");
const fs = require ("fs");


const app = express();
const PORT = process.env.PORT || 8080;

// body parsing middleware?
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// HTML Routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  app.get("/notes", function (req, res) {
      res.sendFile(path.join(__dirname, "public", "notes.html"));
    });
  

// API Routes
app.get("/api/notes", function (req,res){
    fs.promises.readFile("./db/db.json", "utf8", function(err,data) {
        res.json(JSON.parse(data));
    });
    // retrieve all notes and res.json then back to the front end
});
app.post("/api/notes", function (req,res){
    // creates a note from req.body apply uuid here?
     const note = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    };
    fs.promises.readFile("./db/db.json", "utf8", function(err,data) {
        res.json(JSON.parse(data));
    });
    // read the data from db.json
    // ?parse out to the Arraystringify the array
    // write to file with the new array
    // respond to the user
    
});
app.delete("/api/notes/:id", function (req, res){
    // delete a note based off id
    const {id} = req.params;
})

app.listen(PORT, () => console.log("App listening on PORT " + PORT));
