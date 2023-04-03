const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>My SQL app</h1>');
});

app.listen(3000, () => {
    console.log('The app is running on localhost:3000');
});