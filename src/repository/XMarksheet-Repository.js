const {CrudRepository} = require('./index');
const { XMarkSheet } = require('../models/index');

class XMarkSheetRepository extends CrudRepository{
    constructor(){
        super(XMarkSheet);
    }
}

module.exports = XMarkSheetRepository;