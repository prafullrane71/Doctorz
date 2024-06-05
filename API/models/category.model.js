import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const CategorySchema = mongoose.Schema({
  _id: Number,
  catname: {
    type: String,
    required: [true,"Category name is required"],
    lowercase: true,
    trim: true,
    unique: true
  },
  caticonname: {
    type: String,
    required: [true,"Category icon name is required"],
    lowercase: true,
    trim: true
  }
});

// Apply the uniqueValidator plugin to UserSchema.
CategorySchema.plugin(uniqueValidator);

// compile schema to model
const CategorySchemaModel = mongoose.model('category_collection',CategorySchema);

export default CategorySchemaModel

