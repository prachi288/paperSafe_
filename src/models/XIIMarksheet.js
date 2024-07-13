const mongoose = require('mongoose');

const xiiMarkSheetSchema = new mongoose.Schema({
    schemaVersion : {
        type: Number,
        default: 1
    },
    version: {
        type: Number,
        required: true,
    },
    public_id : {
        type: String,
        required: true,
    },
    isFavourite : {
        type : Boolean,
        default: false
    },
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
});

const XIIMarkSheet = mongoose.model('XIIMarkSheet', xiiMarkSheetSchema);

module.exports = XIIMarkSheet;