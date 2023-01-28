describe('Navigation', () => {
  it('should navigate to the Albert Einstein page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    cy.get('a[href*="character/11"]').click()

    // The new page title should include Albert Einstein
    cy.title().should("equal", "Albert Einstein")
    cy.url().should("include", "/character/11")
  })
})

export {}