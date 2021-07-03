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

  it("can create a post with an image using fbv", function() {
    cy.visit("/posts/new");
    cy.get("#post-body").type(
      "this post contains an image and was created using fbv"
    );
    cy.get('[data-cy="file-input"]').attachFile('redis.png');
    cy.get("#submit-post").click();
    cy.get("#post").find("img").should("have.attr", "src").should("include", "/media/images/redis")
  });

  it("can create a post with an image using cbv", function() {
    cy.visit("/cbv/posts/new");
    cy.get("#post-body").type(
      "this contains an image and was created using cbv"
    );
    cy.get('[data-cy="file-input"]').attachFile('redis.png');
    cy.get("#submit-post").click();
    cy.get("#post").find("img").should("have.attr", "src").should("include", "/media/images/redis")
  });
});
