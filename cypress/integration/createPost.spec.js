describe("Test visit homepage", function () {
  it("can visit the homepage", function () {
    cy.visit("/posts");
    cy.contains("Microblog");
  });

  it("can create a post anonymously using fbv", function () {
    cy.visit("/posts/new");
    cy.contains("Microblog");
    cy.get("#post-body").type(
      "New post from Cypress using a function-based view."
    );
    cy.get("#submit-post").click();
    cy.contains("Your post was created!");
    cy.contains("function-based view");
  });

  it("can create a post anonymously using cbv", function () {
    cy.visit("/cbv/posts/new");
    cy.contains("Microblog");
    cy.get("#post-body").type(
      "New post from Cypress using a class-based views."
    );
    cy.get("#submit-post").click();
    cy.contains("class-based views");
  });
});
