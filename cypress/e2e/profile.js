/// <reference types="cypress" />

import profile_PO from '../support/pageObjects/profile_PO';

import meMenu from '../fixtures/meMenu.json';
import profile from '../fixtures/profile.json';

describe('Validate Profile', () => {
  beforeEach('login to the app', () => {
    cy.loginToApplication();
  });
  it('Validate user profile information edit and save', () => {
    const email2 = `${Date.now().toString().slice(-6)}-${profile.email2}`;
    const phoneNumber1 = `${Date.now().toString().slice(-10)}`;
    let number = parseInt(Date.now().toString().slice(-10)) - 45385;
    const phoneNumber2 = number.toString();

    profile_PO.navigateToProfile();
    profile_PO.verifyHeaderText(meMenu.profile);
    profile_PO.editFirstName(profile.firstName);
    profile_PO.editLastName(profile.lastName);
    profile_PO.editPosition(profile.position);
    profile_PO.editEmailAddress2(email2);
    profile_PO.editMobileNum1(phoneNumber1);
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

    cy.intercept({
      method: 'PUT',
      url: '**/emails/**',
    }).as('putEmails');

    cy.intercept({
      method: 'PUT',
      url: '**/phoneNumbers/**',
    }).as('putPhoneNumbers');

    profile_PO.saveProfile();

    cy.wait('@putName').then(({ request, response }) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal('Success');
      expect(response.body.payload.first).to.equal(profile.firstName);
      expect(response.body.payload.last).to.equal(profile.lastName);
    });

    cy.wait('@positions').then(({ request, response }) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal('Success');
      expect(response.body.payload.position.title).to.equal(
        'Certified Occupational Therapy Assistant'
      );
      expect(response.body.payload.position.abbreviation).to.equal('COTA');
    });

    cy.wait('@postProfilePrivacy').then(({ request, response }) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal('Success');
      expect(response.body.payload.isProfilePrivate).to.equal(false);
    });

    cy.wait('@putEmails').then(({ request, response }) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal('Success');
      expect(response.body.payload.email).to.equal(email2);
    });

    cy.wait('@putPhoneNumbers').then(({ request, response }) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal('Success');
      expect(response.body.payload.phoneNumber).to.equal(phoneNumber1);
    });

    profile_PO.editMobileNum2(phoneNumber2);
    profile_PO.saveProfile();

    cy.wait('@putPhoneNumbers').then(({ request, response }) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal('Success');
      expect(response.body.payload.phoneNumber).to.equal(phoneNumber2);
    });
  });
});
