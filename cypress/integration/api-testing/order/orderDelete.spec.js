/// <reference types="cypress" />
import { Order } from '../../../utils/order.js';
import { Pet } from '../../../utils/pet.js';

describe('Test cases to delete an order', () => {
    
    const pet = new Pet();
    const order = new Order(pet.getId());

    context('Verify an order is placed correctly', () => {

        it('Create a pet', () => {
            cy.createPet(pet);
        })

        it('Create an order', () => {
            cy.placeOrder(order);
        })


        it('Validate the order was created correctly', () => {
            cy.getOrder(order);
        })

        it('Delete the order', () => {
            cy.request({
                method: 'DELETE',
                url: "/store/order/"+order.getId()
            }).then((response) => {
                expect(response.status).to.equal(200)
            })
        })

        it('Verify the order does not exist', () => {
            cy.request({
                method: 'GET',
                url: "/store/order/"+order.getId(),
                failOnStatusCode: false
            }).then((response) => {
                let body = JSON.parse(JSON.stringify(response.body))
                expect(response.status).to.equal(404)
                expect(body).contain("Order not found")
            })
        })
    })
})