/// <reference types="cypress" />

class Profile_PO {
  elements = {
    header: () => cy.get('#me-header'),
    fname: () => cy.get('#firstName'),
    lname: () => cy.get('#lastName'),
    position: () => cy.get('[name="position"]'),
    profilePrivacy: () => cy.get('[ng-model="isProfilePrivate"]'),
    emailAddress1: () => cy.get('#email-0'),
    emailAddress2: () => cy.get('#email-1'),
    mobileNum1: () => cy.get('#phone-0'),
    mobileNum2: () => cy.get('#phone-1'),
    saveBtn: () => cy.get('.me-save-button'),
  };

  navigateToProfile = () => {
    cy.visit('https://web-dev.nursegrid.com/#/me/edit-profile');
    cy.url().should('include', 'me/edit-profile');
  };

  verifyHeaderText = (text) => {
    this.elements.header().should('contain', text);
  };

  saveProfile = () => {
    this.elements.saveBtn().click();
  };

  clickToHideProfile = () => {
    this.elements.profilePrivacy().click({ force: true });
    this.elements.profilePrivacy().should('have.class', 'ng-not-empty');
  };

  clickToUnhideProfile = () => {
    this.elements.profilePrivacy().click({ force: true });
    this.elements.profilePrivacy().should('have.class', 'ng-not-empty');
  };

  editFirstName = (firstName) => {
    this.elements.fname().clear().type(firstName);
  };

  editLastName = (lastName) => {
    this.elements.lname().clear().type(lastName);
  };

  editPosition = (position) => {
    this.elements.position().select(position);
  };

  editEmailAddress1 = (emailAddress1) => {
    this.elements.emailAddress1().clear().type(emailAddress1);
  };

  editEmailAddress2 = (emailAddress2) => {
    this.elements.emailAddress2().clear().type(emailAddress2);
  };

  editMobileNum1 = (mobileNum) => {
    this.elements.mobileNum1().clear().type(mobileNum);
  };

  editMobileNum2 = (mobileNum) => {
    this.elements.mobileNum2().clear().type(mobileNum);
  };
}

module.exports = new Profile_PO();
