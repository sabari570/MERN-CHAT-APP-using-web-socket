const User = require("../models/userModel");

module.exports.getRegisteredUser = async (req, res) => {
    try {
        const loggedInUserId = req.userId;
        const filteredUsers = await User.find({ _id: {$ne: loggedInUserId } }).select("-password");
        return res.status(200).json({ users: filteredUsers });
    } catch (error) {
        console.log("Error while fetching users: ", error.message);
    return res.status(error.statusCode || 500).json({ error: error.message });
    }
};