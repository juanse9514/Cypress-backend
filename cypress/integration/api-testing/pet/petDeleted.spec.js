/// <reference types="cypress" />
import { Pet } from '../../../utils/pet.js';

describe('Test cases to delete a pet feature', () => {
    const pet = new Pet();

    context('Verify a pet can be deleted', () => {
        
    
        it('Create a pet', () => {
          cy.createPet(pet)
        })
    
        it('Verify the pet exists', () => {
          cy.getPet(pet)
        })
    
        it('Delete the pet created', () => {
    
          cy.request({
            method: 'DELETE',
            url: "/pet/"+pet.getId(),
          }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body))
            expect(response.status).to.equal(200)
            expect(body).contain("Pet deleted")
    
          })
        })
    
        it('Verify the pet does not exists', () => {
          cy.request({
            method: 'GET',
            url: "/pet/"+pet.getId(),
            failOnStatusCode: false
          }).then((response) => {
            let body = JSON.parse(JSON.stringify(response.body))
            expect(response.status).to.equal(404)
            expect(body).contain("Pet not found")
      
          })
        })
          
    })


    
})
  