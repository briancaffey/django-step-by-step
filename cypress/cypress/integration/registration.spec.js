/**
 * This tests the authentication flow using the mailhog API
 *
 * https://humble.dev/testing-an-email-workflow-from-end-to-end-with-cypress
 */
describe("Test registration", function () {
  // setup a unique email address using UNIX timestamp
  const timeStamp = Math.floor(Date.now() / 1000);
  const emailAddress = `cypress${timeStamp}@email.com`;
  const password = "Abcd1234!";

  it("can register for a new account", function () {
    cy.visit("/register");
    cy.get("#email").type(emailAddress);
    cy.get("#password1").type(password);
    cy.get("#password2").type(password);
    cy.get("#register-button").click();
    cy.contains("Thank you for signing up");
  });

  it("can verify new user email using mailhog API", function() {
    cy.getConfirmationEmail(emailAddress).then(email => {
      const link = email.match(/href="localhost:8000([^"]*)/)[1];
      console.log(link);
      cy.visit(link);
      cy.contains('confirmed');
    });
  });

  it("create a post as a verified user", function() {
    cy.login(emailAddress, password);
    const post = "verified user creating a new post (fbv)";
    cy.visit("/posts/new");
    cy.get("#post-body").type(post);
    cy.get("#submit-post").click();
    cy.contains("Your post was created!");
    cy.contains(post);
  });

  it("user can like their own post", function() {
    cy.url().then(url => {
      console.log(url);
      const postId = url.split("/").slice(-1)[0];
      cy.get(`#like-post-${postId}`).click();
    });
  });
});
