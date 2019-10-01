const express = require('express');
const app = express();

const bodyParser= require('body-parser');
const mongoose=require('mongoose');
const Recipe=require('./models/recipe');
const cors=require('cors');

app.use(cors());
mongoose.connect('mongodb+srv://nerjib:23188695@cluster0-xwotd.mongodb.net/test?retryWrites=true')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(bodyParser.json());


app.post('/api/recipes', (req,res,next)=>{ 
console.log(req.params.id);
console.log(req.body);
 
const recipe = new Recipe({
    title: req.body.title,
instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    time: req.body.time,
    difficulty: req.body.difficulty  
  });
  recipe.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );

});


app.get('/recipes/:id', (req, res, next) => {
  Recipe.findOne({
    _id: req.params.id
  }).then(
    (recipe) => {
      res.status(200).json(recipe);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
});




app.put('/api/recipes/:id', (req, res, next) => {
  const recipe = new Recipe({
    title: req.body.title,
instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    time: req.body.time,
    difficulty: req.body.difficulty  
   
  });
  Recipe.updateOne({_id: req.params.id}, recipe).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.delete('/api/recipe/:id', (req, res, next) => {
console.log(req.params.id);
  Recipe.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.get('/api/recipes', (req, res, next) => {
  Recipe.find().then(
    (recipe) => {
      res.status(200).json(recipe);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});


module.exports = app;