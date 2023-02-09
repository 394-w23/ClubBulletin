const numberOfJoinClubs = 2;
const numberOfSubscribedClubs = 0;
const numberOfAdminClubs = 0;

const clubs = ["Chicken fighting club", "ESport Robotics"];

describe("Test Manage Clubs Search Bar", () => {
  it("An unfilled search bar should display all clubs", () => {
    cy.visit("/manageclubs");

    // Search Bar should be empty
    cy.get("[data-cy=search-bar-input-field]").should("have.value", "");

    cy.get("[data-cy=club-card]").each((item, index, list) => {
      expect(list).to.have.length(numberOfJoinClubs);
      expect(Cypress.$(item).text()).contains(clubs[index]);
    });
  });

  // both test clubs have the letter "c" in them
  it("A search result of 'c' should display both clubs", () => {
    cy.visit("/manageclubs");

    // Search Bar should be empty
    cy.get("[data-cy=search-bar-input-field]").should("have.value", "");

    // type "c" into the Search Bar
    cy.get("[data-cy=search-bar-input-field]").type("c");

    cy.get("[data-cy=club-card]").each((item, index, list) => {
      expect(list).to.have.length(numberOfJoinClubs);
      expect(Cypress.$(item).text()).contains(clubs[index]);
    });
  });

  it("Searching the name of a club should display only that club", () => {
    cy.visit("/manageclubs");

    // Search Bar should be empty
    cy.get("[data-cy=search-bar-input-field]").should("have.value", "");
    cy.get("[data-cy=search-bar-input-field]").type(clubs[0]);

    cy.get("[data-cy=club-card]").each((item, index, list) => {
      expect(list).to.have.length(1);
      expect(Cypress.$(item).text()).contains(clubs[0]);
    });

    cy.get("[data-cy=search-bar-input-field]").clear();
    cy.get("[data-cy=search-bar-input-field]").type(clubs[1]);

    cy.get("[data-cy=club-card]").each((item, index, list) => {
      expect(list).to.have.length(1);
      expect(Cypress.$(item).text()).contains(clubs[1]);
    });
  });

  it("Searching the name of a non-existant club should display no clubs", () => {
    cy.visit("/manageclubs");

    // Search Bar should be empty
    cy.get("[data-cy=search-bar-input-field]").should("have.value", "");
    cy.get("[data-cy=search-bar-input-field]").type("Chess Club");

    cy.get("[data-cy=club-card").should("have.length", 0);
  });

  it("Deleting a search should return all the original results", () => {
    cy.visit("/manageclubs");

    // Search Bar should be empty
    cy.get("[data-cy=search-bar-input-field]").should("have.value", "");
    cy.get("[data-cy=club-card").should("have.length", 2);

    cy.get("[data-cy=search-bar-input-field]").type("Chess Club");
    cy.get("[data-cy=club-card").should("have.length", 0);

    cy.get("[data-cy=search-bar-input-field]").clear();

    cy.get("[data-cy=club-card]").each((item, index, list) => {
      expect(list).to.have.length(numberOfJoinClubs);
      expect(Cypress.$(item).text()).contains(clubs[index]);
    });
  });
});
