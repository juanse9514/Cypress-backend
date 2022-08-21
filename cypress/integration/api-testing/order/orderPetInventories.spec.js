/// <reference types="cypress" />
import { Order } from '../../../utils/order.js';
import { Pet } from '../../../utils/pet.js';

describe('Test cases to create an order', () => {
    
    const pet = new Pet();
    const order = new Order(pet.getId());

    context('Verify an order is placed correctly', () => {

        let approved;

        it('Create a pet', () => {
            cy.createPet(pet);
        })

        it('Validate the order was created correctly', () => {
            cy.request({
                method: 'GET',
                url: "/store/inventory"
            }).then((response) => {
                let body = JSON.parse(JSON.stringify(response.body))
                expect(response.status).to.equal(200)
                approved =body.approved
            })
        })

        it('Create an order', () => {
            cy.placeOrder(order);
        })

        it('Verify the inventory approved field has increased', () => {
            let expectedApproved=approved+order.getQuantity()
            cy.request({
                method: 'GET',
                url: "/store/inventory"
            }).then((response) => {
                let body = JSON.parse(JSON.stringify(response.body))
                expect(response.status).to.equal(200)
                expect(body).has.property("approved",expectedApproved)
            })
        })

    })
})