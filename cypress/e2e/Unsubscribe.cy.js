const numberOfJoinClubs = 2;
const numberOfSubscribedClubs = 0;
const numberOfAdminClubs = 0;

const clubs = ["Chicken fighting club", "ESport Robotics"];


describe("Test Manage Clubs Unsubscribing", () => {
    it("Before unsubscribing to anything, all clubs should be in subscribed clubs. However, it should start with 0 subscribed clubs.", () => {
        cy.visit("/manageclubs");
        cy.get("[data-cy=club-card]").each((item, index, list) => {
            expect(list).to.have.length(numberOfJoinClubs);
            expect(Cypress.$(item).text()).contains(clubs[index]);
        });
        cy.get("[data-cy=subscribeButton").each((item, index, list) => {
            Cypress.$(item).click();
        });
        cy.get("[data-cy=club-card]").should("have.length", 0);


        cy.get("[data-cy=manageClubTab").eq(1).click();
        // cy.get("[data-cy=club-card]").each((item, index, list) => {
        //     expect(list).to.have.length(numberOfJoinClubs);
        //     expect(Cypress.$(item).text()).contains(clubs[index]);
        // });
    });
    it("After unsubscribing from clubs, all clubs should be gone from the list.", () => {
        cy.visit("/manageclubs");
        cy.get("[data-cy=manageClubTab").eq(1).click();
        cy.get("[data-cy=subscribeButton").each((item, index, list) => {
            Cypress.$(item).click();
        });
        cy.get("[data-cy=club-card]").should("have.length", 0);
        cy.get("[data-cy=notSubscribed]").contains("You aren't subscribed to any clubs yet!");
    })
    it("After unsubscribing from a single club, it should no longer appear in the Feed.", () => {
        cy.visit("/manageclubs");
        cy.get("[data-cy=subscribeButton").eq(0).click();
        cy.visit("/");
        cy.get("[data-cy=clubSelection").each((item, index, list) => {
            expect(list).to.have.length(numberOfJoinClubs);
        })

    })
    it("reset the tests.", () => {
        cy.visit("/manageclubs");
        cy.get("[data-cy=manageClubTab").eq(1).click();
        cy.get("[data-cy=subscribeButton").each((item, index, list) => {
            Cypress.$(item).click();
        });
    })
  });
  