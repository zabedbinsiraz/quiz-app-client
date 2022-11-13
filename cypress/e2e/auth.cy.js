describe('auth completion testing by cypress', () => {
  it('signup and login user', () => {
    cy.visit('http://localhost:3000/signup')
    cy.get('input[placeholder="Enter name"]', { timeout: 1000 }).type('Mohammad Jabed Hossain')
    cy.get('input[placeholder="Enter email"]', { timeout: 1000 }).type('hossainjabed006@gmail.com')
    cy.get('input[placeholder="Enter password"]', { timeout: 1000 }).type('Zabed17289$')
    cy.get('input[type="checkbox"]', { timeout: 1000 }).check()
    cy.get('button[type="submit"]', { timeout: 10000 }).click()

    cy.location('pathname').should('eq','/login')
    cy.get('input[placeholder="Enter email"]', { timeout: 1000 }).type('hossainjabed006@gmail.com')
    cy.get('input[placeholder="Enter password"]', { timeout: 1000 }).type('Zabed17289$')
    cy.get('button[type="submit"]', { timeout: 10000 }).click()

    cy.location('pathname').should('eq','/home')
    
  })
})