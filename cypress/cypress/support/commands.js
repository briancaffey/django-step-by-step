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

// -- This command will recuresively search the mailhog API for an email that matches a search term --
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
        if (body) {
          const { items } = body;
          const email = items[0];
          const emailBody = email["Content"]["Body"];
          console.log(emailBody);
          return emailBody;
        }

        // If body is null, it means that no email was fetched for this address.
        // We call requestEmail recursively until an email is fetched.
        // We also wait for 300ms between each call to avoid spamming our server with requests
        cy.wait(300);

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