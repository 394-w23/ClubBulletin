describe ('Test App', () => {
    it ('opens with page title', () => {
      cy.visit ('/');
      cy.get('[currPost]').should('contain', 'like');
    });
});  