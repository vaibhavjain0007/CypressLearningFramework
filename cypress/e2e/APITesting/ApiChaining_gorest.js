describe('api chaining in go rest', () => {

    it('create, update and delete in go rest api', () => {
        let id = null;
        const payload = {
            name: 'Tinker paul',
            email: Math.random().toString().substring(5).concat('@grimes.test'),
            gender: 'male',
            status: 'active'
        }
        const auth_token = 'Bearer 589da5c9f8445cb8a13e521536972524e75751700a5cc7deef9ef1c3b0099595'

        // Create user
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                'Authorization': auth_token
            },
            body: payload
        }).then((response) => {
            expect(response.status).to.eq(201)
            id = response.body.id;

            // Update user
            cy.request({
                method: 'PUT',
                url: `https://gorest.co.in/public/v2/users/${id}`,
                headers: {
                    'Authorization': auth_token
                },
                body: {
                    name: 'Scott'
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq('Scott')

                // Delete user
                cy.request({
                    method: 'DELETE',
                    url: `https://gorest.co.in/public/v2/users/${id}`,
                    headers: {
                        Authorization: auth_token
                    }
                }).then((response) => {
                    expect(response.status).to.eq(204)
                })
            })
        })
    })
})