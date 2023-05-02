
export const list = document.querySelector('.coins-list');

export const toCoinsList = ({name, symbol, iconUrl}) => {
	const li = document.createElement('li');
	li.classList.add('list__item');

	const img = document.createElement('img');
	img.classList.add('coin__icon');
	img.setAttribute('src', iconUrl);

	const value = document.createElement('div');
	value.classList.add('coin__name');
	value.innerHTML = name;

	const price = document.createElement('div');
	price.classList.add('coin__symbol');
	price.innerHTML = symbol;

	li.append(img);
	li.append(name);
	li.append(price);
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
