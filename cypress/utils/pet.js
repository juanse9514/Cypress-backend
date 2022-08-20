import { faker } from '@faker-js/faker';

export class Pet {
    constructor() {
        this.id = Math.floor(Math.random() * 100000),
        this.name = "Dog "+faker.name.middleName(),
        this.photoUrls = faker.image.animals(),
        this.tags = {
            id:Math.floor(Math.random() * 10),
            name:faker.animal.dog()
        },
        this.status = "available"
    }
}