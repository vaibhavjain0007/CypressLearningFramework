describe ('API Testing', () => {

    let accessToken = null;
    let orderId = null;
    // get token using post call --> https://simple-books-api.glitch.me/api-clients/
    // orders post call --> https://simple-books-api.glitch.me/orders/ --> gives us orderId
    // {
    //     "bookId": 1,
    //     "customerName": "das bhagat"
    // }

    // orders get call --> https://simple-books-api.glitch.me/orders/{orderId}
    
    it ('create access token', () => {
        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/api-clients/',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                clientName: 'ABC',
                clientEmail: Math.random().toString().substring(5).concat('@gmail.com')
            }
        }).then((response) => {
            cy.log(response)
            expect(response.status).eq(201)
            accessToken = response.body.accessToken;
            cy.log(accessToken)
        })
    })

    it ('create first order', () => {
        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/orders/',
            body: {
                "bookId": 1,
                "customerName": `Das Bhagat ${Math.random().toString().substring(2)}`
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            cy.log(response)
            expect(response.status).eq(201)
            orderId = response.body.orderId;
            cy.log(orderId)
        })
    })

    it ('create second order', () => {
        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/orders/',
            body: {
                "bookId": 1,
                "customerName": `Das Bhagat ${Math.random().toString().substring(2)}`
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            cy.log(response)
            expect(response.status).eq(201)
            let orderId2 = response.body.orderId;
            cy.log(orderId2)
        })
    })

    it ('get all orders', () => {
        cy.request({
            method: 'GET',
            url: 'https://simple-books-api.glitch.me/orders/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            cookies: {cookieName: 'myCookie'}
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).has.length(2)
            cy.log(response)
        })
    })

    it ('get order by orderId', () => {
        cy.request({
            method: 'GET',
            url: `https://simple-books-api.glitch.me/orders/${orderId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            cookies: {cookieName: 'myCookie'}
        }).then((response) => {
            expect(response.status).to.eq(200)
            cy.log(response)
        })
    })
})