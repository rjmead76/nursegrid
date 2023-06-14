/// <reference types="cypress" />

import worksites_PO from '../support/pageObjects/worksites_PO';

import meMenu from '../fixtures/meMenu.json';

describe('Validate ability to add and remove a worksite', () => {
  beforeEach('login to the app', () => {
    cy.loginToApplication();
  });
  it('navigate to worksites page', () => {
    worksites_PO.navigateToWorksites();
    worksites_PO.verifyHeaderText(meMenu.worksites);
    worksites_PO.clickAddWorksiteBtn();
  });
});
