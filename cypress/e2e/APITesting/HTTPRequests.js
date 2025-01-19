describe ('HTTP Requests', () => {

    it ('GET call', () => {
        cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1')
        .its('status')
        .should('eq', 200)
    })

    it ('POST call', () => {
        cy.request({
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts',
            body: {
                userId: 1,
                title: "Post request",
                body: "post request body with userId 1"
              }
        })
        .its('status')
        .should('eq', 201)
    })

    it ('PUT call', () => {
        cy.request({
            method: 'PUT',
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            body: {
                userId: 1,
                title: "Post request updated",
                body: "post request body with userId 1 updated"
              }
        })
        .its('status')
        .should('eq', 200)
    })

    it ('DELETE call', () => {
        cy.request('DELETE', 'https://jsonplaceholder.typicode.com/posts/1')
        .its('status')
        .should('eq', 200)
    })
})