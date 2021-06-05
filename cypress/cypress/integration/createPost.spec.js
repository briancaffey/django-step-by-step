describe("Test visit homepage", function () {
  it("can visit the homepage", function () {
    cy.visit("/posts");
    cy.contains("μblog");
  });

  it("can create a post anonymously using fbv", function () {
    cy.visit("/posts/new");
    cy.get("#post-body").type(
      "an anonymous post using a function-based view"
    );
    cy.get("#submit-post").click();
    cy.contains("Your post was created!");
    cy.contains("function-based view");
  });

  it("can create a post anonymously using cbv", function () {
    cy.visit("/cbv/posts/new");
    cy.get("#post-body").type(
      "an anonymous post using a class-based view"
    );
    cy.get("#submit-post").click();
    cy.contains("class-based view");
  });
});
