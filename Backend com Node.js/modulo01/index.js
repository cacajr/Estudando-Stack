const express = require('express');

const app = express();

// localhost:3333/teste
app.get('/teste', (req, res) => {
    return res.json({message:'Hello World'});
})

app.listen(3333);