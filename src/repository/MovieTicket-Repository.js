const CrudRepository = require('./Crud-Repository');
const { MovieTicket } = require('../models/index');
class MovieTicketRepository extends CrudRepository{
    constructor(){
        super(MovieTicket);
    }
}

module.exports = MovieTicketRepository;