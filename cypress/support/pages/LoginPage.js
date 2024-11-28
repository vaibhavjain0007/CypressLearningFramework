class LoginPage {
    getMobOrEmail() {
        return cy.get('#ap_email')
    }

    getContinueBtn() {
        return cy.get('#continue')
    }

    getPassword() {
        return cy.get('#ap_password')
    }

    getSignIn() {
        return cy.get('#signInSubmit')
    }
}

export default LoginPage;