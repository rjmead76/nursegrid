/// <reference types="cypress" />

import licenses_PO from '../support/pageObjects/licenses_PO';

var license = {
  headerText: 'Add License',
  pastIssueDateNumberOfDays: 50,
  expirationDateNumberOfDays: 30,
  license: 'Anesthesiologist Assistant',
  state: 'Wisconsin',
  licenseNumber: 'RJM2342',
  licenseNumberThrowError: '123',
  licenseNumberMessage:
    'Must be at least five characters (numbers and/or letters).',
  licenseSavedMessage: 'Credential was saved successfully',
  attachmentFilePath: './cypress/fixtures/licenseAttachment.jpg',
  attachmentFileName: 'licenseAttachment.jpg',
};

describe('Should be able to create and delete a license', () => {
  beforeEach('login to the app', () => {
    cy.loginToApplication();
  });

  let userId = '';
  let userLicenseId = '';
  let userFilesId = '';

  it('Should be possible to successfully create a license with an attachment and delete it', () => {
    licenses_PO.navigateToLicenses();
    licenses_PO.navigateToAddLicense();
    licenses_PO.VerifyHeaderText(license.headerText);
    licenses_PO.clickSelectLicenseBtn();
    licenses_PO.selectLicense(license.license);
    licenses_PO.clickSelectStateBtn();
    licenses_PO.selectState(license.state);
    licenses_PO.clickNextStepBtn();
    licenses_PO.verifyLicenseErrorValidationMessage(
      license.licenseNumberThrowError,
      license.licenseNumberMessage
    );
    licenses_PO.enterLicenseNumber(license.licenseNumber);
    licenses_PO.clickNextStepBtn();
    licenses_PO.selectPastIssueDateFromPicker(
      license.pastIssueDateNumberOfDays
    );
    licenses_PO.selectExpirationDateFromPicker(
      license.expirationDateNumberOfDays
    );
    licenses_PO.clickSaveBtn();
    licenses_PO.saveLicenseMessage(license.licenseSavedMessage);
    licenses_PO.addAttachment(license.attachmentFilePath);

    cy.intercept({
      method: 'GET',
      url: '**/licenses/*',
    }).as('getLicense');

    licenses_PO.clickFinishBtn();

    cy.wait('@getLicense').then(({ request, response }) => {
      userId = response.body.payload.userId;
      userLicenseId = response.body.payload.userLicenseId;

      expect(response.statusCode).to.equal(200);
      expect(response.body.error).to.equal(false);
      expect(response.body.payload.state).to.equal(license.state);
      expect(response.body.payload.stateLicenseNumber).to.equal(
        license.licenseNumber
      );
      expect(response.body.payload.license.name).to.equal(license.license);
      expect(response.body.payload.license.acronym).to.equal('Anest Asst');
      expect(response.body.payload.userFiles[0].userId).to.equal(userId);
      expect(response.body.payload.userFiles[0].userFilename).to.equal(
        license.attachmentFileName
      );
    });

    // Delete the created license
    cy.intercept({
      method: 'DELETE',
      url: `**${userId}/licenses/*`,
    }).as('deleteLicense');

    licenses_PO.clickDeleteBtn();

    cy.wait('@deleteLicense').then(({ request, response }) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.error).to.equal(false);
      expect(response.body.message).to.equal('Success');
      expect(request.url).to.contain(`${userLicenseId}`);
    });
  });
});
