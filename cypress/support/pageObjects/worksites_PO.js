/// <reference types="cypress" />

class Worksites_PO {
  elements = {
    header: () => cy.get('#me-header'),
    addWorksiteBtn: () => cy.get('.me-add-button'),
  };

  navigateToWorksites = () => {
    cy.visit('https://web-dev.nursegrid.com/#/me/worksites');
    cy.url().should('include', 'me/worksites');
  };

  verifyHeaderText = (text) => {
    this.elements.header().should('contain', text);
  };

  clickAddWorksiteBtn = () => {
    this.elements.addWorksiteBtn().click({ force: true });
  };
}

module.exports = new Worksites_PO();
