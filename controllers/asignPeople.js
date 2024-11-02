const AssignPplModel = require("../models/assignPeople");
const RegisteredPeopleModel = require("../models/user");



const assignPpl =  async (req, res) => {
    try {
        const { email,taskStatus } = req.body;

        // Check if email exists in the RegisteredPeople collection
        const registeredPerson = await RegisteredPeopleModel.findOne({ email });

        if (!registeredPerson) {
            // If email does not exist, return error
            return res.status(404).json({ message: "Email not registered" });
        }

        // If email exists, set the name to the registered person's username
        console.log(registeredPerson,"registeredPerson")
        const newAssignPerson = new AssignPplModel({
            taskStatus,
            username: registeredPerson.username,
            userid: registeredPerson._id,
            email
        });

        // Save the new assigned person
        await newAssignPerson.save();
        res.status(201).json({ message: "Person assigned successfully", data: newAssignPerson });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getassignpeople =  async (req, res) => {
    try {
        const assignedPeople = await AssignPplModel.find();
        res.status(200).json(assignedPeople);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    assignPpl,
    getassignpeople
}