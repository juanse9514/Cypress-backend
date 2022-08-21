/// <reference types="cypress" />
import { User } from '../../../utils/user.js';
describe('Test cases to create multiple users', () => {

  context('Verify multiple users can be created at once', () => {

    const users = Array(Math.floor(Math.random() * 4)+1).fill(new User());

    it('Create multiple users', () => {
      cy.request({
        method: 'POST',
        url: "/user/createWithList",
        body:users
      }).then(response => {
        let body = JSON.parse(JSON.stringify(response.body))
        expect(response.status).to.equal(200)
        body.map(function (user,index) {
          cy.userChecks(user,users[index])
        })
        	
      })
    })

    it('Verify the users exists', () => {

      users.map(function (user) {
        cy.getUser(user)
      })
    })

      
  })

})
  