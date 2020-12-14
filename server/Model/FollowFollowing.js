import mongoose, { Schema } from 'mongoose'
import User from './User'


export const collection = 'FollowFollowing'

// Schema
const schema = new Schema({  
    userId: {
      type: Schema.Types.ObjectId,
      ref: User
    },
    followUserId: {
      type: Schema.Types.ObjectId,      
    }            
}, {timestamps: true})

// Model
export default mongoose.model(collection, schema, collection)

