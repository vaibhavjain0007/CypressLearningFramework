describe('Cypress Iframes', () => {

    it.skip ('test iframes without plugin', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.switchToIframe('#courses-iframe').contains('Mentorship').should('be.visible').click()
    })

    it ('test iframes with plugin', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.frameLoaded('#courses-iframe')
        cy.iframe().contains('Mentorship').should('be.visible').click()
    })

    it ('test iframes with https://letcode.in/frame', () => {
        cy.visit('https://letcode.in/frame')

        // below not supporting for multiple iframes
        // cy.frameLoaded('#firstFr')
        // cy.iframe().first().get("input[name='fname']").scrollIntoView().type('VJ Vaibhav Jain')

        // cy.iframe().within() is not valid and won’t work as expected.

        // Switch to the iframe once
        cy.switchToIframe('#firstFr').within(() => {
            // Interact with the 'fname' input field
            cy.get("input[name='fname']")
                .scrollIntoView()
                .type('vaibhav jain', { delay: 200 })
                .type('{selectall}{ctrl+c}{backspace}'); // Select, copy, and delete the text

            cy.wait(2000)

            // Interact with the 'lname' input field
            cy.get("input[name='lname']")
                .scrollIntoView()
                .type('Jain')
                .type('{selectall}'); // Select all text

            cy.get("input[name='fname']")
                .scrollIntoView()
                .type('Vaibhav', { delay: 100 })

            cy.get('.content .title').should('have.text', 'You have entered Vaibhav Jain')
        });
    })
})
