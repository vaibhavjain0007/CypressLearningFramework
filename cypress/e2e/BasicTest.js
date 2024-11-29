import LoginPage from "../support/pages/LoginPage";

describe('Test Suite 1', () => {

    const loginPage = new LoginPage();

    before('before all', () => {
        cy.log('before all')
    })

    beforeEach('login', () => {
        cy.visit('https://www.amazon.in/', { failOnStatusCode: false })
    })

    it('test logo visibility', () => {
        cy.get('#nav-logo').should('be.visible')
    })

    it('test saerch and select product among results shown', {retries : 2}, () => {
        cy.get('#twotabsearchtextbox').type('vivo t3 5g mobile new 2024 256 gb')
        // cy.contains('vivo t3 5g mobile new 2024 256 gb').click()

        cy.get('.left-pane-results-container > div').each(($el, index, $list) => {
            cy.log('outside')
            if ($el.text().includes('vivo t3 5g mobile new 2024 256 gb')) {
                cy.log('inside**********************************************************************************8')
                cy.get('.left-pane-results-container > div').eq(index).realClick()
                return
            }
        })

        cy.contains('Vivo Y200 5G Mobile (Jungle Green, 8GB RAM, 256GB Storage)')
            .should('be.visible')
            .invoke('removeAttr', 'target')
            .click()
    })

    it.only ('select brand', () => {
        cy.get('#nav-xshop-container a').contains('Mobiles').realClick()
        cy.contains('Brands').parent().siblings('ul').find('li').each(($el, index, $list) => {
            cy.log($el.text())

            /*
                checking checkboxes --> check will only check if the checkbox is not already checked 
                but if we use click then it will uncheck the checked one and vice versa
            */
            if ($el.text().includes('Vivo')) {
                cy.log('Vivo')
                cy.wrap($el).find('input').scrollIntoView({ duration: 2000 }).check({ force: true })
                return
            }
        })
        cy.get('body').find('.a-changeover-inner').should('have.length', 0)
        cy.get("[data-component-type='s-search-result']").each(($el, index, $list) => {
            if ($el.text().includes('Vivo T3x 5G (Celestial Green, 128 GB) (6 GB RAM)')) {
                cy.wrap($el).contains('ADD TO CART', { matchCase: false }).click()
                return
            }
        })
        cy.get('.a-changeover-inner').should('have.text', 'Item Added')
        cy.get('.a-changeover-inner').should('be.visible')

        // Click multiple Add to cart button (all matched)
        // cy.get("[id^='a-autoid'][type='button']").click({multiple:true})

        // Validate cart
        cy.get('#nav-cart').click()
        cy.get('.a-size-extra-large').should('include.text', 'Shopping Cart')

        // alter quantity
        cy.get('#quantity').select('2', { force: true })
        cy.get('.a-dropdown-prompt').should('have.text', '2')

        cy.wait(2000)
        cy.get('[name=proceedToRetailCheckout]').click()
        loginPage.getMobOrEmail().type(Cypress.env('username')).screenshot()
        loginPage.getContinueBtn().click()
        loginPage.getPassword().type(Cypress.env('password'))
        loginPage.getSignIn().click()

        // Custom command - getMatchedElement
        cy.pause()
        cy.getMatchedElement('[data-action=select-address-in-list]', '192').find('input').check().should('be.checked')
        cy.get('[data-testid=Address_selectShipToThisAddress]').click()
        cy.wait(2000)
        cy.getMatchedElement('[data-a-input-name=ppw-instrumentRowSelection]', 'Cash on Delivery/Pay on Delivery').should('not.be.disabled')
    })

    it.only ('cross origin request', () => {
        cy.visit('https://www.flipkart.in/').wait(1000)
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    })

    afterEach('after each', () => {
        cy.log('after each')
    })

    after('after all', () => {
        cy.log('after all')
    })
})