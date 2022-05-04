const mongoose = require('mongoose');

const hedgeFundSchema = new mongoose.Schema({
    hedgeFundName: {
        type: String,
        required: 'This field is required.'
    },
    performanceRecentQuarter: {
        type: String,
        required: 'This field is required.'
    },
    aum: {
        type: String,
        required: 'This field is required.'
    },
    numberOfHoldings: {
        type: String,
        required: 'This field is required.'
    },
    manager: {
        type: String,
        required: 'This field is required.'
    },
    stock: {
        type: [String],
        required: 'This field is required.'
    },
    managerImg: {
        type: String,
        required: 'This field is required.'
    }
});

module.exports = mongoose.model('Hedge_funds', hedgeFundSchema);