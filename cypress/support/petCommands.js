/// <reference types="cypress" />
// creates a pet in the petstore api
Cypress.Commands.add('createPet', (pet) => {
    cy.request({
        method: 'POST',
        url: "/pet",
        headers: { 
          accept: 'application/json'
        },
        body: pet
    }).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body))
        expect(response.status).to.equal(200)
        cy.petChecks(body,pet)
  
    })
})
// gets a pet in the petstore api and check the response
Cypress.Commands.add('getPet', (pet) => {
    cy.request({
        method: 'GET',
        url: "/pet/"+pet.getId(),
        headers: { 
          accept: 'application/json'
        }
    }).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body))
        expect(response.status).to.equal(200)
        cy.petChecks(body,pet)
  
    })
})
// checks the basic pet fields
Cypress.Commands.add('petChecks', (body,pet) => {

    expect(body).has.property("id",pet.getId())
    expect(body).has.property("name",pet.getName())+
    pet.getPhotoUrls().map(function (photoUrl,index){
        expect(photoUrl.len).to.equal(body.photoUrls.len)
    })
    pet.getTags().map(function (tag,index){
        expect(body.tags[index]).has.property("id",tag.id)
        expect(body.tags[index]).has.property("name",tag.name)
    })
    
    expect(body).has.property("status",pet.getStatus())
})