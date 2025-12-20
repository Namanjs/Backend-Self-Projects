import { addUser, getUsers, users } from '../Data/Users.js'

const signup = async (req, res) => {
    try {
        const { username, email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const alreadyExistingUser = users.find((user) => {
            return user.email === email;
        })

        if (alreadyExistingUser) {
            return res.status(400).json({
                Message: "User with same email already signed in"
            })
        }

        let randomNumber = Math.floor(Math.random() * 100000);

        let duplicate = users.find((user) => {
            return user.user_Id === randomNumber;
        });

        while (duplicate !== undefined) {
            randomNumber++;
            duplicate = users.find((user) => {
                return user.user_Id === randomNumber;
            });
        }

        let user = {
            "user_Id": randomNumber,
            "username": username || "",
            "email": email || "",
            "todos": [],
            "admin": false
        }

        addUser(user);

        return res.status(201).json({
            "Message": "User signed in successfully",
            "Info": user
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const signUpAsAdmin = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            "Message": "All fields are required"
        })
    }

    if (password !== "Na@21092004") {
        return res.status(401).json({
            "Message": "Password is incorrect"
        })
    }

    let Admin = {
        "username": username,
        "email": email,
        "admin": true
    }

    const duplicateAdmin = users
        .filter((user) => {
            return user.admin === true;
        })
        .find((user) => {
            return user.username === Admin.username && user.email === Admin.email;
        })

    if (duplicateAdmin) {
        return res.status(400).json({
            "Message": "User with same credentials already exist"
        })
    }

    addUser(Admin);

    return res.status(201).json({
        "Message": "Signed in successfully as Admin"
    })
}

const addTodos = async (req, res) => {
    try {
        const { title, description, priority } = req.body;

        const user = req.user;

        if (!title || !priority) {
            return res.status(400).json({
                "Message": "Title and priority are required fields"
            })
        }

        let duplicateTitle = user.todos.find((todo) => {
            return todo.title === title;
        })

        if (duplicateTitle) {
            return res.status(400).json({
                "Message": "Todo with the title already exist"
            })
        }

        let randomNumber = Math.floor(Math.random() * 100000);

        let duplicate = user.todos.find((todo) => {
            return todo.Id === randomNumber;
        });

        while (duplicate !== undefined) {
            randomNumber++;
            duplicate = user.todos.find((todo) => {
                return todo.Id === randomNumber;
            });
        }

        let todo = {
            "Id": randomNumber,
            "title": title,
            "description": description || "",
            "priority": priority,
            "status": "incomplete",
            "createdAt": new Date().toISOString()
        }

        user.todos.push(todo);

        return res.status(201).json({
            "Message": "Todo added successfully",
            "Todo": todo
        })
    } catch (error) {
        return res.status(500).json({
            "Message": "Something went wrong while adding todos"
        })
    }
}

const getTodos = async (req, res) => {
    try {
        const user = req.user;

        if (user.todos.length === 0) {
            return res.status(200).json({
                "Message": "User has no active todos"
            })
        }

        return res.status(200).json({
            "Message": "Request successful",
            "Todo": user.todos
        })
    } catch (error) {
        return res.status(500).json({
            "Message": "Something went wrong while fetching user todos"
        })
    }
}

const getTodoById = async (req, res) => {
    try {
        const user = req.user;

        const { Id } = req.body;

        if (!Id) {
            return res.status(400).json({
                "Message": "Id is required"
            })
        }

        const todoById = user.todos.find((todo) => {
            return todo.Id === Number(Id);
        })



        if (!todoById) {
            return res.status(400).json({
                "Message": "Todo with Id does not exist"
            })
        }

        return res.status(200).json({
            "User": user.username,
            "Todo": todoById
        })
    } catch (error) {
        return res.status(500).json({
            "Message": "Something went wrong while fetching todo by Id"
        })
    }
}

const updateTodos = async (req, res) => {
    try {
        const user = req.user;

        const { Todo_Id, newTitle, newDescription, newPriority, status } = req.body;

        if (!newTitle && !newDescription && !newPriority && !status) {
            return res.status(400).json({
                "Message": "Atleast one field is required for updation"
            })
        }

        if (!Todo_Id) {
            return res.status(400).json({
                "Message": "Todo Id is required field"
            })
        }

        const todo = user.todos.find((todo) => {
            return todo.Id === Number(Todo_Id);
        })

        if (!todo) {
            return res.status(400).json({
                "Message": "Todo does not exist"
            })
        }

        if (newTitle !== undefined) todo.title = newTitle;
        if (newDescription !== undefined) todo.description = newDescription;
        if (newPriority !== undefined) todo.priority = newPriority;
        if (status !== undefined) todo.status = status;

        todo.updatedAt = new Date().toISOString();

        return res.status(200).json({
            "Message": "Todo updated successfully",
            "Updated Todo": todo
        })
    } catch (error) {
        return res.status(500).json({
            "Message": "Something went wrong while updating user todos"
        })
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { Id } = req.body;

        const user = req.user;
        
        if(!Id){
            return res.status(400).json({
                "Message": "Id is required"
            })
        }

        const todo = user.todos.find((todo) => {
            return todo.Id === Number(Id);
        })

        if(!todo){
            return res.status(400).json({
                "Message": "Todo with this Id does not exist"
            })
        }

        const TodosAfterDeletion = user.todos.filter((todo) => {
            return todo.Id !== Number(Id);
        })

        user.todos = TodosAfterDeletion;

        return res.status(200).json({
            "Message": "Todo successfully deleted"
        })
    } catch (error) {
        return res.status(500).json({
            "Message": "Something went wrong while deleting todos"
        })
    }
}

export {
    signup,
    signUpAsAdmin,
    addTodos,
    getTodos,
    getTodoById,
    updateTodos,
    deleteTodo
}