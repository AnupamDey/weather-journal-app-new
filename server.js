projectData = {};
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

const port = process.env.PORT || 8082;
const key = process.env.OWM_API_KEY;

const server = app.listen(port, () => {
    console.log(`Server running at localhost ${port}`)
});

app.get('/getkey', (req, res) => {
    res.send(key);
});

app.get('/all', (req, res) => {
    console.log(req);
    res.send(projectData);
});

app.post('/post', (req, res) => {
    console.log('POST Request Successful');
    console.log(req.body);
  
    projectData = {
      date: req.body.date,
      temp: req.body.temp,
      description: req.body.description,
      content: req.body.content
    }
  
    res.send(projectData);
    console.log(projectData);
});
