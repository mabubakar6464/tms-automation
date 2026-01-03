import trucksSelectors from "../selectors/trucksPage.selectors.js";
class TrucksPage {
    navigateToHoldingLevel() {
        cy.get(trucksSelectors.companyLogo).click();
        cy.get(trucksSelectors.selectIndicator).then($btn => {
            if ($btn.text().trim() === 'SET') {
                cy.get(trucksSelectors.closeIcon).click();
            }
            else {
                cy.get(trucksSelectors.selectHolding).click({ force: true });
            }
        });
    }
    goToTrucks() {
        cy.visit('/truck', { failOnStatusCode: false });
        cy.url({ timeout: 10000 }).should('include', '/truck');
    }

    clickAddTruck() {
        cy.get(trucksSelectors.addTruckButton).click();
    }

    enterUnitId(unitId) {
        cy.get(trucksSelectors.unitIDInput).type(unitId);
    }

    enterMake(make) {
        cy.get(trucksSelectors.makeInput).type(make);
    }
    enterModel(model) {
        cy.get(trucksSelectors.modelInput).type(model);
    }
    enterColor(color) {
        cy.get(trucksSelectors.colorInput).type(color);
    }
    enterNtlAndPD(ntlAndPd) {
        cy.get(trucksSelectors.ntlAndPDInput)
            .scrollIntoView()
            .should('be.visible')
            .clear()
            .type(ntlAndPd);
    }
    enterVendor(vendor) {
        cy.get(trucksSelectors.vendorInput).type(vendor);

    }
    selectEngine(engine) {
        cy.get(trucksSelectors.engineInput).click();
    }
    enterVin(vin) {
        cy.get(trucksSelectors.vinInput).type(vin);
    }
    enterLastInspectionDate(date) {
        cy.get(trucksSelectors.lastInspectionDateInput).type(date);
    }
    enterIftaAddDate(date) {
        cy.get(trucksSelectors.iftaAddDateInput).type(date);
    }
    enterIftaDecal(decal) {
        cy.get(trucksSelectors.iftaDecalInput).type(decal);
    }
    enterPlates(plates) {
        cy.get(trucksSelectors.platesInput).type(plates);
    }

    selectRandomOption(selector) {
        cy.get(selector).click();
        cy.get('ul:visible li:visible').then($options => {
            const index = Math.floor(Math.random() * $options.length);
            cy.wrap($options).eq(index).click();
        });
    }

    selectActivestatus(selector) {
        cy.get(selector).click();
        cy.get('ul:visible li:visible').contains('Active').click();
    }

    generateUniqueUnitId() {
        const random = Math.floor(1000 + Math.random() * 9000);
        return `Truck-UNIT-${random}`;
    }

    generateRandomVIN() {
        const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789'; // no I, O, Q
        let vin = '';
        for (let i = 0; i < 17; i++) {
            const index = Math.floor(Math.random() * chars.length);
            vin += chars[index];
        }
        return vin;
    }

    generatePlateNumber() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            const index = Math.floor(Math.random() * chars.length);
            result += chars[index];
        }
        return result;
    }



    addTruckDetails(data) {
        const unitId = this.generateUniqueUnitId();
        this.enterUnitId(unitId);
        this.selectRandomOption(trucksSelectors.typeInput);
        this.enterMake(data.make);
        this.enterModel(data.model);
        this.selectRandomOption(trucksSelectors.yearInput);
        this.enterColor(data.color);
        this.selectRandomOption(trucksSelectors.transmissionInput);
        this.enterNtlAndPD(data.ntlAndPd);
        this.selectActivestatus(trucksSelectors.statusInput);
        this.enterVendor(data.vendor);
        this.selectRandomOption(trucksSelectors.engineInput);
        this.enterVin(this.generateRandomVIN());
        this.enterLastInspectionDate(data.lastInspectionDt);
        this.enterIftaAddDate(data.companyIftaAdd);
        this.enterIftaDecal(data.iftaDecal);
        //this.enterPlates(this.generatePlateNumber());
        //this.selectRandomOption(trucksSelectors.platesStateInput);

        if (data.deerGuard == true) {
            cy.get(trucksSelectors.deerGuardButton).click();
        }
        if (data.killSwitch == true) {
            cy.get(trucksSelectors.killSwitchButton).click();
        }
        if (data.headacheRack == true) {
            cy.get(trucksSelectors.headacheRackButton).click();
        }

        cy.get(trucksSelectors.saveButton).click();

        return cy.get(trucksSelectors.successToast, { timeout: 10000 })
            .should('exist')
            .and('contain', 'Truck record created successfully')
            .then(() => unitId);
    }

}
export default new TrucksPage();