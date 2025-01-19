describe ('authentications', () => {

    it ('basic authentication', () => {
        cy.request({
            method: 'GET',
            url: 'https://postman-echo.com/basic-auth',
            auth: {
                username: 'postman',
                password: 'password'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.be.true;
        })
    })

    it ('basic digest authentication', () => {
        cy.request({
            method: 'GET',
            url: 'https://postman-echo.com/basic-auth', 
            auth: {
                username: 'postman',
                password: 'password',
                method: 'digest'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.be.true;
        })
    })

    it ('bearer token authentication', () => {
        const token = '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';
        cy.request({
            method: 'GET',
            url: 'https://api.github.com/user/repos',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it ('API key auth', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/forecast/daily',
            qs: {
                q: 'Delhi',
                appid: 'fe9c5cddb7e01d747b4611c3fc9eaf2c'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            cy.log(response.body)
        })
    })
})