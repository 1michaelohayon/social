describe('Social', function () {
    this.beforeEach(function () {
        cy.visit('http://localhost:3000')
    })


    it('front page can be opened', function () {
        cy.contains('Meser')
    })

    it('contains toggleable הודעה חדשה button', function () {
        cy.contains('הודעה חדשה').should('be.visible').click()
        cy.contains('הודעה חדשה').should('not.be.visible')
        cy.contains('שלח').should('be.visible')
        cy.contains('ביטול').should('be.visible').click()
        cy.contains('הודעה חדשה').should('be.visible')
        cy.contains('שלח').should('not.be.visible')
    })


    describe('User', function () {
        it('can open user menu)', function () {
            cy.get('[alt="me"]').click()
            cy.contains('התחבר').should('be.visible')
            cy.contains('הרשמה').should('be.visible')
        })


        it('can sign in', function () {
            cy.get('[alt="me"]').click()
            cy.contains('התחבר').click()
            cy.get("input[placeholder=\"אימייל\"]").type("test@test1.com");
            cy.get("input[placeholder=\"סיסמה\"]").type("test");
            cy.contains('התחבר').click()
            cy.contains('התנתק').should('be.visible')
        })

        describe('logged actions', function () {
            beforeEach(function () {
                cy.get('[alt="me"]').click()
                cy.contains('התחבר').click()
                cy.get("input[placeholder=\"אימייל\"]").type("test@test.com");
                cy.get("input[placeholder=\"סיסמה\"]").type("test");
                cy.contains('התחבר').click()
            })

            it('can logout', function () {
                cy.contains('התנתק').click()
                cy.get('[alt="me"]').click()
                cy.contains('התחבר').should('be.visible')
            })

            it('can visit his page', function () {
                cy.contains('העמוד שלי').should('be.visible').click()
                cy.contains('Test User').should('be.visible')
                cy.contains('הודעות').should('be.visible')
                cy.contains('עוקב אחרי').should('be.visible')
                cy.contains('עוקבים').should('be.visible')

            })

        })
    })
})