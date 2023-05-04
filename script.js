import {KEY} from './key.js';
import {
	body,
	table, 
	toCoinsTable,
	clearTable,
	showNotFound,
	showSearchResult,
	showCoinDetails,
	tokensList,
	showTokensList,
} from './look/view.js';

let coinsList = {};

const orderButtns = document.querySelectorAll('.order-btn');
const selectButtons = document.querySelectorAll('#selectBtn');
const searchInput = document.querySelector('.search-input');
const converterBtn = document.querySelector('.converter-btn');
const modal = document.querySelector('.modal');
const swapBtn = document.querySelector('#swapButton');

const options = {
 	headers: {
    	'Content-Type': 'application/json',
    	'x-access-token': KEY,
	},
};

const getCoins = async (order = 'marketCap', limit = 30) => {
	const url = `https://api.coinranking.com/v2/coins?orderBy=${order}&limit=${limit}&tags`;

	try {
		const response = await fetch(url, options);
		const json = await response.json();
		const coins = await json.data.coins;
		return coins;
	} catch(error) {
		throw new Error('Error getting coins', error);
	}
}

const getCoinPrice = async (uuid) => {
	const url = `https://api.coinranking.com/v2/coin/wsogvtv82FCd/price`
	try {
		const response = await fetch(url, options);
	} catch (error) {
		throw new Error('Error getting coin price', error);
	}
}

const getCoinDetails = async (uuid) => {
	const url = `https://api.coinranking.com/v2/coin/${uuid}`;
	try {
		const response = await fetch(url, options);
		const json = await response.json();
		return json.data.coin;
	} catch (error) {
		throw new Error('Error getting coin details', error);
	}
}


const convertCoin = async (tokenFrom, tokenTo, amount) => {
	const url = `https://api.coinconvert.net/convert/${tokenFrom}/${tokenTo}?amount=${amount}`;
	console.log(url);
	try {
		const response = await fetch(url);
		const json = await response.json();
		if (json.status === 'success') {
			return json[tokenTo];
		}
		console.log(json);
	} catch (error) {
		throw new Error('Error converting coins', error);
	}
}

const showCoins = async (order) => {
	const coins = await getCoins(order)
	const keys = await Object.keys(coins);
	coinsList = coins;

	const tableFulled = new Promise((resolve, reject) => {
		setTimeout(() => {
			keys.forEach(key => {
				toCoinsTable(coins[key], key);
			})
			resolve();
		}, 1000) 
	})
	
	tableFulled.then(() => {
		table.style.transform = 'scale(1)'
	});
}


orderButtns.forEach(button => {
	button.addEventListener('click', (event) => {
		event.preventDefault();
		const orderValue = event.target.dataset.order; 
		clearTable();
		showCoins(orderValue)
	})
})

showCoins();

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
	console.log($target.classList);
	if ($target.classList.contains('table__row')) {
		const id = $target.dataset.id;
		modal.classList.add('active');
		body.classList.add('no-scroll');
		const coinData = await getCoinDetails(id);
		showCoinDetails(coinData, modal);
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
	modal.classList.add('active');
	body.classList.add('no-scroll');
})


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

const input = document.querySelector('#valueField');
const resultField = document.querySelector('#resultField')

input.addEventListener('input', (event) => {
	const allowedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
	const allowedKeys = [null, '.']

	if (!allowedNumbers.includes(parseFloat(event.data)) && !allowedKeys.includes(event.data)) {
		input.value = (input.value).slice(0, (input.value).length - 1);
		alert('You can enter only numbers with dot');
	}
})

const tokenFromBtn = document.querySelector('[data-select=from]');
const tokenToBtn = document.querySelector('[data-select=to]');


swapBtn.addEventListener('click', (event) => {
	event.preventDefault();
	const tokenFromValue = tokenFromBtn.innerHTML;

	const tokenToValue = tokenToBtn.innerHTML;

	tokenFrom.innerHTML = tokenToValue;
	tokenTo.innerHTML = tokenFromValue;
})

const convertBtn = document.querySelector('#convertButton');

convertBtn.addEventListener('click', async (event) => {
	event.preventDefault();
	const value = parseFloat(input.value);
	const tokenFrom = tokenFromBtn.querySelector('div').innerText;
	const tokenTo = tokenToBtn.querySelector('div').innerText;
	const result = await convertCoin(tokenFrom, tokenTo, value);
	resultField.value = result;
})
