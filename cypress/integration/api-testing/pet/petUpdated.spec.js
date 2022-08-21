/// <reference types="cypress" />
import { Pet } from '../../../utils/pet.js';

describe('Test cases for update a pet feature', () => {
    const pet = new Pet();

    context('Verify a pet can be updated', () => {
        let petUpdated = new Pet();
    
        it('Create a pet', () => {
          cy.createPet(pet)
        })
    
        it('Validate the pet values', () => {
          cy.getPet(pet)
        })
    
        it('Updates the pet', () => {
          
          petUpdated.setId(pet.getId())
          cy.request({
            method: 'PUT',
            url: "/pet/",
            headers: { 
              accept: 'application/json'
            },
            body: petUpdated
          }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body))
            expect(response.status).to.equal(200)
            cy.petChecks(body,petUpdated)
    
          })
        })
        it('Verify the pet was successfully updated', () => {
          
          cy.getPet(petUpdated)
        })
          
    })
})