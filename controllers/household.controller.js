// Load models.
const HomeModel = require("../models/home.model");
const HouseholdMemberModel = require("../models/household_member.model");
const IncomeModel = require("../models/income.model");

const sgMail = require("@sendgrid/mail");
const sgConf = require("../config/sendgrid.config");
sgMail.setApiKey(sgConf.API_KEY);
const {FAMILY_TYPE} = require('../config');
const incomeModel = require("../models/income.model");

/////////////////////////////////////////////////////////////////////////
/////////////////////////// Submit Form /////////////////////////////////
/////////////////////////////////////////////////////////////////////////
async function addNew(req, res) {
    try {
        const {
            newHome,
            oldHome,
            members,
        } = req.body;

        console.log("req.body", req.body)

        var newHomeModel = new HomeModel();
        newHomeModel.address = newHome.address;
        newHomeModel.city = newHome.city;
        newHomeModel.state = newHome.state;
        newHomeModel.zipcode = newHome.zipcode;
        newHomeModel.country = newHome.country;
        newHomeModel.msa = newHome.msa;
        newHomeModel.tractCode = newHome.tractCode;
        newHomeModel.stateCode = newHome.stateCode;
        newHomeModel.location = newHome.location;

        newHomeModel = await newHomeModel.save();

        var oldHomeModel = new HomeModel();
        oldHomeModel.address = oldHome.address;
        oldHomeModel.city = oldHome.city;
        oldHomeModel.state = oldHome.state;
        oldHomeModel.zipcode = oldHome.zipcode;
        oldHomeModel.country = oldHome.country;
        oldHomeModel.msa = oldHome.msa;
        oldHomeModel.tractCode = oldHome.tractCode;
        oldHomeModel.stateCode = oldHome.stateCode;
        oldHomeModel.location = oldHome.location;

        oldHomeModel = await oldHomeModel.save();

        console.log("oldHomeModel", oldHomeModel)
        console.log("newHomeModel", newHomeModel)

        for (let index = 0; index < members.length; index++) {
            const member = members[index];
            var householdMemberModel = new HouseholdMemberModel();
            householdMemberModel.firstName = member.firstName
            householdMemberModel.lastName = member.lastName
            householdMemberModel.birthday = member.birthday
            householdMemberModel.gender = member.gender
            householdMemberModel.isStudent = member.isStudent
            householdMemberModel.isStudent = member.isStudent
            if (index == 0) {
                householdMemberModel.isHead = true
                householdMemberModel.oldHomeId = oldHomeModel.id
                householdMemberModel.newHomeId = newHomeModel.id
            } else { 
                householdMemberModel.headId = members[0].id
            }
            householdMemberModel = await householdMemberModel.save();
            members[index] = householdMemberModel
            var incomeModel = new IncomeModel()
            incomeModel.memberId = householdMemberModel.id
            incomeModel.type = member.incomeType
            incomeModel.annualAmount = member.incomeAmount
            incomeModel = await incomeModel.save();
        }

        res.json({
            result: true,
            data: "success",
        });
    } catch (error) {
        console.error(error);
    }
    
}

module.exports = {
    addNew,
};
