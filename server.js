const express = require("express");
const uuid = require("uuid")
const path = require("path");
const http = require("http");

const app = express();
const PORT = process.env.PORT || 8080;

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
    // retrieve all notes and res.json then back to the front end
});
app.post("/api/notes", function (req,res){
    const getNotes = req.body;
    // creates a note from req.body
});
app.delete("/api/notes/:id", function (req, res){
    // delete a note based off id
})

app.listen(PORT, () => console.log("App listening on PORT " + PORT));