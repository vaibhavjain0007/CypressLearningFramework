// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress Custom command
Cypress.Commands.add('switchToIframe', (iframeSelector) => {
    return cy.get(iframeSelector)
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
})

Cypress.Commands.add('getMatchedElement', ($element, text) => {
  cy.get($element).each(($el, index, $list) => {
      if ($el.text().includes(text, {matchCase: false})) {
          // cy.wrap($el).find('input').check().should('be.checked')
          return cy.wrap($el)
      }
  })
  return undefined
})

Cypress.Commands.add('loginToDemoblaze', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('https://demoblaze.com/')
    cy.get('#login2').click();
    cy.get('#logInModal .modal-dialog').should('be.visible').wait(2000)
    cy.get('#loginusername').type(username, {delay:100})
    cy.get('#loginpassword').type(password, {delay:100})
    cy.get("[onclick='logIn()']", {timeout : 10000}).click();
    cy.get('#nameofuser').invoke('text').should('equal', 'Welcome test')
  })
})

Cypress.on('uncaught:exception', (err, runnable) => {
    // Log the error (optional)
    console.log(err)
  
    // Ignore specific errors (like Google Ads error)
    if (err.message.includes('adsbygoogle.push() error: No slot size for availableWidth=0')) {
      return false; // Prevent the test from failing
    }
  
    // For other errors, you can choose to fail the test by not returning anything
    return true;
  });