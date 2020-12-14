import mongoose, { Schema } from 'mongoose'


export const collection = 'UserData'

// Schema
const schema = new Schema({  
    name: {
      type: String
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    mobile: {
      type: String      
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,      
    },
    role: {
      type: String,      
    },
    age: {
      type: String
    },
    gender: {
      type: String
    }
}, {timestamps: true})

// Model
export default mongoose.model(collection, schema, collection)

