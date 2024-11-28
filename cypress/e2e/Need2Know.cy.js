cy.get('.loading-spinner', { timeout: 10000 }).should('not.exist'); // { timeout : timeInMs 
cy.wait(2000);  // Hardcoded wait for 2 seconds (not recommended)
cy.get('.loading-spinner').should('not.exist'); // default wait (4 seconds)
// In Cypress, polling is the mechanism used to repeatedly check the state of an element or 
  // condition during a command's execution, such as waiting for an element to appear, disappear, or change.
// Polling interval in cypress ---> 50ms