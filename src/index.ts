import {connect, model, Schema} from 'mongoose'
import axios from 'axios'

const drinkSchema = new Schema({
  idDrink: String
}, {strict: false});

const Drinks = model('drink', drinkSchema);

(async () => {
  try {
    await connect('mongodb://localhost:27017/pmg', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
    console.info('connected to mongodb!');
    const {data: {drinks} } = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
    await Drinks.create(drinks)
    console.log('drinks created!');
  } catch (e) {
    console.error(e);
  }
})()
