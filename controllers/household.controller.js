// Load models.
const HomeModel = require("../models/home.model");
const HouseholdMemberModel = require("../models/household_member.model");
const IncomeModel = require("../models/income.model");
const UnitRentModel = require("../models/unit_rent.model");


/////////////////////////////////////////////////////////////////////////
/////////////////////////// Submit Form /////////////////////////////////
/////////////////////////////////////////////////////////////////////////
async function addNew(req, res) {
    try {
        const {
            newHome,
            oldHome,
            members,
            potentialRent,
            tenantRent,
            concession,
            incomeLimit,
            isVoucher,
        } = req.body;

        for (let index = 0; index < members.length; index++) {
            const member = members[index];
            var householdMemberModel = new HouseholdMemberModel();
            householdMemberModel.firstName = member.firstName
            householdMemberModel.lastName = member.lastName
            householdMemberModel.birthday = member.birthday
            householdMemberModel.type = member.type
            householdMemberModel.gender = member.gender
            householdMemberModel.isStudent = member.isStudent
            if (index == 0) {
                householdMemberModel.isHead = true
                householdMemberModel.oldHome = oldHome
                householdMemberModel.newHome = newHome
            } else {
                householdMemberModel.headId = members[0].id
                householdMemberModel.oldHome = oldHome
                householdMemberModel.newHome = newHome
            }
            householdMemberModel = await householdMemberModel.save();
            members[index] = householdMemberModel

            var incomeModel = new IncomeModel()
            incomeModel.memberId = householdMemberModel.id
            incomeModel.type = member.incomeType
            incomeModel.annualAmount = member.annualAmount
            incomeModel = await incomeModel.save();
        }

        console.log("headId", members[0].id)
        var unitRentModel = new UnitRentModel()
        unitRentModel.memberId = members[0].id
        unitRentModel.potentialRent = potentialRent
        unitRentModel.tenantRent = tenantRent
        unitRentModel.concession = concession
        unitRentModel.incomeLimit = incomeLimit
        unitRentModel.isVoucher = isVoucher
        unitRentModel = await unitRentModel.save();

        res.json({
            success: true,
            data: "success",
        });
    } catch (error) {
        console.error(error);
    }

}

// async function addNew(req, res) {
//     try {
//         const {
//             newHome,
//             oldHome,
//             members,
//             potentialRent,
//             tenantRent,
//             concession,
//             incomeLimit,
//             isVoucher,
//         } = req.body;

//         console.log("req.body", req.body)
//         var newHomeModel;
//         if (newHome['_id']) {
//             newHomeModel = newHome;
//         } else {
//             newHomeModel = new HomeModel();
//             newHomeModel.address = newHome.address;
//             newHomeModel.city = newHome.city;
//             newHomeModel.state = newHome.state;
//             newHomeModel.zipcode = newHome.zipcode;
//             newHomeModel.country = newHome.country;
//             newHomeModel.msa = newHome.msa;
//             newHomeModel.tractCode = newHome.tractCode;
//             newHomeModel.stateCode = newHome.stateCode;
//             newHomeModel.location = newHome.location;
//             newHomeModel = await newHomeModel.save();
//         }
        
//         if (oldHome['_id']) {
//             oldHomeModel = oldHome;
//         } else { 
//             var oldHomeModel = new HomeModel();
//             oldHomeModel.address = oldHome.address;
//             oldHomeModel.city = oldHome.city;
//             oldHomeModel.state = oldHome.state;
//             oldHomeModel.zipcode = oldHome.zipcode;
//             oldHomeModel.country = oldHome.country;
//             oldHomeModel.msa = oldHome.msa;
//             oldHomeModel.tractCode = oldHome.tractCode;
//             oldHomeModel.stateCode = oldHome.stateCode;
//             oldHomeModel.location = oldHome.location;
//             oldHomeModel = await oldHomeModel.save();
//         }

//         console.log("oldHomeModel", oldHomeModel)
//         console.log("newHomeModel", newHomeModel)

//         for (let index = 0; index < members.length; index++) {
//             const member = members[index];
//             var householdMemberModel = new HouseholdMemberModel();
//             householdMemberModel.firstName = member.firstName
//             householdMemberModel.lastName = member.lastName
//             householdMemberModel.birthday = member.birthday
//             householdMemberModel.type = member.type
//             householdMemberModel.gender = member.gender
//             householdMemberModel.isStudent = member.isStudent
//             if (index == 0) {
//                 householdMemberModel.isHead = true
//                 householdMemberModel.oldHomeId = oldHomeModel.id
//                 householdMemberModel.newHomeId = newHomeModel.id
//             } else { 
//                 householdMemberModel.headId = members[0].id
//                 householdMemberModel.oldHomeId = oldHomeModel.id
//                 householdMemberModel.newHomeId = newHomeModel.id
//             }
//             householdMemberModel = await householdMemberModel.save();
//             members[index] = householdMemberModel

//             var incomeModel = new IncomeModel()
//             incomeModel.memberId = householdMemberModel.id
//             incomeModel.type = member.incomeType
//             incomeModel.annualAmount = member.annualAmount
//             incomeModel = await incomeModel.save();
//         }

//         console.log("headId", members[0].id)
//         var unitRentModel = new UnitRentModel()
//         unitRentModel.memberId = members[0].id
//         unitRentModel.potentialRent = potentialRent
//         unitRentModel.tenantRent = tenantRent
//         unitRentModel.concession = concession
//         unitRentModel.incomeLimit = incomeLimit
//         unitRentModel.isVoucher = isVoucher
//         unitRentModel = await unitRentModel.save();

//         res.json({
//             success: true,
//             data: "success",
//         });
//     } catch (error) {
//         console.error(error);
//     }
    
// }

async function updateHome(req, res) {
    try {
        const home = req.body;

        let updatedHome = await HomeModel.findByIdAndUpdate(home["_id"], home, { new: true });
        res.json({
            success: true,
            data: updatedHome,
        });
    } catch (error) {
        console.error(error);
    }
}
async function addNewHome(req, res) {
    try {
        const home = new HomeModel()
        home.address = req.body.address
        home.city = req.body.city
        home.state = req.body.state
        home.zipcode = req.body.zipcode
        home.country = req.body.country
        home.msa = req.body.msa
        home.tractCode = req.body.tractCode
        home.stateCode = req.body.stateCode
        home.location = req.body.location

        let newHome = await home.save()
        console.log(newHome)
        res.json({
            success: true,
            data: newHome,
        });
    } catch (error) {
        console.error(error);
    }
}

async function deleteHome(req, res) {
    try {
        const home = req.body;

        await HomeModel.findByIdAndDelete(home["_id"])
        res.json({
            success: true,
            data: home,
        });
    } catch (error) {
        console.error(error);
    }
}


async function getAllHomes(req, res) { 
    let allHoms = await HomeModel.find();

    res.json({
        success: true,
        data: allHoms,
    });
}



module.exports = {
    addNew,
    getAllHomes,
    addNewHome,
    updateHome,
    deleteHome,
};
