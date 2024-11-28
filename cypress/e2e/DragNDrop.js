describe('test drag and drop', () => {

    it ('drag and drop using trigger', () => {
        const dataTransfer = new DataTransfer();
        cy.visit('https://artoftesting.com/samplesiteforselenium')
        cy.get('#myImage').trigger('dragstart', {dataTransfer})
        cy.get('#targetDiv').trigger('drop', {dataTransfer})
    })

    it ('drag and drop using cypress drag and drop plugin', () => {
        cy.visit('https://artoftesting.com/samplesiteforselenium')
        cy.get('#myImage').drag('#targetDiv')
    })

    it.only ('drag and drop using cypress real events plugin methods', () => {
        cy.visit('https://artoftesting.com/samplesiteforselenium')
        let offsetTargetLeft;
        let offsetTargetTop
        cy.get('#targetDiv').realMouseDown({position : "center"}).then(($el) => {
            offsetTargetLeft = $el.offset().left
            offsetTargetTop = $el.offset().top
        }).then(() => {
            cy.log(offsetTargetLeft, offsetTargetTop)
        })
        // cy.get('#targetDiv').realMouseMove()
        // cy.get('#targetDiv').realMouseUp({ position : "center"})

        cy.get('#myImage')  // Replace with your element selector
      .realMouseDown({ position: 'center' }).realMouseMove(40, 100).wait(2000); // Trigger mousedown at the center of the element

    // Move the mouse to the target location and simulate a drop
    cy.get('#targetDiv')
      .realMouseUp({ position: 'center' }); // Release the mouse button to drop the element
    })
})