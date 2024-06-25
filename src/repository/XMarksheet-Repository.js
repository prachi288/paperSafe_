const CrudRepository = require('./Crud-Repository');
const { XMarkSheet } = require('../models/index');

class XMarkSheetRepository extends CrudRepository{
    constructor(){
        super(XMarkSheet);
    }

    async remove(userID){
        try {
            await this.model.deleteOne({
                userID: userID
            });
            return true;
        } catch (error) {
            console.log("Error in Xmarksheet Repository Layer");
            throw {error};
        }
    }

    async getByUserId(userID){
        try {
            const response = await this.model.findOne({userID});
            return response;
        } catch (error) {
            console.log("Error in Xmarksheet Repository Layer");
            throw {error};
        }
    }
}

module.exports = XMarkSheetRepository;