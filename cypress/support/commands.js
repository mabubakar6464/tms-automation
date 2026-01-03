import loginPage from "../pages/loginPage";
require('dotenv').config();
Cypress.Commands.add('loginSession', () => {
    const username = Cypress.env('validUsername');
    const password = Cypress.env('validPassword');

    cy.session([username, password], () => {
        loginPage.visit();
        loginPage.login(username, password);
        cy.url({ timeout: 10000 }).should('include', '/assignments');
    });
});

Cypress.Commands.add('verifyTruckInBackend', (unitId) => {

    cy.intercept('GET', '**/api/v0.0.2/truck-profiles/**').as('getTrucks');

    cy.wait('@getTrucks').then(({ response }) => {
        expect(response.statusCode).to.eq(200);

        const exists = response.body.results.some(
            t => t.truckProfile.unitId === unitId
        );

        expect(exists, `Truck ${unitId} should exist in backend`).to.be.true;
    });
});

