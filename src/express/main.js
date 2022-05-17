const express = require('express');


const PORT = 3000;


const app = express();


app.set('views', './views');
app.set('view engine', 'pug');


app.get('/', (req, res) => {
  res.render('index', {
    title: 'Hey',
    message: 'Hello there!'
  });
});


app.listen(PORT, () => {
  console.log(`App listening on port ${ PORT }`);
});
