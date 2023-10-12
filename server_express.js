const express = require('express');
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'index.html'); // name of target page 
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send(content);
    }
  });
});

app.get('/csvdata', (req, res) => { 
  const csvFilePath = path.join(__dirname, './pesagens_res_sol.csv');
  const secondColumnArray = [];

  fs.createReadStream(csvFilePath)
    .pipe(csvParser({ separator: ',' }))
    .on('data', row => {
      const secondColumnValue = row[2];
      secondColumnArray.push(secondColumnValue);
    })
    .on('end', () => {
      res.status(200).json(secondColumnArray);
    });
});

// insert other endpoints here
app.get('/csvdata1', (req, res) => { 
  const csvFilePath1 = path.join(__dirname, './pesagens_recycling.csv');
  const secondColumnArray1 = [];

  fs.createReadStream(csvFilePath1)
    .pipe(csvParser({ separator: ',' }))
    .on('data', row => {
      const secondColumnValue1 = row[2];
      secondColumnArray1.push(secondColumnValue1);
    })
    .on('end', () => {
      res.status(200).json(secondColumnArray1);
    });
});

// fim do endpoint 2

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Express Server Watched by Nodemon is running on port ${port}.`);
});

//teste