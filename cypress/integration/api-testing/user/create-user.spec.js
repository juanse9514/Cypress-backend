/// <reference types="cypress" />
import { User } from '../../../utils/user.js';
describe('Testscases for users', () => {
  context('Verify a user is created correctly', () => {
    const user = new User();

    it('Create a user', () => {
      cy.createUser(user)
    })

    it('Validate the user was created correctly', () => {

      cy.request({
        method: 'GET',
        url: "/user/"+user.getUsername(),
        headers: { 
          accept: 'application/json'
        }
      }).then(response => {
        let body = JSON.parse(JSON.stringify(response.body))
        cy.log(body)
        expect(response.status).to.equal(200)
        expect(body).has.property("id",user.getId())
        expect(body).has.property("username",user.getUsername())
        expect(body).has.property("firstName",user.getFirstName())
        expect(body).has.property("lastName",user.getLastName())
        expect(body).has.property("email",user.getEmail())
        expect(body).has.property("password")
        expect(body).has.property("phone",user.getPhone())
        expect(body).has.property("userStatus",user.getUserStatus())

      })
    })
      
  })

  context('Verify a user can login and log out correctly', () => {
    const user = new User();

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


})
  