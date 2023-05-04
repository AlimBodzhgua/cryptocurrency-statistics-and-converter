import {getCoins} from '/src/api.js';
import {toCoinsTable,tableBody} from '/src/blocks.js';
import {table} from '../script.js';

export const showCoins = async (order) => {
	const coinsList = await getCoins(order)
	const keys = await Object.keys(coinsList);

	const tableFulled = new Promise((resolve, reject) => {
		setTimeout(() => {
			keys.forEach(key => {
				toCoinsTable(coinsList[key], key);
			})
			resolve();
		}, 1000) 
	})

	tableFulled.then(() => {
		table.style.transform = 'scale(1)'
	});

	return coinsList;
}

export const clearTable = () => {
	setTimeout(() => {
		tableBody.innerHTML = '';
	}, 800)
	table.style.transform = 'scale(0)';
}

export const clearModal = () => {
	const content = document.querySelector('.modal__content');
	content.innerHTML = '';
}

export const removeBodyScroll = () => {
	const body = document.querySelector('body');
	body.classList.add('no-scroll');
}
