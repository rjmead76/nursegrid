/// <reference types="cypress" />

import datePicker from '../Helpers/datePicker';

class Certifications_PO {
  elements = {
    header: () => cy.get('h3.ng-binding'),
    nextStep: () => cy.get('.next-button'),
    saveBtn: () => cy.get('.save-button'),
    saveCertificationMessage: () => cy.get('.save-certification-message'),
    certificationsUrl: 'https://web-dev.nursegrid.com/#/me/certifications',
    addCertificationUrl: 'https://web-dev.nursegrid.com/#/certifications/add',
    selectCertificationBtn: () =>
      cy.get('div[ng-click="goToSelectCertification()"]'),
    getAllCertifications: () => cy.get('h3.ng-binding'),
    certificationNumField: () => cy.get('.certification-number-input'),
    addAttachmentsBtn: () => cy.get('input[type=file]'),
    finishBtn: () => cy.get('button[class="upload-button"]'),
    deleteBtn: () => cy.get('.me-delete-button'),
    deleteConfirmBtn: () => cy.get('.vex-dialog-button-primary'),
  }; // end of Elements //----------------------------------------------------------------//

  clickNextStepBtn = () => {
    cy.wait(2000);
    this.elements.nextStep().click();
  };

  navigateToCertifications = () => {
    cy.visit(this.elements.certificationsUrl);
    cy.url().should('include', '/me/certifications');
  };

  navigateToAddCertification = () => {
    cy.visit(this.elements.addCertificationUrl);
    cy.url().should('include', '/certifications/add');
  };

  verifyHeaderText = (headerText) => {
    this.elements.header().should('contain', headerText);
  };

  clickSelectCertificationBtn = () => {
    this.elements.selectCertificationBtn().click({ force: true });
  };

  selectCertification = (certification, governingBody) => {
    cy.wait(4000);
    this.elements.getAllCertifications().each(($el, index, $list) => {
      if ($el.text().includes(certification)) {
        if ($el.next().text().includes(governingBody)) {
          cy.wrap($el).click({ force: true });
        }
      }
    });
  };

  enterCertificationNumber = (certificationNumber) => {
    this.elements.certificationNumField().type(certificationNumber);
    this.elements
      .certificationNumField()
      .should('have.value', certificationNumber);
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

  saveCertificationMessage = (saveMessage) => {
    this.elements
      .saveCertificationMessage()
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

module.exports = new Certifications_PO();
