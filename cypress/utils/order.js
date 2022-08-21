
export class Order {
    constructor(petId) {
        this.id = Math.floor(Math.random() * 100000),
        this.petId = petId,
        this.quantity = Math.floor(Math.random() * 10)+1,
        this.shipDate = new Date(),
        this.status = "approved",
        this.complete = true
    }
    getId() { return this.id; }
    getPetId() { return this.petId; }
    getQuantity() { return this.quantity; }
    getShipDate() { return this.shipDate; }
    getStatus() { return this.status; }
    getComplete() { return this.complete; }

    setId(id) {  this.id=id; }
    setPetId(petId) { this.petId=petId; }
    setQuantity(quantity) { this.quantity = quantity; }
    setShipDate(date) { this.shipDate = date; }
    setStatus(status) { this.status = status; }
    setComplete(complete) { this.complete = complete; }
}