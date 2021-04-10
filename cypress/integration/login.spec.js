describe("Test login", function () {
  it("can login to an existing account", function () {
    cy.visit("/login");
    cy.get("#email").type("user@email.com");
    cy.get("#password").type("password");
    cy.get("#login-button").click();
    cy.contains("Account");
  });
});
