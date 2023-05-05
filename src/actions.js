import {getCoins, getGlobalStats} from '/src/api.js';
import {toCoinsTable,tableBody} from '/src/blocks.js';
import {table} from '../script.js';

const body = document.querySelector('body');

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

export const showGlobalStats = async () => {
	const stats = await getGlobalStats();
	const fields = document.querySelectorAll('[data-field]');

	fields.forEach(field => {
		const key = field.dataset.field;
		const value = document.createElement('div');
		value.innerText = stats[key];
		field.append(value);

	})
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

export const showModal = (modal) => {
	body.classList.add('no-scroll');
	setTimeout(() => {
		modal.style.transform = 'translateY(0)';
	}, 150) 
	modal.classList.add('active');
}

export const hideModal = (modal) => {
	setTimeout(() => {
		modal.classList.remove('active');
		body.classList.remove('no-scroll');
	}, 150)
	modal.style.transform = 'translateY(-100%)';
}


export const removeBodyScroll = () => {
	const body = document.querySelector('body');
	body.classList.add('no-scroll');
}
