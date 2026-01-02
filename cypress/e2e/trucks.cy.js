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
      TrucksPage.addTruckDetails(data.trucks[0]).then((createdUnitId) => {
        // Mock GET request endpoint /truck-profiles?search=...
        cy.intercept('GET', `/api/v0.0.2/truck-profiles/?*`, {
          statusCode: 200,
          body: {
            results: [{
              truckProfile: {
                unitId: createdUnitId,
                make: data.trucks[0].make,
                model: data.trucks[0].model,
                color: data.trucks[0].color
              }
            }]
          }
        });

        // Now when frontend fetches trucks, verify the newly created truck appears in the table
        cy.get(trucksSelectors.truckTable).contains(createdUnitId).should('exist');
      });
    });
  });


});