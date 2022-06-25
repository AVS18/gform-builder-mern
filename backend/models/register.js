const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Register = new Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'drive'
    },
    registrationData: {
        type: Object,
        blackbox: true
    },
});
module.exports = mongoose.model('register', Register);
