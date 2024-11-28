describe ('test file upload', () => {

    it ('test single file upload', () => {
        cy.visit('https://the-internet.herokuapp.com/upload')
        cy.get('#file-upload').attachFile('file1.txt')
        cy.get('#file-submit').click()

        cy.get('.example h3').should('have.text', 'File Uploaded!')
        cy.get('#uploaded-files').should('contain.text', 'file1.txt')
    })

    it ('test single file upload with file rename', () => {
        cy.visit('https://the-internet.herokuapp.com/upload')
        cy.get('#file-upload').attachFile({filePath:'file1.txt', fileName:'renamedFile1.txt'})
        cy.get('#file-submit').click()

        cy.get('.example h3').should('have.text', 'File Uploaded!')
        cy.get('#uploaded-files').should('contain.text', 'renamedFile1.txt')
    })

    it ('test file upload using drag n drop', () => {
        cy.visit('https://the-internet.herokuapp.com/upload')
        cy.get('#drag-drop-upload').attachFile(['file1.txt', 'file2.txt'], {subjectType: 'drag-n-drop'})
        cy.get('.dz-filename').find('span').should('contain.text', 'file1.txt')
        let arr = []
        cy.get('.dz-filename').find('span').each(($el) => {
            arr.push($el.text())
        }).then(() => {
            expect(arr.filter(item => item !== '')).to.deep.equal(['file1.txt', 'file2.txt'])
        })
    })

    it ('test multiple file upload', () => {
        cy.visit('https://davidwalsh.name/demo/multiple-file-upload.php')
        cy.get('#filesToUpload').attachFile(['file1.txt', 'file2.txt'])
        let arr = [];
        cy.get('#fileList').find('li').each(($el) => {
            arr.push($el.text())
        }).then(() => {
            expect(arr.filter(item => item !== '')).to.deep.equal(['file1.txt', 'file2.txt'])
        })
    })

    it.only ('file upload - shadow dom', () => {
        cy.visit('https://www.htmlelements.com/demos/fileupload/shadow-dom/index.htm')
        cy.task('customTask')
        // read an excel file and check for the file existence
        cy.readFile('cypress/fixtures/demo.xlsx').should('exist');
        // readExcel file using cy.task
        cy.task('readExcel', { filePath: 'cypress/fixtures/demo.xlsx' }).then((data) => {
            console.log(data)
        });
        // shadow dom/ shadow root element
        cy.get('.smart-browse-input', {includeShadowDom:true}).attachFile({filePath:'file1.txt', fileName: 'file1Updated.txt'})
        cy.get('.smart-item-name', {includeShadowDom:true}).should('contain.text', 'file1Updated.txt')
    })

})