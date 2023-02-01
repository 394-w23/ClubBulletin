/* globals cy */
    
describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/login');
    });
  
    it ('opens with page title', () => {
      cy.visit ('/');
      cy.get('[data-cy=pageTitle]').should('contain', 'Your Feed');
    });

    it("manage button shows manage clubs page", () => {
      cy.visit("/");
      cy.get("[data-cy=Manage]").click();
      cy.get("[data-cy=manageClubs]").should("contain", "Manage Clubs");
    });
    it("empty feed shows message and link to join clubs", () => {
      cy.visit("/");
      cy.get("[data-cy=noSubMsg]").click();
      cy.get("[data-cy=noSubMsg]").should("contain", "You haven't joined any club feeds yet! Go to");
      cy.get("[data-cy=noSubLink]").should("have.attr", "href", "/manageclubs");
  });
});  