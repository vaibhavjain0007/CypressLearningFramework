describe ('test alerts in cypress', () => {

    it.skip ('JS Alerts', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        cy.on('window:alert', (message) => {
            expect(message).to.contain('I am as JS Alert') // should vs expect
        })
        cy.contains('Click for JS Alert').click()
        cy.get('#result').should('be.visible').and('have.text', 'You successfully clicked an alert')
    })

    it ('JS Confirm Alert', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        cy.on('window:confirm', (message) => {
            expect(message).to.contain('I am a JS Confirm')
        })
        // cypress automatically close the alert/confirm window using Ok button - default
        cy.contains('Click for JS Confirm').click()
        cy.get('#result').should('have.text', 'You clicked: Ok')
    })

    it ('JS Confirm - cancel', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        cy.on('window:confirm', (message) => {
            expect(message).to.contain('I am a JS Confirm')
        })
        cy.on('window:confirm', () => false) // cypress closes alert window using Cancel button

        cy.contains('Click for JS Confirm').click()
        cy.get('#result').should('have.text', 'You clicked: Cancel')
    })

    it ('JS Prompt Alert', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
        
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Hi Vaibhav')
        })

        cy.contains('Click for JS Prompt').click()
        cy.get('#result').should('be.visible').and('have.text', 'You entered: Hi Vaibhav')
    })

    it ('Authentication alert - approach 1', () => {
        cy.visit('https://the-internet.herokuapp.com/basic_auth', {auth : {username: 'admin', password: 'admin'}})
        cy.get('.example').should('contain.text', 'Congratulations')
    })

    it ('Authentication alert - approach 2', () => {
        cy.visit('https://admin:admin@the-internet.herokuapp.com/basic_auth')
        cy.get('.example').should('contain.text', 'Congratulations')
    })
})


// viewport ----> cypress runner
describe ('responsive testing', () => {
    ['portrait', 'landscape'].forEach((orientation) => {

        // By nesting the describe blocks and ensuring each test has 
        // its own isolated environment for orientation setup, 
        // you can avoid the issue where both portrait and landscape orientations 
        // are applied at the same time.
        describe(`test in ${orientation} mode`, () => {
            beforeEach(`in ${orientation}`, () => {
                cy.viewport('iphone-6', orientation)
            })
    
            it (`Authentication alert ${orientation}`, { retries : 2 }, () => {
                cy.window().then((win) => {
                    const width = win.innerWidth;
                    const height = win.innerHeight;
                    cy.log(`Viewport Width: ${width}, Viewport Height: ${height}`);
                  });
                cy.visit('https://the-internet.herokuapp.com/basic_auth', {auth : {username: 'admin', password: 'admin'}})
                cy.get('.example', { timeout : 6000 }).should('contain.text', 'Congratulations')
                if (orientation === 'portrait') {
                    cy.window().should('have.property', 'innerWidth', 375); // Portrait width
                    cy.window().should('have.property', 'innerHeight', 667); // Portrait height
                } else {
                    cy.window().should('have.property', 'innerWidth', 667); // Landscape width (swapped)
                    cy.window().should('have.property', 'innerHeight', 375); // Landscape height (swapped)
                }
            })
        })
    })
})


// working unexpectedly
// In both cases: Cypress first queues up the beforeEach commands for the orientations (portrait and landscape), and then processes the it() blocks in order.
// In the non-working code: Both beforeEach commands are added to the queue before any it block starts executing. Since they aren't isolated, the viewport might not be set as expected.
// In the working code: The beforeEach commands are isolated in different describe blocks, ensuring each orientation is handled separately and no conflicts arise.

describe.skip ('responsive testing', () => {
    ['portrait', 'landscape'].forEach((orientation) => {

        // In this non-working code: Both beforeEach commands are added to the queue 
        // before any it block starts executing. Since they aren't isolated, 
        // the viewport might not be set as expected.
        beforeEach(`in ${orientation}`, () => {
            cy.viewport('iphone-6', orientation)
        })

        it (`Authentication alert ${orientation}`, () => {
            cy.window().then((win) => {
                const width = win.innerWidth;
                const height = win.innerHeight;
                cy.log(`Viewport Width: ${width}, Viewport Height: ${height}`);
                });
            cy.visit('https://the-internet.herokuapp.com/basic_auth', {auth : {username: 'admin', password: 'admin'}})
            cy.get('.example').should('contain.text', 'Congratulations')
            if (orientation === 'portrait') {
                cy.window().should('have.property', 'innerWidth', 375); // Portrait width
                cy.window().should('have.property', 'innerHeight', 667); // Portrait height
            } else {
                cy.window().should('have.property', 'innerWidth', 667); // Landscape width (swapped)
                cy.window().should('have.property', 'innerHeight', 375); // Landscape height (swapped)
            }
        })
    })
})