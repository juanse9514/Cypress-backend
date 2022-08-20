import { faker } from '@faker-js/faker';

export class User {
    constructor() {
        this.id = Math.floor(Math.random() * 100000),
        this.username = faker.internet.userName(),
        this.firstName = faker.name.firstName(),
        this.lastName = faker.name.lastName(),
        this.email = faker.internet.email(),
        this.password = faker.internet.password(),
        this.phone = faker.phone.number(),
        this.userStatus = 1;
    }
    getId() { return this.id; }
    getUsername() { return this.username; }
    getFirstName() { return this.firstName; }
    getLastName() { return this.lastName; }
    getEmail() { return this.email; }
    getPassword() { return this.password; }
    getPhone() { return this.phone; }
    getUserStatus() { return this.userStatus;}
}