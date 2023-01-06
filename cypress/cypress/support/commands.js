// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';

// -- This command will recursively search the mailhog API for an email that matches a search term --
// https://humble.dev/testing-an-email-workflow-from-end-to-end-with-cypress
Cypress.Commands.add('getConfirmationEmail', email => {
  function getEmail() {
    return cy
      .request({
        method: 'GET',
        url: `http://localhost:8025/api/v2/search?kind=containing&query=${email}`,
        headers: {
          'content-type': 'application/json',
        },
        json: true,
      })
      .then(({ body }) => {
        if (body && body['items'].length > 0) {
          const { items } = body;
          const email = items[0];
          const emailBody = email["Content"]["Body"];

          // get the account activation link
          const regex = /http[s]?:\/\/[a-zA-Z0-9:.]+\/activate\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-\/]+/g;
          const link = emailBody.match(regex)[0];

          cy.visit(link);
          return
        }
        console.log("no email found...")
        // If body is null, it means that no email was fetched for this address.
        // We call requestEmail recursively until an email is fetched.
        // We also wait for 300ms between each call to avoid spamming our server with requests
        cy.wait(600);
        return getEmail();
      });
  }

  return getEmail();
});

// -- Login a user with a username and password using the login form --
Cypress.Commands.add('login', (emailAddress, password) => {
  cy.visit("/login");
  cy.get("#email").type(emailAddress);
  cy.get("#password").type(password);
  cy.get("#login-button").click();
});

// -- Register a new user --
Cypress.Commands.add('registerUser', (email) => {
  // if email is undefined, generate an email based on a timestamped uuid
  let emailAddress;
  if (email === undefined) {
    const timeStamp = Math.floor(Date.now() / 1000);
    emailAddress = `cypress${timeStamp}@email.com`;
  } else {
    emailAddress = email;
  }
  cy.visit(Cypress.config("frontendUrl") + "/register");
  cy.get('[data-cy="email-input"]').type(emailAddress);
  cy.get('[data-cy="password-input"]').type(Cypress.config("defaultPassword"));
  cy.get('[data-cy="register-btn"]').click();

  cy.getConfirmationEmail(emailAddress).then(() => {
    cy.visit(Cypress.config("frontendUrl") + "/login");
    cy.get('[data-cy="email-input"]').type(emailAddress);
    cy.get('[data-cy="password-input"]').type(Cypress.config("defaultPassword"));
    cy.get('[data-cy="login-btn"]').click();
  });
});


Cypress.Commands.add("createPost", (content) => {
  cy.visit(Cypress.config("frontendUrl") + "/new-post");
  const text = 'This post was created on the Quasar app.';
  cy.get('[data-cy="post-textarea"]').type(text);
  cy.get('[data-cy="post-submit-btn"]').click();
  cy.contains(text);
});
