const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    userName: {
      unique: true,
      type: String,
      required: true,
    },
    selectedOption: {
        type: String,
        required: true,
    },
    isChecked: {
        type: Boolean,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
