describe("Test registration", function () {
  it("can register for a new account", function () {
    cy.visit("/register");
    // do this so that in development you don't get `email already exists`
    const timeStamp = Math.floor(Date.now() / 1000);
    cy.get("#email").type(`cypress${timeStamp}@email.com`);
    cy.get("#password1").type("Abcd1234!");
    cy.get("#password2").type("Abcd1234!");
    cy.get("#register-button").click();
    cy.contains("Thank you for signing up");
  });
});
