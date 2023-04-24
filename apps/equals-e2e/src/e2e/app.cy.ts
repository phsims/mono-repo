import { getGreeting, getCards } from '../support/app.po';

describe('equals', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts',
      { fixture: 'mock-data.json' }
    ),
      cy.visit('/');
  });

  it('should display welcome message', () => {
    getGreeting().contains('Equals tech test');
  });

  it('should display cards', () => {
    getCards().should('have.length', 3);
  });

  it('should open a modal', () => {
     cy.get('[data-testid="456"]').should('be.visible')
    cy.get('[data-testid="456"]').click();
    cy.get('[data-testid="contact-modal-456"]').should('be.visible');
  });
});
