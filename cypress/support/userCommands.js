
/// <reference types="cypress" />
// creates an user in the petstore api
Cypress.Commands.add('createUser', (user) => {
    cy.request({
        method: 'POST',
        url: "/user/",
        headers: { 
          accept: 'application/json'
        },
        body: user
      }).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body))
        expect(response.status).to.equal(200)
        cy.userChecks(body,user)
  
    })
})
// gets an user from petstore api
Cypress.Commands.add('getUser', (user) => {
    cy.request({
        method: 'GET',
        url: "/user/"+user.getUsername(),
        headers: { 
          accept: 'application/json'
        }
      }).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body))
        expect(response.status).to.equal(200)
        cy.userChecks(body,user)
  
    })
})
// checks the response from an user object
Cypress.Commands.add('userChecks', (body,user) => {
    
    expect(body).has.property("id",user.getId())
    expect(body).has.property("username",user.getUsername())
    expect(body).has.property("firstName",user.getFirstName())
    expect(body).has.property("lastName",user.getLastName())
    expect(body).has.property("email",user.getEmail())
    expect(body).has.property("password")
    expect(body).has.property("phone",user.getPhone())
    expect(body).has.property("userStatus",user.getUserStatus())
  
})