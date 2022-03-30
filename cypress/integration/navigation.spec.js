/* eslint-disable no-undef */
describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should click on the day of tuesday", () => {
    cy.get("li").eq(1)
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
