/// <reference types="cypress" />

import certifications_PO from '../support/pageObjects/certifications_PO';

var certification = {
  headerText: 'Add Certification',
  pastIssueDateNumberOfDays: 90,
  expirationDateNumberOfDays: 90,
  certificationName: 'BLS Instructor',
  certificationAcronym: 'BLS Instructor',
  certificationGoverningBody: 'American Red Cross',
  certificationNumber: 'RJM2342',
  certificationSavedMessage: 'Certification was saved successfully',
  attachmentFilePath: './cypress/fixtures/certificationAttachment.jpg',
  attachmentFileName: 'certificationAttachment.jpg',
};

describe('Should be able to create and delete a certification', () => {
  beforeEach('login to the app', () => {
    cy.loginToApplication();
  });

  let userId = '';
  let userCertificationId = '';
  let certificationId = '';

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
    certifications_PO.addAttachment(certification.attachmentFilePath);

    cy.intercept({
      method: 'GET',
      url: '**/certifications/*',
    }).as('getCertification');

    certifications_PO.clickFinishBtn();

    cy.wait('@getCertification').then(({ request, response }) => {
      userId = response.body.payload.userId;
      userCertificationId = response.body.payload.userCertificationId;
      certificationId = response.body.payload.certification.certificationId;

      expect(response.statusCode).to.equal(200);
      expect(response.body.error).to.equal(false);
      expect(response.body.message).to.equal('Success');
      expect(response.body.payload.certificationNumber).to.equal(
        certification.certificationNumber
      );
      expect(response.body.payload.certification.name).to.equal(
        certification.certificationName
      );
      expect(response.body.payload.certificationBody.name).to.equal(
        certification.certificationGoverningBody
      );
      expect(response.body.payload.userFiles[0].userId).to.equal(userId);

      expect(response.body.payload.userFiles[0].userCertificationId).to.equal(
        userCertificationId
      );
      expect(response.body.payload.userFiles[0].userFilename).to.equal(
        certification.attachmentFileName
      );
    });

    // Intercept Certification delete
    cy.intercept({
      method: 'DELETE',
      url: `**${userId}/certifications/*`,
    }).as('deleteCertification');

    // Delete the created certification
    certifications_PO.clickDeleteBtn();

    cy.wait('@deleteCertification').then(({ request, response }) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.error).to.equal(false);
      expect(response.body.message).to.equal('Success');
      expect(request.url).to.contain(`${userCertificationId}`);
    });
  });
});
