describe('Cypress Fixtures', () => {

    // fixtures, hooks and tags

    before('setup data', function() {
        cy.fixture('example').then(function(data) {
            cy.wrap(data).as('data');  // Use alias to store the data
        })
        cy.log('Data: ', cy.get('@data'))
    })

    beforeEach('init', () => {
        cy.log('execute before each test case to avoid data dilution')
    })

    it.only ('get and update the fixture data', () => {
        cy.get('@data').then((data) => {
            cy.log(data)
        })
        cy.get('@data').then((data) => {
            const updatedData = {...data}
            updatedData.email = 'jainvaibhav@gmail.com'
            cy.log(updatedData)
        })
    })

    afterEach('tear down', () => {
        cy.log('tear down after each test case execution completes')
    })

    after('clean up', () => {
        cy.log('clean up once after all the test cases gets executed')
    })
})