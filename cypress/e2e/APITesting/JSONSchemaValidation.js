// install ajv libray - npm install ajv
const Ajv = require('ajv')
const avj = new Ajv()

describe ('Schema validation', () => {

    it ('Schema Validation against response', () => {
        cy.request({
            method: 'GET',
            url: 'https://fakestoreapi.com/products'
        })
        .then((response) => {
            const schema = {
                "$schema": "http://json-schema.org/draft-07/schema#",
                "title": "Generated schema for Root",
                "type": "array", // for single object response use --> "type": "array"
                "properties": {
                  "id": {
                    "type": "number"
                  },
                  "title": {
                    "type": "string"
                  },
                  "price": {
                    "type": "number"
                  },
                  "description": {
                    "type": "string"
                  },
                  "category": {
                    "type": "string"
                  },
                  "image": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "object",
                    "properties": {
                      "rate": {
                        "type": "number"
                      },
                      "count": {
                        "type": "number"
                      }
                    },
                    "required": [
                      "rate",
                      "count"
                    ]
                  }
                },
                "required": [
                  "id",
                  "title",
                  "price",
                  "description",
                  "category",
                  "image",
                  "rating"
                ]
              } // schema.......

              const validate = avj.compile(schema)
              const isSchemaValid = validate(response.body)
              expect(isSchemaValid).to.be.true;
        })
    })
})