const { TrainTicketRepository } = require('../repository/index');

class TrainTicketService{
    constructor(){
        this.trainTicketRepository = new TrainTicketRepository();
    }

    async uploadTrainTicket(data){
        try {
            const response = await this.trainTicketRepository.create(data);

            return response;
        } catch (error) {
            console.log("Error in Train Ticket Service Layer");
            throw {error};
        }
    }

    async downloadTrainTicket(userID){
        try {
            const response = await this.trainTicketRepository.getByUserID(userID)

            return response;
          } catch (error) {
            console.log("Error in Train Ticket Service Layer");
            throw {error};
        }
    }

    async deleteTrainTicket(id){
      try {
        await this.trainTicketRepository.remove(id);

        return true;
      } catch (error) {
        console.log("Error in Train Ticket Service Layer");
            throw {error};
      }
    }

}

module.exports = TrainTicketService;