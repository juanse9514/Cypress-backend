/// <reference types="cypress" />
import { User } from '../../../utils/user.js';
describe('Test cases for delete a user', () => {

  const user = new User();

  context('Verify a user can be deleted', () => {
    

    it('Create a user', () => {
      cy.createUser(user)
    })

    it('Verify the user exists', () => {
      cy.getUser(user)
    })

    it('Delete the user created', () => {

      cy.request({
        method: 'DELETE',
        url: "/user/"+user.getUsername(),
      }).then(response => {
        expect(response.status).to.equal(200)

      })
    })

    it('Verify the user does not exists', () => {
      cy.request({
        method: 'GET',
        url: "/user/"+user.getUsername(),
        failOnStatusCode: false
      }).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body))
        expect(response.status).to.equal(404)
        expect(body).contain("User not found")
  
      })
    })
      
  })

})
  