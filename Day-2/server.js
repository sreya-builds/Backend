const express = require("express")
const app = express()

app.get('/',(req,res)=>{
    res.send("Hello Backend")
})

app.get('/about',function(req,res){
    res.send("This is About Page")
})
app.get('/contact',function(req,res){
    res.send("This is Contact Page")
})
app.get('/space',function(req,res){
    res.send("This is Space Page")
})
app.listen(4000)