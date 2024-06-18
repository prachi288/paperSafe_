const {CrudRepository} = require('./index');
const { MovieTicket } = require('../models/index');
class MovieTicketRepository extends CrudRepository{
    constructor(){
        super(MovieTicket);
    }
}

module.exports = MovieTicketRepository;