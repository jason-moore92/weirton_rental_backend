const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeSchema = new Schema(
    {
        address: {type: String},
        city: {type: String},
        state: {type: String},
        zipcode: {type: String},
        country: {type: String},
        msa: {type: String},
        tractCode: {type: String},
        stateCode: { type: String },
        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

// creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// const savedOrder = await Order.findById(order._id).populate('meal').populate('chef').populate('creator');

HomeSchema.pre('save', async function (next) {
    let product = this;
    return next();
});

// Export the model
module.exports = mongoose.model('Home', HomeSchema);

