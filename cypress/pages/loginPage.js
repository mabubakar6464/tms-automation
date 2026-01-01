import loginSelectors from '../selectors/login.selectors.js';

class LoginPage {
    visit() {
        cy.visit('/');
    }

    emailField() {
        return cy.get(loginSelectors.emailInput);
    }

    passwordField() {
        return cy.get(loginSelectors.passwordInput);
    }

    loginButton() {
        return cy.get(loginSelectors.loginButton);
    }

    login(email, pass) {
        this.emailField().type(email);
        this.passwordField().type(pass);
        this.loginButton().click();
    }
}

export default new LoginPage();