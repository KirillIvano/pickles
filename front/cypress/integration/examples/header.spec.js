/// <reference types="cypress" />


describe('', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/cart');
    });

    it(
        'При нажатии на лого происходит редирект',
        () => {
            cy.get('[data-e2e=header__logo]').click();

            cy.url().should('include', '/catalog');
        },
    );
});

