/// <reference types="cypress" />

import datePicker from '../Helpers/datePicker';

class Licenses_PO {
  elements = {
    header: () => cy.get('h3.ng-binding'),
    nextStep: () => cy.get('.next-button'),
    saveBtn: () => cy.get('.save-button'),
    saveLicenseMessage: () => cy.get('.save-license-message'),
    licensesUrl: 'https://web-dev.nursegrid.com/#/me/licenses',
    addLicenseUrl: 'https://web-dev.nursegrid.com/#/licenses/add',
    selectLicenseBtn: () => cy.get('div[ng-click="goToSelectLicense()"]'),
    getAllInactiveLicenses: () => cy.get('h4.ng-binding'),
    selectStateBtn: () => cy.get('div[ng-click="goToSelectState()"]'),
    getAllStates: () => cy.get('h3.ng-binding', { timeout: 3000 }),
    licenseNumField: () => cy.get('.license-number-input'),
    validationError: () => cy.get('span.validation-error.ng-binding.ng-scope'),
    addAttachmentsBtn: () => cy.get('input[type=file]'),
    finishBtn: () => cy.get('button[class="upload-button"]'),
    deleteBtn: () => cy.get('.me-delete-button'),
    deleteConfirmBtn: () => cy.get('.vex-dialog-button-primary'),
  }; // end of Elements //----------------------------------------------------------------//

  clickNextStepBtn = () => {
    this.elements.nextStep().click();
  };

  navigateToLicenses = () => {
    cy.visit(this.elements.licensesUrl);
    cy.url().should('include', '/me/licenses');
  };

  navigateToAddLicense = () => {
    cy.visit(this.elements.addLicenseUrl);
    cy.url().should('include', '/licenses/add');
  };

  verifyHeaderText = (headerText) => {
    this.elements.header().should('contain', headerText);
  };

  clickSelectLicenseBtn = () => {
    this.elements.selectLicenseBtn().click({ force: true });
  };

  selectLicense = (license) => {
    cy.wait(4000);
    this.elements.getAllInactiveLicenses().each(($el, index, $list) => {
      if ($el.text().includes(license)) {
        cy.wrap($el).click({ force: true });
      }
    });
  };

  clickSelectStateBtn = () => {
    this.elements.selectStateBtn().click({ force: true });
  };

  selectState = (state) => {
    this.elements.getAllStates().each(($el, index, $list) => {
      if ($el.text().includes(state)) {
        cy.wrap($el).click({ force: true });
      }
    });
  };

  enterLicenseNumber = (licenseNumber) => {
    this.elements.licenseNumField().clear().type(licenseNumber);
    this.elements.licenseNumField().should('have.value', licenseNumber);
  };

  verifyLicenseErrorValidationMessage = (invalidLicense, errorMessage) => {
    this.enterLicenseNumber(invalidLicense);
    this.elements.validationError().should('contain', errorMessage);
  };

  selectPastIssueDateFromPicker(issueDate) {
    datePicker.selectPastDateFromPicker(issueDate);
  }

  selectExpirationDateFromPicker = (expirationDate) => {
    datePicker.selectFutureDateFromPicker(expirationDate);
  };

  clickSaveBtn = () => {
    this.elements.saveBtn().click();
  };

  saveLicenseMessage = (saveMessage) => {
    this.elements
      .saveLicenseMessage()
      .should('contain', saveMessage, { wait: 1000 });
  };

  addAttachment = (filePath) => {
    this.elements.addAttachmentsBtn().selectFile(filePath, { force: true });
    cy.wait(1000);
  };

  clickFinishBtn = () => {
    this.elements.finishBtn().click();
  };

  clickDeleteBtn = () => {
    this.elements.deleteBtn().click();
    this.elements.deleteConfirmBtn().click();
  };
}

module.exports = new Licenses_PO();
