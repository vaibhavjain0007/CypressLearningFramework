describe ('API Testing', () => {

    const queryParam = { page : 2 };
    it ('Passing query params', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users',
            // qs: { page : 2 }
            qs: queryParam
        })
        .then((response) => {
            cy.log(response.body.data)
            expect(response.status).to.be.eq(200)
            expect(response.status).eq(200)
            expect(response.body.page).eq(2)
            expect(response.body.data).has.length(6)

            expect(response.body.data[0]).have.property('id', 7)
            expect(response.body.data[0]).have.property('first_name', 'Michael')
        })
    })
})