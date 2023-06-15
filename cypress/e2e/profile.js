/// <reference types="cypress" />

import profile_PO from '../support/pageObjects/profile_PO';

import meMenu from '../fixtures/meMenu.json';
import profile from '../fixtures/profile.json';

describe('Validate Profile', () => {
  beforeEach('login to the app', () => {
    cy.loginToApplication();
  });
  it('Validate user profile information edit and save', () => {
    profile_PO.navigateToProfile();
    profile_PO.verifyHeaderText(meMenu.profile);
    profile_PO.editFirstName(profile.firstName);
    profile_PO.editLastName(profile.lastName);
    profile_PO.editPosition(profile.position);
    profile_PO.editEmailAddress1(profile.email1);
    profile_PO.editEmailAddress2(profile.email2);
    profile_PO.editMobileNum1(profile.mobileNum1);
    profile_PO.editMobileNum2(profile.mobileNum2);
    profile_PO.clickToUnhideProfile();
    profile_PO.clickToHideProfile();

    // Save Profile and verify response via intercepting API responses
    cy.intercept({
      method: 'PUT',
      url: '**/borg/users/**',
    }).as('putName');

    cy.intercept({
      method: 'POST',
      url: '**/positions/user/**',
    }).as('positions');

    cy.intercept({
      method: 'POST',
      url: '**/borg/users/**',
    }).as('postProfilePrivacy');

    profile_PO.saveProfile();

    cy.wait('@putName').then(({ request, response }) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal('Success');
      expect(response.body.payload.first).to.equal(profile.firstName);
      expect(response.body.payload.last).to.equal(profile.lastName);
    });

    cy.wait('@postProfilePrivacy').then(({ request, response }) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal('Success');
      expect(response.body.payload.isProfilePrivate).to.equal(false);
    });

    cy.wait('@positions').then(({ request, response }) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal('Success');
      expect(response.body.payload.position.title).to.equal(
        'Certified Occupational Therapy Assistant'
      );
      expect(response.body.payload.position.abbreviation).to.equal('COTA');
    });
  });
});
