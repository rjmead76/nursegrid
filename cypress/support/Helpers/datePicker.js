/// <reference types="cypress" />

class DatePicker_Helper {
  elements = {
    issueDateField: () => cy.get('.issue-date-picker'),
    expirationDateField: () => cy.get('[name="expiration-date-picker"]'),
    issueDatePrevBtn: () =>
      cy.get(
        '.datepicker-days > .table-condensed > thead > :nth-child(2) > .prev'
      ),
    expirationDateNextBtn: () =>
      cy.get(
        '.datepicker-days > .table-condensed > thead > :nth-child(2) > .next'
      ),
    datePickerSwitch: () =>
      cy.get(
        '.datepicker-days > .table-condensed > thead > :nth-child(2) > .datepicker-switch'
      ),

    getDay: () =>
      cy
        .get('.datepicker-days > .table-condensed > tbody > tr > td')
        .not('[class="old day"]'),
  }; // end of Elements //----------------------------------------------------------------//

  selectPastDateFromPicker(issueDate) {
    let date = new Date();
    date.setDate(date.getDate() - issueDate);

    let pastYear = date.getFullYear();
    let pastMonth = date.toLocaleString('default', { month: 'long' });
    let pastDay = date.getDate();
    cy.log(
      `Past Year: ${pastYear}, Past Month: ${pastMonth}, Past Day: ${pastDay}`
    );

    this.elements.issueDateField().click();

    const selectMonthAndYear = () => {
      this.elements
        .datePickerSwitch()
        .then((currentDate) => {
          if (!currentDate.text().includes(pastYear)) {
            this.elements.issueDatePrevBtn().click();
            selectMonthAndYear();
          }
        })
        .then(() => {
          this.elements.datePickerSwitch().then((currentDate) => {
            if (!currentDate.text().includes(pastMonth)) {
              this.elements.issueDatePrevBtn().click();
              selectMonthAndYear();
            }
          });
        });
    };

    const selectPastDay = () => {
      this.elements.getDay().contains(pastDay).click();
    };

    selectMonthAndYear();
    selectPastDay();
  }

  selectFutureDateFromPicker = (futureDate) => {
    let date = new Date();
    date.setDate(date.getDate() + futureDate);

    let futureYear = date.getFullYear();
    let futureMonth = date.toLocaleString('default', { month: 'long' });
    let futureDay = date.getDate();
    cy.log(
      `Future Year: ${futureYear}, Future Month: ${futureMonth}, Future Day: ${futureDay}`
    );

    this.elements.expirationDateField().click();

    const selectMonthAndYear = () => {
      this.elements
        .datePickerSwitch()
        .then((currentDate) => {
          if (!currentDate.text().includes(futureYear)) {
            this.elements.expirationDateNextBtn().click();
            selectMonthAndYear();
          }
        })
        .then(() => {
          this.elements.datePickerSwitch().then((currentDate) => {
            if (!currentDate.text().includes(futureMonth)) {
              this.elements.expirationDateNextBtn().click();
              selectMonthAndYear();
            }
          });
        });
    };

    const selectFutureDay = () => {
      this.elements.getDay().contains(futureDay).click();
    };

    selectMonthAndYear();
    selectFutureDay();
  };
}

module.exports = new DatePicker_Helper();
