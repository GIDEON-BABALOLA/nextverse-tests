const faker = require("faker")
const generateUsers = (count) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        const username = `User_${faker.internet.userName()}`;
        const email = faker.internet.email(username);
        const password = `${faker.internet.password(10, true)}$${i}`;
        const mobile = `0814${Math.floor(10000000 + Math.random() * 89999999)}`;
        users.push({ username, email, password, mobile });
    }
    return users;
};

const newUsers = generateUsers(50);