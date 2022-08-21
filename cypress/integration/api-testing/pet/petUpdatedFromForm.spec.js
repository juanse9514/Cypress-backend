/// <reference types="cypress" />
import { Pet } from '../../../utils/pet.js';

describe('Test cases to update pets from a form', () => {
    const pet = new Pet();

    context('Verify a pet can be updated using the form data in the store', () => {
        let petUpdated = new Pet();
    
        it('Create a pet', () => {
          cy.createPet(pet)
        })
    
        it('Validate the pet values', () => {
            cy.getPet(pet)
        })
    
        it('Updates the pet', () => {
    
            petUpdated.setId(pet.getId())
            petUpdated.setPhotoUrls(pet.getPhotoUrls())
            petUpdated.setTags(pet.getTags())
            cy.request({
                method: 'POST',
                url: "/pet/"+petUpdated.getId()+"?name="+petUpdated.getName()+"&status="+petUpdated.getStatus(),
                headers: { 
                    accept: 'application/json'
                }
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

