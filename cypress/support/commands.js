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
