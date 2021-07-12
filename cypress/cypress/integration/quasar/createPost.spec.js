describe("Test Quasar CRUD functionality", function () {
  it("can visit the homepage", function () {
    cy.visit(Cypress.config("frontendUrl") + "/posts");
    cy.contains("μblog");
  });

  it("can create a new post", function () {
    cy.visit(Cypress.config("frontendUrl") + "/new-post");
    const text = 'This post was created on the Quasar app.';
    cy.get('[data-cy="post-textarea"]').type(text);
    cy.get('[data-cy="post-submit-btn"]').click();
    cy.contains(text);
  });
});