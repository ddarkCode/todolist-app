const express = require('express');
const ejs = require( 'ejs' );
const mongoose = require( 'mongoose' )
const _ = require('lodash')


const app = express();

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
  name: '<-- Hit this to delete an item.'
} )

const defaultItems = [item1, item2, item3]

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
})

const List = mongoose.model( 'List', listSchema );

app.get( '/', ( req, res ) => {
  Item.find( function ( err, results ) {
  if ( err ) {
    console.log( err );
  } else {
    if ( results.length === 0 ) {
      Item.insertMany( defaultItems, function ( err, items ) {
  if ( err ) {
    console.log(err)
  } else {
    console.log( 'Successfully add Items to database' );
  }
      } )
      res.redirect( '/' );
    } else {
       res.render('list', { listTitle: 'Today', tasks: results });
    }
  }
})
  
});

app.get('/:newListPage', (req, res) => {
  const newListPage = _.capitalize( req.params.newListPage );

  const list = new List( {
    name: newListPage,
    items: defaultItems
  } )
  List.findOne( { name: newListPage }, function ( err, result ) {
    if ( err ) {
      console.log(err)
    } else {
      if ( result ) {
        if ( result.name === newListPage ) {
          res.render('list', { listTitle: result.name, tasks: result.items } )
        }
      } else {
        list.save( function ( err ) {
          if ( err ) {
            console.log( err );
          } else {
            res.redirect('/' + newListPage)
          }
        })
      }
    }
  })
} );


app.get( '/about', ( req, res ) => {
  const day = date.getDay()
  res.render('about', {listTitle: day})
})

app.post('/', (req, res) => {
  const { task, list } = req.body
  
  const newItem = new Item( {
    name: task
  } )
  
  if ( list === 'Today' ) {
    newItem.save(function (err) {
    if ( err ) {
      console.log(err)
    }
     res.redirect('/');
  })
  } else {
    List.findOne( { name: list }, function ( err, result ) {
        result.items.push( newItem )
        result.save();
        res.redirect('/' + list)
    })
  }
   
  })


app.post( '/delete', function ( req, res ) {
  const { checkbox, listName } = req.body;
  

  if ( listName === 'Today' ) {
     Item.findByIdAndRemove( checkbox, function ( err, result ) {
       if ( !err ) {
         console.log('Successfully deleted the item.')
         res.redirect( '/' );
   }
    
  })
  } else {
    console.log('List')
    List.findOneAndUpdate( { name: listName }, { $pull: {items: { _id: checkbox }} }, function ( err, result ) {
      if ( !err ) {
        console.log( result )
        res.redirect('/' + listName)
      }
    })
  }
 
  })
  


app.listen(3000, () => console.log('Server running on port 3000'));
