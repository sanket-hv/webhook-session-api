const mongoose = require('mongoose');

const WebHook = mongoose.Schema({
    name: String,
    payload: Object,
    addedBy: String,
    sv: String
}, {
    timestamps: true
});

module.exports = mongoose.model('WebHook', WebHook);