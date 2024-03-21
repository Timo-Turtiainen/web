describe('Blog ', function() {

  describe('when logged in', function() {
    beforeEach(function() {
      cy.visit('http://localhost:5173')
      cy.contains('Login').click()
      cy.get('#username').type('AAA')
      cy.get('#password').type('tosisalainen')
      cy.get('#loginButton').click()

      cy.contains("Aku Ankka logged in")
    })

    // it('front page can be opened', function() {
    //   cy.visit("http://localhost:5173/")
    //   cy.contains('Blog App')
    // })

    it('a new blog can be created' , function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('title blog created by cypress')
      cy.contains('Save').click()
      cy.contains('blog created by cypress')
    })
  })
})