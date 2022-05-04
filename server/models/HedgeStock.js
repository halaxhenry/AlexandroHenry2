const mongoose = require('mongoose');

const hedgeStockSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: 'This field is required.'
    },
    managerImgUrl: {
        type: String,
        required: 'This field is required.'
    },
    fund: {
        type: String,
        required: 'This field is required.'
    },
    manager: {
        type: String,
        required: 'This field is required.'
    },
    filename: {
        type: String,
        required: 'This field is required.'
    },
    shares: {
        type: String,
        required: 'This field is required.'
    },
    value: {
        type: String,
        required: 'This field is required.'
    },
    percentChange: {
        type: String,
        required: 'This field is required.'
    },
    change: {
        type: String,
        required: 'This field is required.'
    },
    percentOfPortfolio: {
        type: String,
        required: 'This field is required.'
    },
    updated: {
        type: String,
        required: 'This field is required.'
    },
    date: {
        type: String,
        required: 'This field is required.'
    }
});

module.exports = mongoose.model('Hedge_stocks', hedgeStockSchema);