const {CrudRepository} = require('./index');
const { XIIMarkSheet } = require('../models/index');

class XIIMarkSheetRepository extends CrudRepository{
    constructor(){
        super(XIIMarkSheet);
    }
}

module.exports = XIIMarkSheetRepository;