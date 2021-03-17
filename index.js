const express = require('express');
const fs = require('fs');
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
    res.status(200).render('demo', { title: 'Hey!', message: 'Hello there and thanks for telling me how to use pug!' })
});

//Reset output.txt
fs.writeFileSync('output.txt', '[*] Server session started, listening to POST request...\n\n');

//GET request
app.get("/", (req, res)=>{ 
    res.status(200).render('index.pug');
});

//POST request
app.post("/", (req, res) => {
    console.log(req.body);
    console.log("POST request excecuted!");
    let myname = req.body.name;
    let section = req.body.section;
    let dept = req.body.dept;
    let msg = req.body.msg;
    let outputToWrite = `Name: ${myname}, from section ${section}, department: ${dept}, says: ${msg}\n`;
    fs.appendFileSync('output.txt', outputToWrite);
    const params = {'message': 'Your form has been submitted successfully'};
    res.status(200).render('index.pug', params);
});

//Start Server
app.listen(port, () => {
    console.log(`Application started at port ${port}`);
});
