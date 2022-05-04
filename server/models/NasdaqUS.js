const mongoose = require('mongoose');

const nasdaqUSSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: 'This field is required.'
    },
    ticker: {
        type: String,
        required: 'This field is required.'
    },
    market: {
        type: String,
        required: 'This field is required.'
    },
    zip: {
        type: String,
        required: 'This field is required.'
    },
    sectorUS: {
        type: String,
        required: 'This field is required.'
    },
    industry: {
        type: String,
        required: 'This field is required.'
    },
    website: {
        type: String,
        required: 'This field is required.'
    },
    fullTimeEmployees: {
        type: Number,
        required: 'This field is required.'
    },
    overviewUS: {
        type: String,
        required: 'This field is required.'
    },
    city: {
        type: String,
        required: 'This field is required.'
    },
    address1: {
        type: String,
        required: 'This field is required.'
    },
    country: {
        type: String,
        required: 'This field is required.'
    },
    dividendRate: {
        type: Number,
        required: 'This field is required.'
    },
    dividendYield: {
        type: Number,
        required: 'This field is required.'
    },
    logoURL: {
        type: String,
        required: 'This field is required.'
    },
    fiftyTwoWeekLow: {
        type: Number,
        required: 'This field is required.'
    },
    fiftyTwoWeekHigh: {
        type: Number,
        required: 'This field is required.'
    },
    pegRatio: {
        type: Number,
        required: 'This field is required.'
    },
    forwardPE: {
        type: Number,
        required: 'This field is required.'
    },
    trailingPE: {
        type: Number,
        required: 'This field is required.'
    },
    regularMarketVolume: {
        type: Number,
        required: 'This field is required.'
    },
    payoutRatio: {
        type: Number,
        required: 'This field is required.'
    },
    beta: {
        type: Number,
        required: 'This field is required.'
    },
    shortRatio: {
        type: Number,
        required: 'This field is required.'
    },
    trailingEps: {
        type: Number,
        required: 'This field is required.'
    },
    forwardEps: {
        type: Number,
        required: 'This field is required.'
    },
    heldPercentInstitutions: {
        type: Number,
        required: 'This field is required.'
    },
    enterpriseToEbitda: {
        type: Number,
        required: 'This field is required.'
    },
    enterpriseToRevenue: {
        type: Number,
        required: 'This field is required.'
    },
    shortnameUS: {
        type: String,
        required: 'This field is required.'
    },
    longnameUS: {
        type: String,
        required: 'This field is required.'
    },
    targetHighPrice: {
        type: Number,
        required: 'This field is required.'
    },
    targetMeanPrice: {
        type: Number,
        required: 'This field is required.'
    },
    returnOnEquity: {
        type: Number,
        required: 'This field is required.'
    },
    debtToEquity: {
        type: Number,
        required: 'This field is required.'
    },
    returnOnAssets: {
        type: Number,
        required: 'This field is required.'
    },
    currentRatio: {
        type: Number,
        required: 'This field is required.'
    },
    earningsGrowth: {
        type: Number,
        required: 'This field is required.'
    },
    targetMedianPrice: {
        type: Number,
        required: 'This field is required.'
    },
    recommendationKey: {
        type: String,
        required: 'This field is required.'
    },
    targetLowPrice: {
        type: Number,
        required: 'This field is required.'
    },
    operatingMargins: {
        type: Number,
        required: 'This field is required.'
    },
    revenueGrowth: {
        type: Number,
        required: 'This field is required.'
    },
    grossMargins: {
        type: Number,
        required: 'This field is required.'
    },
    profitMargins: {
        type: Number,
        required: 'This field is required.'
    },
    ebitdaMargins: {
        type: Number,
        required: 'This field is required.'
    },
});

module.exports = mongoose.model('Nasdaq_us', nasdaqUSSchema);