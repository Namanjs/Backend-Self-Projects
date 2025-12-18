import { addUser, getUsers } from '../Data/Users.js'

const signup = async(req, res) => {
    try {
        const { username, email} = req.body;

        if(!username || !email){
            throw new Error("Username or eamil missing");
        }

        let randomNumber = Math.floor(Math.random() * 100000);

        let user = {
            "user_Id": randomNumber,
            "username": username || "",
            "email": email || ""
        }

        users.push(user);

        res.status(201).json({
            "Message": "User signup successfull"
        })
    } catch (error) {
        throw new Error("Failed to signin")
    }
}

export {
    signup
}