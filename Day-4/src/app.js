/*
-server create karna 
 -server ko config karna 
*/
const express = require("express")

const app = express()

app.use (express.json())

const notes = []

/*get*/
app.get("/",(req,res)=>{
    res.send("Hello World")
})

/*post*/
app.post("/notes",(req,res)=>{
    console.log(req.body)
    notes.push(req.body)

    console.log(notes);
    
    res.send("note created")
})
/*Delete*/

 
 app.delete("/notes/:index",(req,res)=>{
   delete notes [req.params.index]
    res.send("note deleted successfully")
 })
  
module.exports = app
