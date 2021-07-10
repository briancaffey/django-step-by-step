describe("Test Login functionality", function () {
  it("Test existing user can login", function () {
    cy.visit("http://localhost:8080/login");
    cy.get('[data-cy="email-input"]').type("user@email.com")
    cy.get('[data-cy="password-input"]').type("password")
    cy.get('[data-cy="login-btn"]').click();

  });


});