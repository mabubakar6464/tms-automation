import TrucksPage from "../pages/trucksPage";

describe('Trucks Module Tests', () => {

  beforeEach(() => {
    cy.loginSession();
  });

  it('User can add a new truck', () => {
    cy.fixture('trucksData').then(data => {
      TrucksPage.goToTrucks();
      TrucksPage.clickAddTruck();
      TrucksPage.addTruckDetails(data.trucks[0]);
    });
    cy.get('.Toastify__toast', { timeout: 10000 })
      .should('exist')
      .and('contain', 'Truck record created successfully');
  });

});
