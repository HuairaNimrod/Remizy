module.exports = (mongoose) => {

    const userSchema = mongoose.Schema({
                nickname:{
                    type: String
                },
                venmoId:{
                    type: String
                },
                email:{
                    type: String
                }

            },{ timestamps: false, versionKey:false });

    return mongoose.model('status', statusSchema);
};