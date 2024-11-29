describe('test dropdowns', () => {

    it ('test static dropdowns', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.get('#dropdown-class-example').as('dropdown').select(['option1']);
    })

    it.only ('test dynamic dropdowns', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.url().then(url => cy.log(url))
        cy.get('#autocomplete').as('dropdown').type('India', {delay:100})
        cy.get('.ui-menu-item').each(($el, index, $list) => {
            if ($el.text().startsWith('India')) {
                return cy.wrap($el).click()
            }
        })
    })
})