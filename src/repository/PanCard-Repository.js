const CrudRepository = require('./Crud-Repository');
const { PANCard } = require('../models/index');

class PANCardRepository extends CrudRepository{
    constructor(){
        super(PANCard);
    }

    async remove(userID){
        try {
            await this.model.deleteOne({
                userID: userID
            });
            return true;
        } catch (error) {
            console.log("Error in PAN Repository Layer");
            throw {error};
        }
    }

    async getByUserId(userID){
        try {
            const response = await this.model.findOne({userID});
            return response;
        } catch (error) {
            console.log("Error in PAN Repository Layer");
            throw {error};
        }
    }
}

module.exports = PANCardRepository;