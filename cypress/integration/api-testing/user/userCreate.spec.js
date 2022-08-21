/// <reference types="cypress" />
import { User } from '../../../utils/user.js';
describe('Test cases for user creation', () => {

  const user = new User();

  context('Verify a user is created correctly', () => {

    it('Create a user', () => {
      cy.createUser(user)
    })

    it('Validate the user was created correctly', () => {

      cy.getUser(user)

    })
  })

})