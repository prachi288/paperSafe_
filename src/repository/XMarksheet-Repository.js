const CrudRepository = require('./Crud-Repository');
const { XMarkSheet } = require('../models/index');

class XMarkSheetRepository extends CrudRepository{
    constructor(){
        super(XMarkSheet);
    }
}

module.exports = XMarkSheetRepository;