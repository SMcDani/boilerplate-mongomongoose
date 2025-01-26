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
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
