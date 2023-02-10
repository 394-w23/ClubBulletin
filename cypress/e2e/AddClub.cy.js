const clubs = ["New Club for Cypress Test"];

describe("Test Adding a New Club", () => {
    it("Before adding a club, admin clubs should be empty", () => {
        cy.visit("/manageclubs");
        cy.get("[data-cy=manageClubTab]").eq(2).click();
        cy.get("[data-cy=club-card]").should("have.length", 0);
    });

    it("Adding a new club should add it to admin clubs", () => {
        cy.visit("/manageclubs");
        cy.get("[data-cy=addClubButton]").click();
        cy.get("[data-cy=newClubForm]")
        cy.get("[data-cy=clubName]").type("New Club for Cypress Test");
        cy.get("[data-cy=clubDescription]").type("New Club for Cypress Test Description");
        cy.get("[data-cy=clubPic]").selectFile('./TestImage.png'); 
        cy.get("[data-cy=submitNewClub]").click();
        cy.get("[data-cy=manageClubTab]").eq(2).click();
        cy.get("[data-cy=club-card]").each((item, index, list) => {
            expect(list).to.have.length(1);
            expect(Cypress.$(item).text()).contains(clubs[index]);
        });
    });
});