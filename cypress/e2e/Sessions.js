describe ('cypress sessions', () => {

    beforeEach('setup', () => {
        cy.loginToDemoblaze('test', 'test');
    })

    it ('test 1', () => {
        cy.visit('https://demoblaze.com')
    })

    it ('test 2', () => {
        cy.visit('https://demoblaze.com')
    })

    it ('test 3 - clear session', () => {
        Cypress.session.clearAllSavedSessions() // not working for me need to check
        // cy.clearAllSessionStorage()
        cy.visit('https://demoblaze.com')
    })
})