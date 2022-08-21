/// <reference types="cypress" />
// creates an order in the petstore api
Cypress.Commands.add('placeOrder', (order) => {
    cy.request({
        method: 'POST',
        url: "/store/order",
        headers: { 
          accept: 'application/json'
        },
        body: order
    }).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body))
        expect(response.status).to.equal(200)
        cy.orderChecks(body,order)
  
    })
})
// gets an order in the petstore api
Cypress.Commands.add('getOrder', (order) => {
    cy.request({
        method: 'GET',
        url: "/store/order/"+order.getId(),
        headers: { 
          accept: 'application/json'
        }
    }).then((response) => {
        let body = JSON.parse(JSON.stringify(response.body))
        expect(response.status).to.equal(200)
        cy.orderChecks(body,order)
  
    })
})

// check the basic fields from a response against the order object
Cypress.Commands.add('orderChecks', (body,order) => {
    expect(body).has.property("id",order.getId())
    expect(body).has.property("petId",order.getPetId())
    expect(body).has.property("quantity",order.getQuantity())
    expect(new Date(body.shipDate).getTime()).to.equal(order.getShipDate().getTime())
    expect(body).has.property("status",order.getStatus())
    expect(body).has.property("complete",order.getComplete())
})