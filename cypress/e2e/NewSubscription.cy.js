const clubs = ["Chicken fighting club", "ESport Robotics"];
const numberOfJoinClubs = clubs.length;

describe("Test Subscribe to New Club", () => {
    it("Before subscribing to anything, all clubs should be in join", () => {
        cy.visit("/manageclubs");
        cy.get("[data-cy=club-card]").each((item, index, list) => {
            expect(list).to.have.length(numberOfJoinClubs);
            expect(Cypress.$(item).text()).contains(clubs[index]);
        });
    });

    it("Subscribe to club should move it to Subscribed Clubs", () => {
        cy.visit("/manageclubs");
        cy.get("[data-cy=subscribeButton").each((item, index, list) => {
            Cypress.$(item).click();
        });
        cy.get("[data-cy=club-card]").should("have.length", 0);
        cy.get("[data-cy=manageClubTab").eq(1).click();
        cy.get("[data-cy=club-card]").each((item, index, list) => {
            expect(list).to.have.length(numberOfJoinClubs);
            expect(Cypress.$(item).text()).contains(clubs[index]);
        });
        cy.get("[data-cy=subscribeButton").each((item, index, list) => {
            Cypress.$(item).click();
        });
        cy.get("[data-cy=manageClubTab").eq(0).click();
    });
});