

const express = require('express');
const path = require('path');
const fs = require('fs');

const app  = express();
const PORT = process.env.PORT || 3001;

let notesData = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

app.get('./public/notes', function(err, res) {
    try {
        notesData = fs.readFileSync('./db/db.json', 'utf8');
        console.log('hello');
        notesData = JSON.parse(notesData);

    } catch (err) {
        console.log('\n error (in app.get.catch):');
        console.log(err);
    }
    res.json(notesData);
});

app.post('./public/notes', function(req, res) {
    try {
        notesData = fs.readFileSync('./db/db.json', 'utf8');
        console.log(notesData);

        notesData = JSON.parse(notesData);

        req.body.id = notesData.length;

        notesData.push(req.body);

        notesData =JSON.stringify(notesData);

        fs.writeFile('./db/db.json', notesData, 'utf8', function(err) {
            if (err) throw err;
        });

        res.json(JSON.parse(notesData));

    } catch (err) {
        throw err;
        console.error(err);
    }
});