import {KEY} from './key.js';
import {
	list, 
	toCoinsList,
	clearList,
	showNotFound,
	showSearchResult
} from './look/view.js';

let coinsList = {};

const orderButtns = document.querySelectorAll('.order-btn');
const searchInput = document.querySelector('.search-input');

const options = {
 	headers: {
    	'Content-Type': 'application/json',
    	'x-access-token': 'coinranking2eb56d200a0d6048867e2e0f8fd62263c88205177c531252',
	},
};


const getCoins = async (order = 'marketCap', limit = 30) => {
	const url = `https://api.coinranking.com/v2/coins?orderBy=${order}&limit=${limit}`;

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
	const url = `https://api.coinranking.com/v2/coin/${uuid}/price`
	try {
		const response = await fetch(url, options);
	} catch (error) {
		throw new Error('Error getting coin price', error);
	}
}


const showCoins = async (order) => {
	const coins = await getCoins(order)
	const keys = await Object.keys(coins);
	coinsList = coins;

	const listFulled = new Promise((resolve, reject) => {
		setTimeout(() => {
			keys.forEach(key => {
				toCoinsList(coins[key]);
			})
			resolve();
		}, 1000) 
	})
	
	listFulled.then(() => {
		list.style.transform = 'scale(1)'
	});
}


orderButtns.forEach(button => {
	button.addEventListener('click', (event) => {
		event.preventDefault();
		const orderValue = event.target.dataset.order; 
		clearList();
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

	clearList();

	if (!Object.keys(searchList).length) {
		showNotFound();
	} else {
		showSearchResult(searchList);
	}
})


