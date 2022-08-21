/// <reference types="cypress" />
import { Pet } from '../../../utils/pet.js';
import { faker } from '@faker-js/faker';

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

    context('Find pets by status', () => {
        
        let response;
        it('Find all the pets by status: '+pet.getStatus(), () => {
            cy.request({
                method: 'GET',
                url: '/pet/findByStatus?status='+pet.getStatus()
            }).then((apiResponse) => {
                response=apiResponse
            })
        })
    
        it('Validate the pets match the same status as requested', () => {
            let body = JSON.parse(JSON.stringify(response.body))
            body.map(function (petResponse){
                expect(petResponse.status).to.equal(pet.getStatus())
            })
        })
          
    })

    context('Find pets by tag', () => {
        let response;
        let tag = pet.getTags()[0].name
        it('Find all the pets by status: '+pet.getStatus(), () => {
            cy.request({
                method: 'GET',
                url: '/pet/findByTags?tags='+tag
            }).then((apiResponse) => {
                response=apiResponse
            })
        })
    
        it('Validate the pets match the same tag as the requested one', () => {
            let body = JSON.parse(JSON.stringify(response.body))
            const responseTags = body.map(function (petResponse){
                return petResponse.tags
            })
            let onlyTags = responseTags.map(responseTags =>{
                return responseTags.map(responseTag=>{
                    return responseTag.name
                })
            })
            cy.log(responseTags[0]) 
            onlyTags.map(tags =>{
                expect(tags).to.contain(tag)
            })
            
        })
          
    })
    
})
  