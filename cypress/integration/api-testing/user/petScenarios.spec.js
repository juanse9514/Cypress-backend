/// <reference types="cypress" />
import { Pet } from '../../../utils/pet.js';
describe('Testscases for pets endpoints', () => {
    const pet = new Pet();

    context('Verify a pet is added correctly', () => {

        it('Create a pet', () => {
            cy.createPet(pet);
        })

        
        // it('Validate the pet was created correctly', () => {
        //     cy.getPet(pet);
        // })
    })
    
})
  