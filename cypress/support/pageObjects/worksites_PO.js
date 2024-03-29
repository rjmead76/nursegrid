/// <reference types="cypress" />

class Worksites_PO {
  elements = {
    header: () => cy.get('#me-header'),
    addWorksiteBtn: () => cy.get('.me-add-button'),
    worksitesUrl: 'https://web-dev.nursegrid.com/#/me/worksites',
    inputFacilityName: () =>
      cy.get(
        '.worksite-search-container > [placeholder="Search by name or location"]'
      ),
    searchResult: () => cy.get('.worksite-result').first(),
    inputDepartmentName: () => cy.get('.worksite-search'),
    btnSaveWorksite: () => cy.get('.me-save-button'),
    listWorksites: () => cy.get('[class="worksite ng-scope"]'),
    btnDeleteWorksite: () => cy.get('.me-delete-button'),
    modalRemoveWorksite: () => cy.get('[type="submit"').contains('Remove'),
    positionDropDown: () => cy.get('#newWorksitePositionSelect'),
    employmentTypeDropDown: () => cy.get('#employmentTypeSelect'),
  };

  navigateToWorksites = () => {
    cy.visit(this.elements.worksitesUrl);
    cy.url().should('include', 'me/worksites');
  };

  verifyHeaderText = (text) => {
    this.elements.header().should('contain', text);
  };

  clickAddWorksiteBtn = () => {
    this.elements.addWorksiteBtn().click({ force: true });
  };

  searchForFacilityByName = (facilityName) => {
    this.elements
      .inputFacilityName()
      .clear({ force: true })
      .type(facilityName)
      .type('{enter}');
  };

  selectFirstFacilityFromResults = () => {
    this.elements
      .searchResult()
      .find('.select-worksite')
      .click({ force: true });
  };

  searchForDepartmentByName = (departmentName) => {
    this.elements
      .inputDepartmentName()
      .clear({ force: true })
      .type(departmentName)
      .type('{enter}');
  };

  selectFirstDepartmentFromResults = () => {
    this.elements
      .searchResult()
      .find('.select-worksite')
      .click({ force: true });
  };

  selectPositionFromDropdown = (position) => {
    this.elements.positionDropDown().select(position);
  };

  selectEmploymentTypeFromDropdown = (employment) => {
    this.elements.employmentTypeDropDown().select(employment);
  };

  saveWorksite = () => {
    this.elements.btnSaveWorksite().click({ force: true });
  };

  selectWorksite = (worksite) => {
    this.elements.listWorksites().contains(worksite).click({ force: true });
    cy.wait(1000);
  };

  deleteWorksite = () => {
    this.elements.btnDeleteWorksite().click({ force: true });
    this.elements.modalRemoveWorksite().click({ force: true });
  };
}

module.exports = new Worksites_PO();
