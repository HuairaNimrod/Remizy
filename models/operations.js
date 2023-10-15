module.exports = (mongoose) => {

    const operationSchema = mongoose.model(
        'operation',
            mongoose.Schema({
                Sender:{
                    type: String
                },
                Receiver:{
                    type: String
                },
                Amount:{
                    type: Number
                },
                Rate:{
                    type: Number
                },
                DepositId:{
                    type: String
                },
                Status:{
                    type: String
                },
                Comments:{
                    type: String
                }
            },{ timestamps: false, versionKey:false })
    );
    return operationSchema;
};