const express = require("express");
const app = express(); // instatnce of application

app.get("/", (req, res) => {
    res.send("welcome to root route");
});
app.get("/home", (req, res) => {
    res.send("<h1>welcome to home route</h1> hiii i am learning node js");
});




const PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`Server connected to port : ${PORT}`);
})




