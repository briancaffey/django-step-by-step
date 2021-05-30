describe("GraphQL demo", function () {
  it.skip("can query GraphiQL", function () {
    const query = `query {
  paginatedPosts {
    pages,
    count,
    objects {
      body,
      id,
      liked,
      likeCount,
`
    cy.visit("/graphql");
    cy.get(":nth-child(31) > .CodeMirror-line").click().type(query, {delay:0});
    cy.get(".execute-button").click();
  });
});