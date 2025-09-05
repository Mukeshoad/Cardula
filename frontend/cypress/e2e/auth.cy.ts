import { describe, beforeEach, it } from "mocha"
import { cy } from "cypress"

describe("Authentication", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("should allow user to sign up", () => {
    cy.get('[data-testid="signup-button"]').click()
    cy.get('[data-testid="email-input"]').type("test@example.com")
    cy.get('[data-testid="password-input"]').type("password123")
    cy.get('[data-testid="signup-submit"]').click()

    cy.url().should("include", "/dashboard")
  })

  it("should allow user to log in", () => {
    cy.get('[data-testid="login-button"]').click()
    cy.get('[data-testid="email-input"]').type("test@example.com")
    cy.get('[data-testid="password-input"]').type("password123")
    cy.get('[data-testid="login-submit"]').click()

    cy.url().should("include", "/dashboard")
  })

  it("should redirect to login when accessing protected route", () => {
    cy.visit("/dashboard")
    cy.url().should("include", "/login")
  })
})
