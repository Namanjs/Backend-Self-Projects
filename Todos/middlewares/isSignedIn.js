import { users } from "../Data/Users.js";

const isLoggedIn = async (req, res, next) => {
    try {
        const userId = req.headers["user-id"];

        if (!userId) {
            return res.status(400).json({
                "Message": "User Id is required"
            })
        }

        const user = users.find((user) => {
            return user.user_Id === Number(userId);
        })


        if (!user) {
            return res.status(400).json({
                "Message": "User not found"
            })
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(404).json({
            "Message": "Something went wrong while checking if user is logged in"
        })
    }
}

export {
    isLoggedIn
}