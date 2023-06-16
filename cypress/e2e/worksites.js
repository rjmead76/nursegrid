/// <reference types="cypress" />

import worksites_PO from '../support/pageObjects/worksites_PO';

import meMenu from '../fixtures/meMenu.json';
import worksites from '../fixtures/worksites.json';

describe('Validate ability to add and remove a worksite', () => {
  beforeEach('login to the app', () => {
    cy.loginToApplication();
  });
  it('Add a Worksite with department', () => {
    worksites_PO.navigateToWorksites();
    worksites_PO.verifyHeaderText(meMenu.worksites);
    worksites_PO.clickAddWorksiteBtn();
    worksites_PO.searchForFacilityByName(worksites.facility);
    worksites_PO.elements.searchResult().should('contain', worksites.facility);
    worksites_PO.selectFirstFacilityFromResults();
    worksites_PO.searchForDepartmentByName(worksites.department);
    worksites_PO.elements
      .searchResult()
      .should('contain', worksites.department);
    worksites_PO.selectFirstDepartmentFromResults();

    // Save Worksite and verify success via API
    cy.intercept({
      method: 'POST',
      url: '**/borg/worksites**',
    }).as('postWorksite');

    worksites_PO.saveWorksite();

    cy.wait('@postWorksite').then(({ request, response }) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal('Success');
      expect(response.body.payload.departmentName).to.equal(
        worksites.department
      );
      expect(response.body.payload.hospitalName).to.equal(worksites.facility);
      expect(response.body.payload.colorHex).to.equal(worksites.color);
    });
    worksites_PO.selectWorksite(worksites.facility);
  });
});
