/// <reference types="cypress" />

import profile_PO from '../support/pageObjects/profile_PO';

import meMenu from '../fixtures/meMenu.json';
import profile from '../fixtures/profile.json';

describe('Validate Profile', () => {
  beforeEach('login to the app', () => {
    cy.loginToApplication();
  });
  it('Validate user profile information', () => {
    profile_PO.navigateToProfile();
    profile_PO.verifyHeaderText(meMenu.profile);
    profile_PO.clickToUnhideProfile();
    profile_PO.clickToHideProfile();
    profile_PO.editFirstName(profile.firstName);
    profile_PO.editLastName(profile.lastName);
    profile_PO.editPosition(profile.position);
    profile_PO.editEmailAddress1(profile.email1);
    profile_PO.editEmailAddress2(profile.email2);
    profile_PO.editMobileNum1(profile.mobileNum1);
    profile_PO.editMobileNum2(profile.mobileNum2);
  });
});
