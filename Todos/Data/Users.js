let users = [];

function addUser(user) {
    users.push(user);
}

function getUsers() {
    return users;
}

export { 
    addUser,
    getUsers,
    users
};
