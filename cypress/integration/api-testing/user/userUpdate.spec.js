/// <reference types="cypress" />
import { User } from '../../../utils/user.js';
describe("Test cases for user creation", () => {

  const user = new User();

  context('Verify a user can be updated', () => {
    let userUpdated = new User();

    it('Create a user', () => {
      cy.createUser(user)
    })

    it('Validate the user values', () => {
      cy.getUser(user)
    })

    it('Updates the user', () => {
      
      userUpdated.setUsername(user.getUsername())
      cy.request({
        method: 'PUT',
        url: "/user/"+user.getUsername(),
        headers: { 
          accept: 'application/json'
        },
        body: userUpdated
      }).then(response => {
        let body = JSON.parse(JSON.stringify(response.body))
        expect(response.status).to.equal(200)
        cy.userChecks(body,userUpdated)

      })
    })
    it('Verify the user was successfully updated', () => {
      
      cy.getUser(userUpdated)
    })
      
  })

})