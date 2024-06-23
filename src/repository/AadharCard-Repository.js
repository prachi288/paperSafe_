const CrudRepository = require('./Crud-Repository');
const {AadhaarCard} = require('../models/index');

class AadhaarCardRepository extends CrudRepository{
    constructor(){
        super(AadhaarCard);
    }

    async remove(userID){
        try {
            await this.model.deleteOne({
                userID: userID
            });
            return true;
        } catch (error) {
            console.log("Error in Aadhar Repository Layer");
            throw {error};
        }
    }

    async getByUserId(userID){
        try {
            const response = await this.model.findOne({userID});
            return response;
        } catch (error) {
            console.log("Error in Aadhar Repository Layer");
            throw {error};
        }
    }

}

module.exports = AadhaarCardRepository;