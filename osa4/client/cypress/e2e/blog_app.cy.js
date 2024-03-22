const user = {
  name: 'aku ankka',
  username: 'aku',
  password: 'salainen'
}

const user2 = {
  name: 'Hessu Hopo',
  username: 'hessu',
  password: 'salassa'
}

describe('Blog app', function() {
  beforeEach(function() {

    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.visit('')
    cy.contains('Blog App')
  })

  describe('Login', function() {
    it('Fails with wrong credentials', function() {
      cy.get('#username').type('aku')
      cy.get('#password').type('wrong')
      cy.get('#loginButton').click()
      cy.get('.error').should('contain', 'wrong credentials') 
    })

    it('Succeeds with correct credentials', function() {
      cy.get('#username').type('aku')
      cy.get('#password').type('salainen')
      cy.get('#loginButton').click()
      cy.get('html').should('contain', 'aku ankka logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login(user)
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('first blog')
      cy.get('#author').type('first author')
      cy.get('#url').type('first url')
      cy.get('#saveBlog').click()
      cy.get('.addedBlog').should('contain', 'A new blog ') 
    })

    it('User can like a blog', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('first blog')
      cy.get('#author').type('first author')
      cy.get('#url').type('first url')
      cy.get('#saveBlog').click()
      cy.contains('view').click()
      cy.get('#likeButton').click()
      cy.contains('Likes:1')
    })

    it('User can delete his own posts', function() {
      cy.createBlog({title: 'title1', author: 'author1', url: 'url1', likes: 0})
      cy.contains('Create new blog').click()
      cy.contains('view').click()
      cy.get('#deleteBlogButton').click()
      cy.get('html').should('not.contain', 'first blog') 
    })
    
    it('Only user who added blog can see delete button', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('first blog')
      cy.get('#author').type('first author')
      cy.get('#url').type('first url')
      cy.get('#saveBlog').click()
  
      cy.login(user2)
      cy.contains('Create new blog').click()
      cy.contains('view').click()
      cy.contains('Delete').should('not.exist')
    })
  })
    it('Blogs are sorted most likes first', function() {
      cy.login(user)
      cy.createBlog({title: 'title1', author: 'author1', url: 'url1', likes: 0})
      cy.createBlog({title: 'title2', author: 'author2', url: 'url2', likes: 0})

      cy.contains('Create new blog').click()

      cy.contains('title1').find('button').contains('view').click()
      cy.contains('title1').find('button').contains('Like').click()
      
      cy.contains('title2').find('button').contains('view').click()
      cy.contains('title2').find('button').contains('Like').click()
      cy.wait(1000)
      cy.contains('title2').find('button').contains('Like').click()
      cy.get('#blog').eq(0).should('contain', 'url2')
      
    })
})


