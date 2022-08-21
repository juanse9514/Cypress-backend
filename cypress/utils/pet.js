
import { faker } from '@faker-js/faker';

const status = ["available","pending","sold"]
export class Pet {
    constructor() {
        this.id = Math.floor(Math.random() * 100000),
        this.name = "Dog "+faker.name.middleName(),
        this.photoUrls = [faker.image.animals()],
        this.tags = [{
            id:Math.floor(Math.random() * 3),
            name:faker.animal.dog()
        }],
        this.status = status[Math.floor(Math.random() * 3)]
    }

    getId() { return this.id; }
    getName() { return this.name; }
    getPhotoUrls() { return this.photoUrls; }
    getTags() { return this.tags; }
    getStatus() { return this.status; }

    setId(id) {this.id=id}
    setName(name) {this.name=name}
    setPhotoUrls(photoUrls) {this.photoUrls=photoUrls}
    setTags(tags) {this.tags=tags}
    setStatus(status) {this.status=status}
    
}