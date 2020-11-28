const express = require('express');
const ejs = require('ejs');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let toDay = new Date();

  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const day = toDay.toLocaleString('en-US', options);

  res.render('list', { kindOfDay: day });
});

app.post('/', (req, res) => {
  const { task } = req.body;
  console.log(task);
  res.redirect('/');
});

app.listen(3000, () => console.log('Server running on port 3000'));
