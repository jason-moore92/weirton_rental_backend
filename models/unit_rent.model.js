const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UnitRentSchema = new Schema(
    {
        memberId: { type: String, require: true },
        potentialRent: { type: Number },
        tenantRent: { type: Number },
        concession: { type: Number },
        incomeLimit: { type: Number },
        isVoucher: { type: Boolean },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

// Export the model
module.exports = mongoose.model('UnitRent', UnitRentSchema);

