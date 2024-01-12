const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [20, 'Name cannot exceed 20 characters'],
        minlength: [3, 'Name should have more than 3 characters'],        

    },
    completed: { 
        type: Boolean,
        default: false,
    }
})



module.exports = mongoose.model('Task', TaskSchema);