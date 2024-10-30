const AssignPplModel = require("../models/assignPeople");
const RegisteredPeopleModel = require("../models/user");



const assignPpl =  async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email exists in the RegisteredPeople collection
        const registeredPerson = await RegisteredPeopleModel.findOne({ email });

        if (!registeredPerson) {
            // If email does not exist, return error
            return res.status(404).json({ message: "Email not registered" });
        }

        // If email exists, set the name to the registered person's username
        const newAssignPerson = new AssignPplModel({
            name: registeredPerson.username,
            email
        });

        // Save the new assigned person
        await newAssignPerson.save();
        res.status(201).json({ message: "Person assigned successfully", data: newAssignPerson });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



module.exports = {
    assignPpl
}