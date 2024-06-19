const CrudRepository = require('./Crud-Repository');
const { TrainTicket } = require('../models/index');

class TrainTicketRepository extends CrudRepository{
    constructor(){
        super(TrainTicket);
    }
}

module.exports = TrainTicketRepository;