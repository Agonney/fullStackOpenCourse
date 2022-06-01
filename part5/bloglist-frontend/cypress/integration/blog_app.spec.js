describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.createUser({ username: 'Tester', name: 'Test Tester', password: 'Test1234' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function(){
    cy.contains('Login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'Tester', password: 'Test1234' })
      cy.contains('Test Tester logged in')
    })

    it('fails with wrong credentials', function() {
    //   cy.contains('login').click()
      cy.get('#username').type('Tester')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').contains('ERROR')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login( { username: 'Tester', password: 'Test1234' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('John Doe')
      cy.get('#url').type('www.google.com')
      cy.get('#submitBlog').click()
      cy.visit('http://localhost:3000')
      cy.contains('Test Blog John Doe')
    })
  })

  describe('When a blog exists', function() {
    beforeEach(function() {
      cy.login( { username: 'Tester', password: 'Test1234' })
      cy.contains('create new blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('John Doe')
      cy.get('#url').type('www.google.com')
      cy.get('#submitBlog').click()
      cy.visit('http://localhost:3000')
      cy.contains('Test Blog John Doe')
    })

    it('it can be liked', function() {
      cy.contains('Test Blog John Doe').parent().find('#hideShowButton').click()
      cy.contains('Test Blog John Doe').parent().find('#likeButton')
    })

    it('it can be deleted by the owner', function() {
      cy.contains('Test Blog John Doe').parent().find('#hideShowButton').click()
      cy.contains('Test Blog John Doe').parent().find('#removeButton')
    })
  })
})