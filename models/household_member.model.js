const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HouseholdMemberSchema = new Schema(
    {
        firstName: { type: String, required: true},
        lastName: {type: String},
        birthday: { type: String, required: true },
        type: { type: String, required: true },
        gender: {type: String, required: true},
        isStudent: { type: Boolean, required: true },
        isHead: { type: Boolean, default: false },
        oldHomeId: { type: String },
        newHomeId: { type: String },
        headId: { type: String },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

// Export the model
module.exports = mongoose.model('HouseholdMember', HouseholdMemberSchema);

