/// <reference types="cypress" />

// Used for going headless for login. Uses API call to get token and then sets the currentCredentials sessionStorage key
Cypress.Commands.add('loginToApplication', () => {
  const userCredentials = {
    email: Cypress.env('email'),
    password: Cypress.env('password'),
  };

  cy.request('POST', `${Cypress.env('tokenRequestUrl')}`, userCredentials)
    .its('body')
    .then((body) => {
      const auth = {
        "userId": body.payload.userId,
        "token": body.payload.clientToken,
      };
      cy.wrap(auth).as('auth');
      cy.visit('/', {
        onBeforeLoad(win) {
          win.sessionStorage.setItem('currentCredentials', JSON.stringify(auth));
        },
      });
    });
});

