/// <reference types="cypress" />
import { Order } from '../../../utils/order.js';
import { Pet } from '../../../utils/pet.js';

describe('Test cases to create an order', () => {
    
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
    })
})