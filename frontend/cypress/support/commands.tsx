/// <reference types="cypress" />

// Custom commands for authentication
Cypress.Commands.add("login", (email: string, password: string) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("API_URL") || "http://localhost:3001"}/api/auth/login`,
    body: {
      email,
      password,
    },
  }).then((response) => {
    window.localStorage.setItem("token", response.body.token)
  })
})

Cypress.Commands.add("logout", () => {
  window.localStorage.removeItem("token")
})

// Declare the custom commands for TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      logout(): Chainable<void>
    }
  }
}
