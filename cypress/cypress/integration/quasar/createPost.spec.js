import { NewEmail } from '../../support/utils';

describe("Test Quasar CRUD functionality", function () {

  it("can create a new post as an anonymous user", function () {
    cy.createPost("Quasar test post content");
  });

  it("can create a new post as a logged-in user", function () {
    const emailAddress = new NewEmail().getEmail();
    cy.registerUser(emailAddress);
    cy.createPost("This post was created by a logged-in user");
  });
});
