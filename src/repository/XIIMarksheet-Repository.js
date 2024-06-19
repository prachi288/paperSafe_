const CrudRepository = require('./Crud-Repository');
const { XIIMarkSheet } = require('../models/index');

class XIIMarkSheetRepository extends CrudRepository{
    constructor(){
        super(XIIMarkSheet);
    }
}

module.exports = XIIMarkSheetRepository;