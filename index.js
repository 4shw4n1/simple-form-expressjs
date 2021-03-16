const express = require('express');
const app = express();
const path = require('path');
const port = 80;

// Set the template engine as pug
app.set('view engine', 'pug')

//Get info from our form
app.use(express.urlencoded());

// Set the views directory
app.set('views', path.join(__dirname, 'views'))
app.use('/static', express.static('static')) // For serving static files
 
//Pug template endpoint
// Our pug demo endpoint
app.get("/demo", (req, res)=>{ 
    res.status(200).render('demo', { title: 'Hey Harry', message: 'Hello there and thanks for telling me how to use pug!' })
});

//GET request
app.get("/", (req, res)=>{ 
    const con = "User: Backend is tough :( Meanwhile Node.js goes brrr..."
    const params = {'title': 'Express WebApp', 'heading': 'Welcome', "content": con}
    res.status(200).render('index.pug', params);
});

//POST request
app.post("/", (req, res) => {
    console.log(req.body);
    console.log("POST request excecuted!");
    let myname = req.body.name;
    let section = req.body.section;
    let dept = req.body.dept;
    let msg = req.body.msg;

});

/*
app.get("/", (req, res) => {
    res.send('This is first express app');
});

app.get("/about", (req, res) => {
    res.send('This is About page of first express app');
});*/

//Start Server
app.listen(port, () => {
    console.log(`Application started at port ${port}`);
});
