import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const DoctorSchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: [true,"Name is required"],
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true,"Username is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true,"Password is required"],
    trim: true
  },
  addressresidential: {
    type: String,
    required: [true,"Residential address is required"],
    trim: true
  },
  addressclinic: {
    type: String,
    required: [true,"Clinic address is required"],
    trim: true
  },
  contacttiming: {
    type: String,
    required: [true,"Contact details is required"],
    trim: true
  },
  designation: {
    type: String,
    required: [true,"Designation is required"],
    trim: true
  },
  specialization: {
    type: String,
    required: [true,"Specialization is required"],
    trim: true
  },
  experience: {
    type: Number,
    required: [true,"Experience is required"],
    trim: true
  },
  contactpersonal: String,
  contactclinic: String,
  profilepic:String,
  role: String,
  status: Number,
  info: String,
  appointmentnumber:{
    type: Number,
    maxlength:12
  },
  appointmentdetails:Array,
});

DoctorSchema.plugin(uniqueValidator);

const DoctorSchemaModel = mongoose.model('doctor_collection',DoctorSchema);

export default DoctorSchemaModel