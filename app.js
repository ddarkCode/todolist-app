const express = require('express');
const ejs = require( 'ejs' );
const date = require( __dirname + '/date.js' );

const app = express();
const tasks = ['Meditate', 'Go For A Run', 'Read A Book'];
const workTasks = [];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get( '/', ( req, res ) => {
  const day = date.getDate();
  res.render('list', { listTitle: day, tasks: tasks });
});

app.get('/work', (req, res) => {
  res.render('list', { listTitle: 'Work', tasks: workTasks });
} );

app.get( '/about', ( req, res ) => {
  const day = date.getDay()
  res.render('about', {listTitle: day})
})

app.post('/', (req, res) => {
  console.log(req.body)
  const { task, list } = req.body;
  if ( list === 'Work' ) {
    workTasks.push( task );
    res.redirect('/work')
  } else {

    tasks.push(task);
    res.redirect('/');
  }
  
});

app.listen(3000, () => console.log('Server running on port 3000'));
