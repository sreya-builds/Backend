const express = require("express")
const app = express()
 app.use(express.json())
  const notes = []
  
  app.post("/notes",(req,res)=>{
   })

   app.get("/notes",(req,res)=>{
   })

   app.delete("/notes/:shreya",(req,res)=>{
     delete notes [req.params.shreya]
     res.status(200).json({
        message:"note deleted successfully"
     })
   })
module.exports = app