/// <reference types="cypress" />
import { Pet } from '../../../utils/pet.js';

describe('Test cases for list pets by status feature', () => {
    const pet = new Pet();

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
    
})
  