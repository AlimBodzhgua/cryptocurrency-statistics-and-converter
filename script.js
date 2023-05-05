import {showCoinDetails, showTokensList, showSearchResult} from '/src/blocks.js';
import {getCoinDetails, convertCoin} from '/src/api.js';
import {showCoins, clearModal, clearTable} from '/src/actions.js';

const body = document.querySelector('body');

export const table = document.querySelector('.coins-table');
export const tokensList = document.querySelector('.tokens-list');

const orderButtns = document.querySelectorAll('.order-btn');
const selectButtons = document.querySelectorAll('#selectBtn');
const closeButtons = document.querySelectorAll('.modal__close');

const converterBtn = document.querySelector('.converter-btn');
const swapBtn = document.querySelector('#swapButton');
const searchInput = document.querySelector('.search-input');

/*Modals*/
const modalDetails = document.querySelector('#modalDetails');
const modalConverter = document.querySelector('#modalConverter');
/*Converter*/
const convertBtn = document.querySelector('#convertButton');
const tokenFromBtn = document.querySelector('[data-select=from]');
const tokenToBtn = document.querySelector('[data-select=to]');
const input = document.querySelector('#valueField');
const resultField = document.querySelector('#resultField')


let coinsList = await showCoins();

orderButtns.forEach(button => {
	button.addEventListener('click', (event) => {
		event.preventDefault();
		const orderValue = event.target.dataset.order; 
		clearTable();
		showCoins(orderValue)
	})
})


searchInput.addEventListener('input', (event) => {
	const value = (event.target.value).toLowerCase();
	const keys = Object.keys(coinsList);
	const searchList = {};

	keys.forEach(key => {
		let {name, symbol} = coinsList[key];
		name = name.toLowerCase();
		symbol = symbol.toLowerCase();

		if (name.includes(value)) {
			searchList[key] = coinsList[key];
		} else if (symbol.includes(value)) {
			searchList[key] = coinsList[key];
		}
	})

	clearTable();

	if (!Object.keys(searchList).length) {
		showNotFound();
	} else {
		showSearchResult(searchList);
	}
})

table.addEventListener('click', async (event) => {
	const $target = event.target;
	if ($target.classList.contains('table__row')) {
		const id = $target.dataset.id;
		modalDetails.classList.add('active');
		body.classList.add('no-scroll');
		const coinData = await getCoinDetails(id);
		showCoinDetails(coinData);
	}
})

selectButtons.forEach(button => {
	button.addEventListener('click', (event) => {
		event.preventDefault();
		const type = event.target.dataset.select;
		showTokensList(coinsList, type)
	})
})

converterBtn.addEventListener('click', (event) => {
	event.preventDefault();
	modalConverter.classList.add('active');
	body.classList.add('no-scroll');
})

//Converter
tokensList.addEventListener('click', (event) => {
	const $target = event.target;
	if ($target.classList.contains('tokens__item')) {
		const targetHTML = $target.innerHTML;
		const value = $target.innerText;

		tokensList.style.transform = 'translateY(100%)';
		const type = tokensList.dataset.type;
		const button = document.querySelector(`[data-select=${type}]`);
		button.innerHTML = ''
		button.innerHTML = targetHTML;

	}
})

input.addEventListener('input', (event) => {
	const allowedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
	const allowedKeys = [null, '.']

	if (!allowedNumbers.includes(parseFloat(event.data)) && !allowedKeys.includes(event.data)) {
		input.value = (input.value).slice(0, (input.value).length - 1);
		alert('You can enter only numbers with dot');
	}
})

swapBtn.addEventListener('click', (event) => {
	event.preventDefault();
	const tokenFromValue = tokenFromBtn.innerHTML;
	const tokenToValue = tokenToBtn.innerHTML;

	tokenFromBtn.innerHTML = tokenToValue;
	tokenToBtn.innerHTML = tokenFromValue;
})

convertBtn.addEventListener('click', async (event) => {
	event.preventDefault();
	const value = parseFloat(input.value);
	const tokenFrom = tokenFromBtn.querySelector('div').innerText;
	const tokenTo = tokenToBtn.querySelector('div').innerText;

	const result = await convertCoin(tokenFrom, tokenTo, value);
	resultField.value = result;
})

closeButtons.forEach(button => {
	button.addEventListener('click', (event) => {
		event.preventDefault();
		const $target = event.target;
		const modal = $target.closest('.modal');

		if ($target.dataset.type === 'details') {
			modal.classList.remove('active');
			body.classList.remove('no-scroll');
			clearModal();
		} else if ($target.dataset.type === 'converter') {
			modal.classList.remove('active');
			body.classList.remove('no-scroll');
		}
	})
})



/*export const API_KEY = 'coinranking2eb56d200a0d6048867e2e0f8fd62263c88205177c531252';
*/