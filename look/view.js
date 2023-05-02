
export const list = document.querySelector('.coins-list');

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
	marketCap.classList.add('coin__price');
	marketCap.innerHTML = `$${parseFloat(coin.marketCap).toFixed(6)}`;


	li.append(img);
	li.append(name);
	li.append(symbol);
	li.append(price);
	li.append(volume);
	list.append(li);
}


//data.coins[0]["24hVolume"]

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
