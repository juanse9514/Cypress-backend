// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/// <reference types="cypress" />
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

Cypress.Commands.add('getUsers', (user) => {
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