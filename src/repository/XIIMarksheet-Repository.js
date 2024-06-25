const CrudRepository = require('./Crud-Repository');
const { XIIMarkSheet } = require('../models/index');

class XIIMarkSheetRepository extends CrudRepository{
    constructor(){
        super(XIIMarkSheet);
    }

    async remove(userID){
        try {
            await this.model.deleteOne({
                userID: userID
            });
            return true;
        } catch (error) {
            console.log("Error in XIImarksheet Repository Layer");
            throw {error};
        }
    }

    async getByUserId(userID){
        try {
            const response = await this.model.findOne({userID});
            return response;
        } catch (error) {
            console.log("Error in XIImarksheet Repository Layer");
            throw {error};
        }
    }
}

module.exports = XIIMarkSheetRepository;