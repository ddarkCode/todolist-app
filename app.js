const express = require('express');
const ejs = require( 'ejs' );
const mongoose = require( 'mongoose' )


const app = express();
const tasks = ['Meditate', 'Go For A Run', 'Read A Book'];
const workTasks = [];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set( 'view engine', 'ejs' );

mongoose.connect( 'mongodb://localhost:27017/todolistDB', { useNewUrlParser: true, useUnifiedTopology: true } );

const itemsSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: [true, 'Input your todo']
  }
})

const Item = mongoose.model( 'Item', itemsSchema )

const item1 = new Item( {
  name: 'Welcome to your todo list!'
} )

const item2 = new Item( {
  name: 'Hit the + button to add an item.'
} )

const item3 = new Item( {
  name: '<--- Hit this to delete an item.'
} )

const defaultItems = [item1, item2, item3]

// Item.insertMany( defaultItems, function ( err, items ) {
//   if ( err ) {
//     console.log(err)
//   } else {
//     console.log( 'Successfully add Items to database' );
//   }
// })


app.get( '/', ( req, res ) => {
  Item.find( function ( err, results ) {
  if ( err ) {
    console.log( err );
  } else {
    res.render('list', { listTitle: 'Today', tasks: results });
  }
})
  
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
