import {tokensList, table} from '../script.js';

export const tableBody = document.querySelector('.coins-content');

export const toCoinsTable = (coin, index) => {
	const row = document.createElement('tr');
	row.classList.add('table__row');
	row.setAttribute('data-id', coin.uuid);

	const id = document.createElement('td');
	id.innerHTML = ++index;

	const img = document.createElement('img');
	img.classList.add('coin__icon');
	img.setAttribute('src', coin.iconUrl);

	const name = document.createElement('div');
	name.classList.add('coin__name');
	name.innerHTML = coin.name;

	const symbol = document.createElement('div');
	symbol.classList.add('coin__symbol');
	symbol.innerHTML = coin.symbol;

	const data = document.createElement('td');
	data.classList.add('coin__data');
	data.append(img);
	data.append(name);
	data.append(symbol);

	const price = document.createElement('td');
	price.classList.add('coin__price');
	price.innerHTML = `$${parseFloat(coin.price).toFixed(6)}`;

	const volume = document.createElement('td');
	volume.classList.add('coin__volume');
	volume.innerHTML = `$${parseFloat(coin["24hVolume"])}`;

	const marketCap = document.createElement('td');
	marketCap.classList.add('coin__cap');
	marketCap.innerHTML = `$${parseFloat(coin.marketCap).toFixed(3)}`;

	row.append(id);
	row.append(data);
	row.append(price);
	row.append(marketCap);
	row.append(volume);
	tableBody.append(row);
}


export const showCoinDetails = (coin) => {
	const modalContent = document.querySelector('.modal__content');

	const name = document.createElement('div');
	name.innerText = coin.name;

	const symbol = document.createElement('div');
	symbol.innerText = coin.symbol;

	const price = document.createElement('div');
	price.innerText = coin.price;

	const volume = document.createElement('div');
	volume.innerText = coin['24hVolume'];

	const cap = document.createElement('div');
	cap.innerText = coin.marketCap;

	const url = document.createElement('a');
	url.innerText = coin.websiteUrl;
	url.setAttribute('href', coin.websiteUrl);

	const description = document.createElement('div');
	description.innerText = coin.description;

	const tags = document.createElement('div');
	tags.innerText = coin.tags;

	modalContent.append(name);
	modalContent.append(symbol);
	modalContent.append(description);
	modalContent.append(price);
	modalContent.append(volume);
	modalContent.append(cap);
	modalContent.append(url);
	modalContent.append(tags);
}

export const showNotFound = () => {
	const header = document.createElement('h1');
	header.innerHTML = 'Not found';
	header.classList.add('not-found');

	return new Promise((resolve, reject) => {	
		setTimeout(() => {
			tableBody.append(header);		
			resolve();
		}, 1000)
	}).then(() => {
		table.style.transform = 'scale(1)';
	})
}

export const showSearchResult = (searchList) => {
	return new Promise(resolve => {
		setTimeout(() => {
			Object.keys(searchList).forEach(key => {
				toCoinsTable(searchList[key], key);
			})
			resolve();
		}, 1000) 
	}).then(() => {
		table.style.transform = 'scale(1)'
	});
}


export const showTokensList = (coinsList, type) => {
	Object.keys(coinsList).forEach(key => {
		const coin = coinsList[key]
		
		const coinData = document.createElement('div');
		coinData.classList.add('tokens__item');

		const img = document.createElement('img');
		img.classList.add('tokens__icon');
		img.setAttribute('src', coin.iconUrl);
		
		const name = document.createElement('div')
		name.innerText = coin.symbol;
		
		coinData.append(img);
		coinData.append(name);
		tokensList.append(coinData);
	})
	tokensList.style.transform = 'translateY(0)';
	tokensList.setAttribute('data-type', type);
}