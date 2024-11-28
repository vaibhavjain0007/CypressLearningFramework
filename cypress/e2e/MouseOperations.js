describe ('Mouse operations', () => {

    it ('mousehover', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.contains('Top').should('not.be.visible')
        // cy.get('.mouse-hover').trigger('mouseover') // not always works
        cy.get('.mouse-hover-content').invoke('show') // need to provide immediate parent of menu item in this case - .mouse-hover-content
        cy.contains('Top').should('be.visible')
        cy.get('.mouse-hover-content').invoke('hide')
        cy.contains('Top').should('not.be.visible')
    })

    it ('mousehover and click required menu', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.contains('Top').should('not.be.visible')
        cy.get('.mouse-hover-content').invoke('show')
        cy.contains('Top').click()
        cy.window().should('have.property', 'scrollY', 0)

        cy.scrollTo('bottom')
        
        cy.window().then((window) => {
            const scrollTop = window.scrollY;
            const documentHeight = window.document.documentElement.scrollHeight;
            const clientHeight = window.document.documentElement.clientHeight;
          
            expect(scrollTop + clientHeight).to.eq(documentHeight)
        })
    })

    it ('mousehover using cypress real events plugin', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.contains('Top').should('not.be.visible')
        cy.get('.mouse-hover').realHover()
        cy.contains('Top').should('be.visible')
        cy.get('.mouse-hover-content').invoke('hide')
        cy.contains('Top').should('not.be.visible')
    })

    it.only ('mousehover using cypress real events plugin', () => {
        cy.visit('https://artoftesting.com/samplesiteforselenium/')
        cy.contains('Java').should('have.css', 'background-color')
        .then((color) => {
            cy.log('Background Color:', color); // Output background color in the console
            // Optional: Assert the color
            expect(color).to.equal('rgba(0, 0, 0, 0)'); // Example RGB color
          });
          
          // wait(1000) is playing a vital role here as color rgb is coming correct but rgba is different without wait
        cy.get('a').contains('Java').realHover().wait(1000).should('have.css', 'background-color', 'rgb(23, 184, 144)')
        // .then((color) => {
        //     cy.log('Background Color:', color); // Output background color in the console
        //     // Optional: Assert the color
        //     expect(color).to.equal('rgb(23, 184, 144)'); // Example RGB color
        // });
    })

    it ('mousehover using cypress real events plugin', () => {
        cy.visit('https://artoftesting.com/samplesiteforselenium/')
        // cy.contains('Java').should('have.css', 'background-color').should('have.css', 'background-color', 'rgb(23, 184, 144)')
        // .then((color) => {
        //     cy.log('Background Color:', color); // Output background color in the console
        //     // Optional: Assert the color
        //     expect(color).to.equal('rgba(0, 0, 0, 0)'); // Example RGB color
        //   });
        cy.get('a').contains('Performance').click()
        // .then((color) => {
            cy.contains('Performance Testing', {timeout:10000}).realHover().wait(1000).should('have.css', 'background-color', 'rgb(40, 118, 152)')
            .then((color) => {
                cy.log(color)
            })
            // cy.log('Background Color:', color); // Output background color in the console
            // // Optional: Assert the color
            // expect(color).to.equal('rgb(23, 184, 144)'); // Example RGB color
        // });
    })

    it ('double click', () => {
        cy.visit('https://qaboxletstestcypresspracticesite.netlify.app/mouseevents')
        cy.contains('DOUBLE CLICK ME').trigger('dblclick')
        cy.on('window:alert', (message) => {
            expect(message).to.equal('dblclick event is fired')
        })
    })

    it ('right/context click', () => {
        cy.visit('https://qaboxletstestcypresspracticesite.netlify.app/mouseevents')
        cy.contains('RIGHT CLICK ME').trigger('contextmenu')
        cy.on('window:alert', (message) => {
            expect(message).to.equal('contextmenu event is fired')
        })
    })
})
