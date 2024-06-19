const CrudRepository = require('./Crud-Repository');
const {AadhaarCard} = require('../models/index');

class AadhaarCardRepository extends CrudRepository{
    constructor(){
        super(AadhaarCard);
    }
}

module.exports = AadhaarCardRepository;