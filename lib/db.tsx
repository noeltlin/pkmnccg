import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

const userSchema = new mongoose.Schema({
  userid: Number,
  username: String,
  password: String,
  email: String
}, { collection: 'user_data' });

const packSchema = new mongoose.Schema({
  packid: String,
  name: String,
  image: String,
  packtype: String,
  common: Array,
  uncommon: Array,
  rare: Array
}, { collection: 'pack_data' });

const collectionSchema = new mongoose.Schema({
  userid: Number,
  cards: Object,
  packs: Object
}, { collection: 'user_collection_data', minimize:false, strict: 'throw' });

export const User = mongoose.models?.User ?? mongoose.model('User', userSchema);
export const Pack = mongoose.models?.Pack ?? mongoose.model('Pack', packSchema);
export const Collection = mongoose.models?.Collection ?? mongoose.model('Collection', collectionSchema);

export default mongoose.models;