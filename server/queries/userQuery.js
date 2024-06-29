import Users from '../models/userSchema.js';

const userQueries = {
    getAllUsers: async function (groupID) {
        const users = await Users.find({ groupID });
        return users;
    },
    getOneUser: async function (userID) {
        const user = await Users.findOne({ id: userID });
        return user;
    },
    postUser: async function (userData) {
        const newUser = new Users(userData);
        const savedUser = await newUser.save();
        return savedUser;
    },
    deleteUser: async function (userID) {
        const result = await Users.deleteOne({ id: userID });
        return result;
    }
}

export default userQueries;