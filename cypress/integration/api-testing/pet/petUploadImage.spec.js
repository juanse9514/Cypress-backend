/// <reference types="cypress" />
import { Pet } from '../../../utils/pet.js';
import { faker } from '@faker-js/faker';

describe('Test cases to upload an image to a pet', () => {
    const pet = new Pet();
    
    context('Uploads an image to the pet', () => {
        let petUpdated =new Pet();
    
        it('Create a pet', () => {
          cy.createPet(petUpdated)
        })
    
        it('Validate the pet values', () => {
            cy.getPet(petUpdated)
        })
    
        it('Upload an image to the pet', () => {
            let newImage = faker.image.animals()
            let additionalMetadata = "additionalMetadata"

            petUpdated.addphotoUrl(newImage);

            cy.fixture("13687-minimalista.jpg", 'binary')
            .then((file) => {

                cy.request({
                    url: "/pet/"+petUpdated.getId()+"/uploadImage?additionalMetadata="+additionalMetadata,
                    method: "POST",
                    headers: {
                        'content-type': 'application/octet-stream'
                    },
                    body: file
                }).its('status').should('be.equal', 200)
            })

        })
        it('Verify the pet was successfully updated', () => {
          
          cy.getPet(petUpdated)
        })
          
    })
    
})
  