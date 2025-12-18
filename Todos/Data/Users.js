let users = [];

function addUser(user) {
    users.push(user);
}

function getUsers() {
    return users;
}

module.exports = { addUser, getUsers };
