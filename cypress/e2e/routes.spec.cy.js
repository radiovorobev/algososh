describe('Тесты роутинга', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	})

	it('Главная страница', () => {
		cy.contains('МБОУ АЛГОСОШ');
	})

	it('Страница строки', () => {
		cy.get('a[href*="/recursion"]').click();
		cy.contains('Строка');
	})

	it('Страница Фибоначчи', () => {
		cy.get('a[href*="/fibonacci"]').click();
		cy.contains('Последовательность Фибоначчи');
	})

	it('Страница сортировки массива', () => {
		cy.get('a[href*="/sorting"]').click();
		cy.contains('Сортировка массива');
	})

	it('Страница стека', () => {
		cy.get('a[href*="/stack"]').click();
		cy.contains('Стек');
	})

	it('Страница очереди', () => {
		cy.get('a[href*="/queue"]').click();
		cy.contains('Очередь');
	})

	it('Страница списка', () => {
		cy.get('a[href*="/list"]').click();
		cy.contains('Связный список');
	})
})