import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

const addButton = "[data-testid='addToQueueButton']";
const deleteButton = "[data-testid='deleteFromQueueButton']";
const clearButton = "[data-testid='clearQueueButton']";

const defaultColor = "rgb(0, 50, 255)";
const changingColor = "rgb(210, 82, 225)";

const circle = "[data-testid='circle']";
describe('queue tests', () => {
	beforeEach(() => {
		cy.visit(`http://localhost:3000/queue`);
	})

	it('Add button disabled if input is empty', () => {
		cy.get('input').clear();
		cy.get(addButton).should('be.disabled');
	})

	it('Add element to queue', () => {
		cy.get('input').type('1').should('have.value', '1');
		cy.get(addButton).click();

		cy.get(circle).eq(0).should('have.css', 'border-color', changingColor).contains('1');
		cy.get(circle).eq(0).parent().contains('head');
		cy.get(circle).eq(0).parent().contains('tail');

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('1');

		cy.get('input').type('2').should('have.value', '2');
		cy.get(addButton).click();

		cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('1');
		cy.get(circle).eq(1).should('have.css', 'border-color', changingColor).contains('2');
		cy.get(circle).eq(1).parent().contains('tail');

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('1');
		cy.get(circle).eq(1).should('have.css', 'border-color', defaultColor).contains('2');
	})

	it('Delete element from queue', () => {

		cy.get('input').type('1').should('have.value', '1');
		cy.get(addButton).click();

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get('input').type('2').should('have.value', '2');
		cy.get(addButton).click();

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(deleteButton).click();

		cy.get(circle).eq(0).should('have.css', 'border-color', changingColor).contains('1');
		cy.get(circle).eq(1).should('have.css', 'border-color', defaultColor).contains('2');

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor);
		cy.get(circle).eq(0).children('p').first().should('not.have.value');
		cy.get(circle).eq(1).should('have.css', 'border-color', defaultColor).contains('2');
		cy.get(circle).eq(1).parent().contains('head');
		cy.get(circle).eq(1).parent().contains('tail');
	})

	it('Clear queue', () => {
		cy.get('input').type('1').should('have.value', '1');
		cy.get(addButton).click();

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get('input').type('2').should('have.value', '2');
		cy.get(addButton).click();

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(clearButton).click();

		cy.get(circle).eq(0).children('p').first().should('not.have.value');
		cy.get(circle).eq(1).children('p').first().should('not.have.value');
	})
});