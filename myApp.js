require('dotenv').config();
let mongoose = require('mongoose');

//#1 Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//#2.0 Create a schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String],
})

//2.5 Create a model from the schema
let Person = mongoose.model("Person", personSchema) ;

//#3 create and save a record of a model
const createAndSavePerson = (done) => {
  let prsn = new Person({
    name: 'Link',
    age: 30,
    favoriteFoods: ['Tomatos', 'Garlic', 'Onions'],
  });
  prsn.save((err, data) => {
    if(err) console.log(`Error: ${err}`);
    done(null, data);
  });
  
};

//#4 use model.create() to create many people with an array. this can be used for seeding a db with initial data
let arrayOfPeople = [
  {
    name: 'Wonder',
    age: 19,
    favoriteFoods: ['Artichoke', 'Spinich'],
  },
  {
    name: 'Cinnamon',
    age: 34,
    favoriteFoods: ['Cinnamon'],
  }
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if(err) console.log(err);
    done(null, data);
  });
  
};


//#5 use model.find() to search the database
let personName = 'Cinnamon';
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if(err) console.log(err);
    done(null, data);
  });
  
};

//#6 use model.findOne() to return a single matching document from your database
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if(err) console.log(err);
    done(null, data);
  });
  
};

//#7 use model.findById() to search database by id. searching by _id is very common, so much so that mongoose provides a dedicated method for it
const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if(err) console.log(err);
    done(null, data);
  })
  
};


//#8 perform updates by running find/edit/save. Model.update() is a dedicated mongoose method. does not send back updated document,
//only a status message. can bulk-edit.
//person.find doesnt work here because it returns an array instead of an object.
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
    if(err){
      console.log(err);
    } else{
      data.favoriteFoods.push(foodToAdd);
      data.save((err, newData) => {
        if(err){
          console.log(err);
        } else{
          done(null, newData);
        }
      });
    }
  })
  
};


//#9 perform new updates on a document using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true }, (err, data) => {
    if(err){
      console.log(err);
    } else{
    done(null, data);
    }
  });
};

//#10 remove from the db
const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId }, (err, data) => {
    if(err) console.log(err);
    done(null, data);
  });
};

//#11 remove multiple from the db
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
    if(err) console.log(err);
    done(null, data);
  })
  
};

//#12 a callback is necessary in Model.find() as well as the other search methods, otherwise the query is not executed.
//if wanting to execute later, the query can be stored in a var for later use, and the search will be executed when using .exec().
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }).sort('name').limit(2).select('-age').exec((err, data) => {
    if(err) console.log(err);
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
