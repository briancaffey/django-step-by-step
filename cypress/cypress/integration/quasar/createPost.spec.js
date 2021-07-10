describe("Test Quasar CRUD functionality", function () {
  it("can visit the homepage", function () {
    cy.visit("http://localhost:8080/posts");
    cy.contains("Vue");
  });

  it("can create a new post", function () {
    cy.visit("http://localhost:8080/posts/new");
    cy.get('[data-cy="post-textarea"]').type("This post was created on the Quasar app.");
    cy.get('[data-cy="post-submit-btn"]').click();
    cy.contains("Quasar");
  });
});