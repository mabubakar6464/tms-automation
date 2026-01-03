import TrucksPage from "../pages/trucksPage";
import trucksSelectors from "../selectors/trucksPage.selectors.js";

describe('Trucks Module Tests', () => {

  beforeEach(() => {
    cy.loginSession();
  });

  it('User can add a new truck', () => {
    cy.fixture('trucksData').then(data => {
      TrucksPage.goToTrucks();
      TrucksPage.clickAddTruck();
      cy.intercept('GET', '**/api/v0.0.2/truck-profiles/**').as('getTrucks');
      TrucksPage.addTruckDetails(data.trucks[0]).then((createdUnitId) => {
        // Verify via backend API that the truck was created
        cy.verifyTruckInBackend(createdUnitId);
        // verify the newly created truck in the table
        cy.get(trucksSelectors.truckTable).contains(createdUnitId).should('exist');
      });
    });
  });


});