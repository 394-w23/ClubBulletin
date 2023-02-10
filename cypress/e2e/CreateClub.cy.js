describe("Create a club", () => {
  it("Opens the create club modal when the create club button is pressed", () => {
    cy.visit("/manageclubs");
    cy.get("[data-cy=addClubButton]").click();
    cy.get("[data-cy=createClubModalHeader]").should("exist");
  })
  it('Displays an error message if the form is submitted with no fields filled out', () => {
    cy.visit("/manageclubs");
    cy.get("[data-cy=addClubButton]").click();
    cy.get("[data-cy=submitNewClub]").click();
    cy.get("[data-cy=createClubError]").should("exist");
  })
})