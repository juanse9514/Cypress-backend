/// <reference types="cypress" />
import { User } from '../../../utils/user.js';
describe('Testscases for user endpoints', () => {

  const user = new User();

  context('Verify a user is created correctly', () => {

    it('Create a user', () => {
      cy.createUser(user)
    })

    it('Validate the user was created correctly', () => {

      cy.getUser(user)

    })
  })

  context('Verify a user can login and log out correctly', () => {
    

    it('Create a user', () => {
      cy.createUser(user)
    })

    it('Validate the user can do the login correctly', () => {

      cy.request({
        method: 'GET',
        url: "/user/login?username="+user.getUsername()+"&"+"password="+user.getPassword(),
        headers: { 
          accept: 'application/json'
        }
      }).then(response => {
        let body = JSON.parse(JSON.stringify(response.body))
        expect(response.status).to.equal(200)
        expect(body).contain("Logged in user session")

      })
    })

    it('Validate the user can do the log out correctly', () => {

      cy.request({
        method: 'GET',
        url: "/user/logout",
        headers: { 
          accept: 'application/json'
        }
      }).then(response => {
        let body = JSON.parse(JSON.stringify(response.body))
        expect(response.status).to.equal(200)
        expect(body).contain("User logged out")

      })
    })
      
  })

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

  context('Verify multiple users can be created at once', () => {

    const users = Array(Math.floor(Math.random() * 5)).fill(new User());

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
  