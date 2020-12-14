import mongoose, { Schema } from 'mongoose'


export const collection = 'UserPost'

// Schema
const schema = new Schema({  
    title: {
      type: String
    },
    body: {
      type: String,
      
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      
    },    
    image: {
      type: String,      
    },        
}, {timestamps: true})

// Model
export default mongoose.model(collection, schema, collection)

