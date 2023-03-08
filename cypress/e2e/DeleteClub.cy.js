const numberOfJoinClubs = 2;
const numberOfAdminClubs = 2;

const clubs = ["Chicken fighting club", "ESport Robotics"];

describe('Test Delete Clubs', () => {

    it('Each admin club should have a delete button', () => {
        cy.visit('/manageclubs');
        cy.get("[data-cy=manageClubTab]").eq(2).click();
        cy.get("[data-cy=delete-button]").each((item, index, list) => {
            expect(list).to.have.length(numberOfAdminClubs);
        });;
    });

    it('Delete club button opens modal', () => {
        cy.visit('/manageclubs');
        cy.get("[data-cy=manageClubTab]").eq(2).click();
        cy.get("[data-cy=delete-button]").eq(0).click();       
        cy.get("[data-cy=delete-confirmation]").should("contain", "Are you sure?");
    });

    it('Deleting club without good confirmation gives failure alert', () => {
        cy.visit('/manageclubs');
        cy.get("[data-cy=manageClubTab]").eq(2).click();
        cy.get("[data-cy=delete-button]").eq(0).click();
        cy.get("[data-cy=confirmationField]").click().type('not chicken fighting club');
        cy.get("[data-cy=confirmButton]").click();
        cy.get("[data-cy=deleteFail]").should('contain', "Club deletion failed. Please confirm the club you're deleting.");
        
    });

    // it('Deleting club with good confirmation gives success alert and removes club from ', () => {
    //     cy.visit('/manageclubs');
    //     cy.get("[data-cy=manageClubTab]").eq(2).click();
    //     cy.get("[data-cy=delete-button]").eq(0).click();
    //     cy.get("[data-cy=confirmationField]").click().type('Chicken fighting club');
    //     cy.get("[data-cy=confirmButton]").click();
    //     cy.get("[data-cy=deleteSuccess]").should('contain', "Club was successfully deleted!");

    //     cy.visit('/manageclub');
    //     cy.get("[data-cy=club-card]").each((item, index, list) => {
    //         expect(list).to.have.length(numberOfJoinClubs - 1);
    //     });
    // });
});  