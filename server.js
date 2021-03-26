const express = require("express");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const http = require("http");
const fs = require ("fs");
const { json } = require("express");


const app = express();
const PORT = process.env.PORT || 8080;

// body parsing middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// HTML Routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
  app.get("/notes", function (req, res) {
      res.sendFile(path.join(__dirname, "public", "notes.html"));
    });
  

// API Routes/lines 28-34 index.js
app.get("/api/notes", function (req,res){
    fs.readFile("./db/db.json", "utf8", function(err,data) {
        return err ? console.log(err) : res.json(JSON.parse(data));
    });
    // retrieve all notes and res.json then back to the front end
 }); 
//  lines 36-43 index.js
app.post("/api/notes", function (req,res){
    const note = {
        id: uuidv4(), 
        title: req.body.title,
        text: req.body.text
     };
     console.log("note: ", note)
     fs.readFile("./db/db.json", "utf-8", function (err, dataRead){
        if(err) throw err
        // read the data from db.json
        // creates a post from req.body 
        //    const data-note = req.body
       console.log("dataREadString", dataRead)
       // convert json string - parse
       dataRead = JSON.parse(dataRead)
       console.log("dataREadParsed", dataRead)
        dataRead.push(note);
        // stringify the array
        fs.writeFile("./db/db.json", JSON.stringify(dataRead), function (err){
            if(err) throw err
            res.json("/api/notes");
         }); 
    });  
    });
// lines 45-51 index.js
app.delete("/api/notes/:id", function (req, res){
    fs.readFile("./db/db.json", "utf-8", function (err,data){
        res.json(JSON.parse(data));
    })
    // delete a note based off id
    const {id} = req.params;
})

app.listen(PORT, () => console.log("App listening on PORT " + PORT));



