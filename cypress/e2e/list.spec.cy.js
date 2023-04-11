import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

const addIndexButton = "[data-testid='addIndexButton']";
const addHeadButton = "[data-testid='addHeadButton']";
const addTailButton = "[data-testid='addTailButton']";
const deleteHeadButton = "[data-testid='deleteHeadButton']";
const deleteTailButton = "[data-testid='deleteTailButton']";
const deleteIndexButton = "[data-testid='deleteIndexButton']";

const textInput = "[data-testid='textInput']";
const indexInput = "[data-testid='indexInput']";

const circle = "[data-testid='circle']";
const smallCircle = "[data-testid='smallCircle']";

const defaultColor = "rgb(0, 50, 255)";
const changingColor = "rgb(210, 82, 225)";
const addingColor ="rgb(127, 224, 81)";
describe('list tests', () => {
	beforeEach(() => {
		cy.visit(`http://localhost:3000/list`);
	})

	it('Add head & tail buttons disabled if text input is empty', () => {
		cy.get(textInput).clear();
		cy.get(addHeadButton).should('be.disabled');
		cy.get(addTailButton).should('be.disabled');
	})

	it('Add index button disabled if index input is empty', () => {
		cy.get(indexInput).clear();
		cy.get(addIndexButton).should('be.disabled');
	})

	it('Default list OK', () => {
		cy.get(circle).eq(0).contains('0');
		cy.get(circle).eq(0).parent().contains('head');

		cy.get(circle).eq(1).contains('34');
		cy.get(circle).eq(2).contains('8');

		cy.get(circle).eq(3).contains('1');
		cy.get(circle).eq(3).parent().contains('tail');
	})

	it('Adding in head OK', () => {
		cy.get(textInput).type('13').should('have.value', '13');

		cy.get(circle).should('have.length', 4);

		cy.get(addHeadButton).click();

		cy.get(circle).eq(0).parent().find(smallCircle);
		cy.get(smallCircle).should('have.css', 'border-color', changingColor).contains('13');

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(circle).should('have.length', 5);
		cy.get(circle).eq(0).should('have.css', 'border-color', addingColor).contains('13');
		cy.get(circle).eq(0).parent().contains('head');

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('13');
	})

	it('Adding in tail OK', () => {
		cy.get(textInput).type('13').should('have.value', '13');

		cy.get(circle).should('have.length', 4);

		cy.get(addTailButton).click();

		cy.get(circle).eq(3).parent().find(smallCircle);
		cy.get(smallCircle).should('have.css', 'border-color', changingColor).contains('13');

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(circle).should('have.length', 5);
		cy.get(circle).eq(4).should('have.css', 'border-color', addingColor).contains('13');
		cy.get(circle).eq(4).parent().contains('tail');

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(circle).eq(4).should('have.css', 'border-color', defaultColor).contains('13');
	})

	it('Add text by index OK', () => {
		cy.get(textInput).type('13').should('have.value', '13');
		cy.get(indexInput).type('3').should('have.value', '3');

		cy.get(circle).should('have.length', 4);

		cy.get(addIndexButton).click();

		cy.get(circle).eq(0).parent().find(smallCircle);
		cy.get(smallCircle).should('have.css', 'border-color', changingColor).contains('13');

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(circle).eq(2).parent().find(smallCircle);
		cy.get(circle).eq(1).should('have.css', 'border-color', changingColor);

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(circle).eq(3).parent().find(smallCircle);
		cy.get(circle).eq(2).should('have.css', 'border-color', changingColor);

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(circle).should('have.length', 5);
		cy.get(circle).eq(3).should('have.css', 'border-color', addingColor).contains('13');

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor);
		cy.get(circle).eq(1).should('have.css', 'border-color', defaultColor);
		cy.get(circle).eq(2).should('have.css', 'border-color', defaultColor);
		cy.get(circle).eq(3).should('have.css', 'border-color', defaultColor).contains('13');
	})

	it('Deleting from head OK', () => {
		cy.get(circle).should('have.length', 4);

		cy.get(deleteHeadButton).click();

		cy.get(circle).eq(0).parent().find(smallCircle);
		cy.get(smallCircle).should('have.css', 'border-color', changingColor).contains('0');
		cy.get(circle).eq(0).children('p').first().should('not.have.value');
		cy.get(circle).eq(0).should('have.css', 'border-color', changingColor);

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(circle).should('have.length', 3);
		cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('34');
		cy.get(circle).eq(0).parent().contains('head');
	})

	it('Deleting from tail OK', () => {
		cy.get(circle).should('have.length', 4);

		cy.get(deleteTailButton).click();

		cy.get(circle).eq(3).parent().find(smallCircle);
		cy.get(smallCircle).should('have.css', 'border-color', changingColor).contains('1');
		cy.get(circle).eq(3).children('p').first().should('not.have.value');
		cy.get(circle).eq(3).should('have.css', 'border-color', changingColor);

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(circle).should('have.length', 3);
		cy.get(circle).eq(2).should('have.css', 'border-color', defaultColor).contains('8');
		cy.get(circle).eq(2).parent().contains('tail');
	})

	it('Deleting by index OK', () => {
		cy.get(indexInput).type('1').should('have.value', '1');

		cy.get(circle).should('have.length', 4);

		cy.get(deleteIndexButton).click();

		cy.get(circle).eq(0).should('have.css', 'border-color', changingColor);

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(circle).eq(1).should('have.css', 'border-color', changingColor);

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(circle).eq(1).parent().find(smallCircle);
		cy.get(smallCircle).should('have.css', 'border-color', changingColor).contains('34');
		cy.get(circle).eq(1).children('p').first().should('not.have.value');

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(circle).should('have.length', 3);
		cy.get(circle).eq(1).should('have.css', 'border-color', defaultColor).contains('8');
	})

});