import * as mongoose from 'mongoose';
import { model } from 'mongoose';

const catagorySchema = new mongoose.Schema({
    restaurant_id:  { type: mongoose.Types.ObjectId, required: true},
    name: { type: String , required: true},
    created_at: { type: Date, required: true, default: new Date()},
    updated_at:  { type: Date, required: true, default: new Date()},

});

export default model('catagories', catagorySchema);