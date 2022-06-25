const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Drive = new Schema({
    companyName: {
        type: String
    },
    form: [{'key':String,'value':String}],
    link: {
        type: String
    }
});
module.exports = mongoose.model('drive', Drive);
