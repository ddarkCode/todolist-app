const express = require('express');
const ejs = require('ejs');

const app = express();
const tasks = ['Meditate', 'Go For A Run', 'Read A Book'];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let toDay = new Date();

  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const day = toDay.toLocaleString('en-US', options);

  res.render('list', { kindOfDay: day, tasks: tasks });
});

app.post('/', (req, res) => {
  const { task } = req.body;
  console.log(task);
  tasks.push(task);
  res.redirect('/');
});

app.listen(3000, () => console.log('Server running on port 3000'));
