/// <reference types="cypress" />

import certifications_PO from '../support/pageObjects/certifications_PO';

var certification = {
  headerText: 'Add Certification',
  pastIssueDateNumberOfDays: 90,
  expirationDateNumberOfDays: 90,
  certificationName: 'BLS Instructor - BLS Instructor',
  certificationGoverningBody: 'American Red Cross',
  certificationNumber: 'RJM2342',
  certificationSavedMessage: 'Certification was saved successfully',
};

describe('Should be able to create and delete a certification', () => {
  beforeEach('login to the app', () => {
    cy.loginToApplication();
  });

  it('Should be possible to successfully create a certification with an attachment and delete it', () => {
    certifications_PO.navigateToCertifications();
    certifications_PO.navigateToAddCertification();
    certifications_PO.verifyHeaderText(certification.headerText);
    certifications_PO.clickSelectCertificationBtn();
    certifications_PO.selectCertification(
      certification.certificationName,
      certification.certificationGoverningBody
    );
    certifications_PO.clickNextStepBtn();
    certifications_PO.enterCertificationNumber(
      certification.certificationNumber
    );
    certifications_PO.clickNextStepBtn();
    certifications_PO.selectPastIssueDateFromPicker(
      certification.pastIssueDateNumberOfDays
    );
    certifications_PO.selectExpirationDateFromPicker(
      certification.expirationDateNumberOfDays
    );
    certifications_PO.clickSaveBtn();
    certifications_PO.saveCertificationMessage(
      certification.certificationSavedMessage
    );
  });
});
