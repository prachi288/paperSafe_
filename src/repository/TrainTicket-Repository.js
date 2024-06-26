const CrudRepository = require('./Crud-Repository');
const { TrainTicket } = require('../models/index');

class TrainTicketRepository extends CrudRepository{
    constructor(){
        super(TrainTicket);
    }

    async getByUserId(userID){
        try {
            const response = await this.model.find({userID});
            return response;
        } catch (error) {
            console.log("Error in Train Ticket Repository Layer");
            throw {error};
        }
    }
}

module.exports = TrainTicketRepository;