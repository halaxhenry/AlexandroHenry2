const mongoose = require('mongoose');

const nasdaqKRSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: 'This field is required.'
    },
    market: {
        type: String,
        required: 'This field is required.'
    },
    nameKR: {
        type: String,
        required: 'This field is required.'
    },
    sectorKR: {
        type: String,
        required: 'This field is required.'
    },
    marketCapKRWon: {
        type: String,
        required: 'This field is required.'
    },
    marketCapKRDollar: {
        type: Number,
        required: 'This field is required.'
    },
    overviewKR: {
        type: String,
        required: 'This field is required.'
    },
    eps: {
        type: String,
        required: 'This field is required.'
    },
    per: {
        type: String,
        required: 'This field is required.'
    }
});

module.exports = mongoose.model('Nasdaq_kr', nasdaqKRSchema);