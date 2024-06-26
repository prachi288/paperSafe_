const { TrainTicketService } = require('../service/index');

const trainTicketService = new TrainTicketService();

const uploadtrainTicket = async(req, res)=>{
    try {
        const data = req.body;

        const response = await trainTicketService.uploadTrainTicket(data);
        return res.status(201).json({
            data: response,
            error:{},
            success: true,
            message: "Train Ticket Uploaded Successfully"
        });

    } catch (error) {
        console.log("Error in Train Ticket Controller Layer");
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to Upload Train Ticket"
        });
    }
}

const downloadtrainTicket = async (req, res) => {
    try {
        const userID = req.params.id;

        const response = await trainTicketService.downloadTrainTicket(userID);
        
        return res.status(201).json({
            data: response,
            error:{},
            success: true,
            message: "Train Ticket Downloaded Successfully"
        });

    } catch (error) {
        console.log('Error in Train Ticket Controller Layer');
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: 'Failed to download train tickets'
        });
    }
};

const deletetrainTicket = async(req, res)=>{
    try {
        const id = req.params.id;

        await trainTicketService.deleteTrainTicket(id);
        
        return res.status(200).json({
            data: {},
            error: {},
            success: true,
            message: "Successfully Deleted Train Ticket"
        });;

    } catch (error) {
        console.log("Error in Train Ticket Controller Layer");
        return res.status(500).json({
            data: {},
            error: {error},
            success: false,
            message: "Failed to Delete Train Ticket"
        });
    }
}

module.exports = {
    uploadtrainTicket,
    downloadtrainTicket,
    deletetrainTicket
}