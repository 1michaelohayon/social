describe('Social', function () {
  this.beforeEach(function () {
    cy.visit('http://localhost:3000')
  })


  it('front page can be opened', function () {
    cy.contains('Meser')
  })

  it('contains toggleable new message button', function () {
    cy.contains('New Message').should('be.visible').click()
    cy.contains('New Message').should('not.be.visible')
    cy.contains('Send').should('be.visible')
    cy.contains('Cancel').should('be.visible').click()
    cy.contains('New Message').should('be.visible')
    cy.contains('Send').should('not.be.visible')
  })


  describe('User', function () {
    it('can open user menu)', function () {
      cy.get('[alt="me"]').click()
      cy.contains('Sign in').should('be.visible')
      cy.contains('Sign up').should('be.visible')
    })


    it('can sign in', function () {
      cy.get('[alt="me"]').click()
      cy.contains('Sign in').click()
      cy.get("input[placeholder=\"email\"]").type("test@test.com");
      cy.get("input[placeholder=\"password\"]").type("test");
      cy.contains('Sign In').click()
      cy.contains('logout').should('be.visible')
    })

    describe('logged actions', function () {
      beforeEach(function () {
        cy.get('[alt="me"]').click()
        cy.contains('Sign in').click()
        cy.get("input[placeholder=\"email\"]").type("test@test.com");
        cy.get("input[placeholder=\"password\"]").type("test");
        cy.contains('Sign In').click()
      })

      it('can logout', function () {
        cy.contains('logout').click()
        cy.get('[alt="me"]').click()
        cy.contains('Sign In').should('be.visible')
      })

      it('can visit his page', function () {
        cy.contains('My Page').should('be.visible').click()
        cy.contains('test@test.com').should('be.visible')
        cy.contains('Messages').should('be.visible')
        cy.contains('followers').should('be.visible')
        cy.contains('following').should('be.visible')

      })

    })
  })
})