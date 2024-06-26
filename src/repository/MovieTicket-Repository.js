const CrudRepository = require('./Crud-Repository');
const { MovieTicket } = require('../models/index');
class MovieTicketRepository extends CrudRepository{
    constructor(){
        super(MovieTicket);
    }
    
    async remove(userID){
        try {
            await this.model.deleteOne({
                userID: userID
            });
            return true;
        } catch (error) {
            console.log("Error in Movie Ticket Repository Layer");
            throw {error};
        }
    }

    async getByUserId(userID){
        try {
            const response = await this.model.find({userID});
            return response;
        } catch (error) {
            console.log("Error in Movie Ticket Repository Layer");
            throw {error};
        }
    }
}

module.exports = MovieTicketRepository;