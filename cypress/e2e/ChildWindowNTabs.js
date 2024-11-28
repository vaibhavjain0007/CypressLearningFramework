describe('Test child window and tabs', () => {
    it.skip ('test child tabs - method 1', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('#opentab').invoke('removeAttr', 'target').click()
        cy.url().should('eq', 'https://www.qaclickacademy.com/')

        cy.get('.footer-link').contains('Courses').scrollIntoView({duration:2000}).click()
        cy.url().should('contain', 'udemy')

        // Cypress navigation
        cy.go(-2) // cy.go('back') - back twice
        cy.url().should('not.eq', 'https://www.qaclickacademy.com/')
        cy.go('forward') // cy.go(1)

        cy.reload();
    })

    it ('test child tabs - method 2', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        cy.get('#opentab').then(($el) => {
            const url = $el.prop('href')
            cy.visit(url)
        })
        cy.url().should('eq', 'https://www.qaclickacademy.com/')
    })

    it.only ('test child window', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    
        // Stub the window.open method to capture the URL without opening a new window
        cy.window().then((win) => {
            cy.stub(win, 'open').as('openWindow'); // Alias to capture the open window method
        });
    
        // Click the link that opens the child window
        cy.get('#openwindow').click();
        cy.get('@openWindow').then((data) => {
            cy.log('data: ', data)
        })
        
        let url = '';

        cy.get('@openWindow').should('be.called').then((stubbedWindow) => {
            // Extract the URL and other details (arguments passed to window.open)
            url = stubbedWindow.getCall(0).args[0]; // First argument (URL)
            const optionsOrWindowName = stubbedWindow.getCall(0).args[1]; // Second argument (optional options)
            const windowFeatures = stubbedWindow.getCall(0).args[2]; // Third argument (window features)


            // Log the URL and options
            cy.log('Child Window URL: ' + url);
            cy.log('Child Window Options: ' + JSON.stringify(optionsOrWindowName));
            cy.log('Child window features: ', JSON.stringify(windowFeatures), windowFeatures)

            // Optionally, you can use `cy.task` to log the details outside of Cypress if needed.
            console.log('Child Window URL:', url);  // This will appear in the browser's console
            console.log('Child Window Options:', optionsOrWindowName);  // This will also appear in the browser's console

            // Assert that window.open() was called
            cy.get('@openWindow').should('be.calledWith', url)
            cy.visit(url).url().should('include', 'qa')
            cy.pause()
            expect(url).to.not.include('rammm')
        });
    });
})