import { TIMEOUT } from 'dns';
import loginPage from '../pages/loginPage';
describe('Login Tests - Spotter TMS', () => {
    beforeEach(() => {
        loginPage.visit();
    });
    it('TC#01 User should not be Sign-in using invalid credentials', () => {
        cy.fixture('users').then((users) => {
            loginPage.login(users.invalidUser.username, users.invalidUser.password);
            cy.get('form')
                .find('span')
                .contains('No active account found with the given credentials').should('be.visible');
        });
    });
    it('TC#02 User should be sign-in using valid credentials and save session', () => {
        loginPage.login(Cypress.env('validUsername'), Cypress.env('validPassword'));
        cy.url({ timeout: 10000 }).should('include', '/assignments');
    });
});