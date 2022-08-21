/// <reference types="cypress" />
import { Pet } from '../../../utils/pet.js';

describe('Test cases for list pets by tag ', () => {
    const pet = new Pet();

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
  