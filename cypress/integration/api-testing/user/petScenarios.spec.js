/// <reference types="cypress" />
import { Pet } from '../../../utils/pet.js';
describe('Testscases for pets endpoints', () => {
    const pet = new Pet();

    context('Verify a pet is created correctly', () => {

        it('Create a pet', () => {
            cy.createPet(pet);
        })


        it('Validate the pet was created correctly', () => {
            cy.getPet(pet);
        })
    })

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
  