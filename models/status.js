module.exports = (mongoose) => {

    const statusSchema = mongoose.Schema({
                name:{
                    type: String
                }
            },{ timestamps: false, versionKey:false });

    return mongoose.model('status', statusSchema);
};