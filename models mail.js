
const mongoose = require('mongoose');
const MailSchema = new mongoose.Schema({
    to: String,
    subject: String,
    content: String,
    time: Date
});
module.exports = mongoose.model('Mail', MailSchema);
