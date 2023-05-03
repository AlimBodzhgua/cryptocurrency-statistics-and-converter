
export const list = document.querySelector('.coins-list');
export const body = document.querySelector('body');
const modal = document.querySelector('.modal');
const close = document.querySelector('.modal__close');

export const toCoinsList = (coin) => {
	const li = document.createElement('li');
	li.classList.add('list__item');
	li.setAttribute('data-id', coin.uuid);

	const img = document.createElement('img');
	img.classList.add('coin__icon');
	img.setAttribute('src', coin.iconUrl);

	const name = document.createElement('div');
	name.classList.add('coin__name');
	name.innerHTML = coin.name;

	const symbol = document.createElement('div');
	symbol.classList.add('coin__symbol');
	symbol.innerHTML = coin.symbol;

	const price = document.createElement('div');
	price.classList.add('coin__price');
	price.innerHTML = `$${parseFloat(coin.price).toFixed(6)}`;

	const volume = document.createElement('div');
	volume.classList.add('coin__volume');
	volume.innerHTML = `$${parseFloat(coin["24hVolume"])}`;

	const marketCap = document.createElement('div');
	marketCap.classList.add('coin__cap');
	marketCap.innerHTML = `$${parseFloat(coin.marketCap).toFixed(6)}`;

	li.append(img);
	li.append(name);
	li.append(symbol);
	li.append(price);
	li.append(volume);
	list.append(li);
}

export const clearList = () => {
	setTimeout(() => {
		list.innerHTML = '';
	}, 800)
	list.style.transform = 'scale(0)';
}

export const showNotFound = () => {
	const header = document.createElement('h1');
	header.innerHTML = 'Not found';
	header.classList.add('not-found');

	return new Promise((resolve, reject) => {	
		setTimeout(() => {
			list.append(header);		
			resolve();
		}, 1000)
	}).then(() => {
		list.style.transform = 'scale(1)';
	})
}

export const showSearchResult = (searchList) => {
	return new Promise(resolve => {
		setTimeout(() => {
			Object.keys(searchList).forEach(key => {
				toCoinsList(searchList[key]);
			})
			resolve();
		}, 1000) 
	}).then(() => {
		list.style.transform = 'scale(1)'
	});
}

export const showCoinDetails = (coin, modal) => {
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

const clearModal = () => {
	const content = modal.querySelector('.modal__content');
	content.innerHTML = '';
}

close.addEventListener('click', (event) => {
	event.preventDefault();
	modal.classList.remove('active');
	body.classList.remove('no-scroll');
	clearModal();
})