import Users from '../models/userSchema';

const userQueries = {
    getAllUsers: async function (groupID) {
        const users = await Users.find({ groupID });
        return users;
    },
    getOneUser: async function (id) {
        const user = await Users.findOne({ _id: id });
        return user;
    },
    postUser: async function (userData) {
        const newUser = new Users(userData);
        const savedUser = await newUser.save();
        return savedUser;
    },
    deleteUser: async function (id) {
        const result = await Users.deleteOne({ _id: id });
        return result;
    }
}

export default userQueries;