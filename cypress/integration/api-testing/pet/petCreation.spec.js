/// <reference types="cypress" />
import { Pet } from '../../../utils/pet.js';

describe('Test cases to create a pet feature', () => {
    const pet = new Pet();

    context('Verify a pet is created correctly', () => {

        it('Create a pet', () => {
            cy.createPet(pet);
        })


        it('Validate the pet was created correctly', () => {
            cy.getPet(pet);
        })
    })
})