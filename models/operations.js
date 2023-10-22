module.exports = (mongoose) => {

    const operationSchema = mongoose.Schema({
                sender:{
                    type: String
                },
                receiver:{
                    type: String
                },
                amount:{
                    type: Number
                },
                rate:{
                    type: Number
                },
                depositId:{
                    type: String
                },
                status:{
                    type: String
                },
                comments:{
                    type: String
                }
            },{ timestamps: false, versionKey:false });

    return mongoose.model('operations', operationSchema);
};