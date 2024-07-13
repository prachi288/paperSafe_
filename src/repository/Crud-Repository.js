class CrudRepository{

    constructor(model){
        this.model = model;
    }

    async create(data){
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            console.log("Error in CRUD Repository Layer");
            throw {error};
        }
    }

    async remove(id){
        try {
            await this.model.deleteOne({
                _id: id
            });
            return true;
        } catch (error) {
            console.log("Error in CRUD Repository Layer");
            throw {error};
        }
    }

    async getById(id){
        try {
            const response = await this.model.findById(id);
            return response;
        } catch (error) {
            console.log("Error in CRUD Repository Layer");
            throw {error};
        }
    }

    async getByEmail(emailID){
        try {
            const response = await this.model.findOne({emailID});
            return response;
        } catch (error) {
            console.log("Error in CRUD Repository Layer");
            throw {error};
        }
    }

    async update(id, data){
        try {
            const response = await this.model.findByIdAndUpdate(id, data,{new: true});
            return response;
        } catch (error) {
            console.log("Error in CRUD Repository Layer");
            throw {error};
        } 
    }
}

module.exports = CrudRepository;