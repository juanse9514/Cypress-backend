/// <reference types="cypress" />
import { User } from "../../../utils/user.js";
describe("Test cases for user login and log out", () => {
  const user = new User();

  context("Verify a user can login and log out correctly", () => {
    it("Create a user", () => {
      cy.createUser(user);
    });

    it("Validate the user can do the login correctly", () => {
      cy.request({
        method: "GET",
        url:
          "/user/login?username=" +
          user.getUsername() +
          "&" +
          "password=" +
          user.getPassword(),
        headers: {
          accept: "application/json",
        },
      }).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body).contain("Logged in user session");
      });
    });

    it("Validate the user can do the log out correctly", () => {
      cy.request({
        method: "GET",
        url: "/user/logout",
        headers: {
          accept: "application/json",
        },
      }).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body));
        expect(response.status).to.equal(200);
        expect(body).contain("User logged out");
      });
    });
  });
});
