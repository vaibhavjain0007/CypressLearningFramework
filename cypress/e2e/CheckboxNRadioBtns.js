describe('test radio buttons and checkboxes', () => {

    it ('test checkboxes', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.get("fieldset input[type='checkbox']").as('checkboxes').check(['option1']).screenshot();
        cy.get("fieldset input[type='checkbox']").should('be.checked')
        cy.get('@checkboxes').first().uncheck();
        cy.get('@checkboxes').check(['option2', 'option3'])
        // cy.get('@checkboxes').check(['option2', 'option3']).screenshot() --> 
        // cy.screenshot() only works for a single element. You attempted to screenshot 2 elements
        cy.screenshot('checkboxes2N3')
        cy.get('@checkboxes').uncheck(['option2', 'option3']).should('not.be.checked')
    })

    it ('test radio buttons', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.get("fieldset input[type='radio']").as('radioBtns')
        cy.get('@radioBtns').check('radio1')
        // cy.get("fieldset input[type='radio']").as('radioBtns').uncheck()------ NOT ALLOWED

        cy.get('@radioBtns').first().should('be.checked')
        cy.get('@radioBtns').last().check()
        cy.get('@radioBtns').first().should('not.be.checked')
        
    })
})