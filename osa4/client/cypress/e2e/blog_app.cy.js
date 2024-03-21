
describe('Blog app', function() {

  beforeEach(function() {
   cy.request('POST', 'http://localhost:3003/api/testing/reset')

   const user = {
     name: 'aku ankka',
     username: 'aku',
     password: 'salainen'
   }

   cy.request('POST', 'http://localhost:3003/api/users/', user) 
   cy.visit("http://localhost:5173/")
  })

  it('Login form is shown', function() {
    cy.visit("http://localhost:5173/")
    cy.contains('Blog App')
  })


  // describe('when logged in', function() {

  //   //   cy.contains('Login').click()
  //   //   cy.get('#username').type('AAA')
  //   //   cy.get('#password').type('tosisalainen')
  //   //   cy.get('#loginButton').click()

  //   //   cy.contains("Aku Ankka logged in")
  //   // })

  //   it('a new blog can be created' , function() {
  //     cy.contains('Create new blog').click()
  //     cy.get('#title').type('blog title written by cypress')
  //     cy.get('#author').type('blog author written by cypress')
  //     cy.get('#url').type('blog url written by cypress')
  //     cy.contains('Save').click()
  //     cy.contains('blog title written by cypress blog author written by cypress')
  //   })
  // })
  
  describe('Login', function() {

    it('Fails with wrong credentials', function() {
      cy.login({ username: 'aku', password: 'salainen' })
      cy.contains('Login').click()
      cy.get('#username').type('aku')
      cy.get('#password').type('wrong')
      cy.get('#loginButton').click()
      cy.get('.error').should('contain', 'wrong credentials') 
    })

    it('Succeeds with correct credentials', function() {
      cy.login({ username: 'aku', password: 'salainen' })
      cy.contains('Login').click()
      cy.get('#username').type('aku')
      cy.get('#password').type('salainen')
      cy.get('#loginButton').click()
      cy.get('html').should('contain', 'aku ankka logged in')
    })
  })

    // describe('when logged in', function() {

  //   //   cy.contains('Login').click()
  //   //   cy.get('#username').type('AAA')
  //   //   cy.get('#password').type('tosisalainen')
  //   //   cy.get('#loginButton').click()

  //   //   cy.contains("Aku Ankka logged in")
  //   // })

})



