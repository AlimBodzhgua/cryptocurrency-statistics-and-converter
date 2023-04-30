
export const list = document.querySelector('.coins-list');

export const toCoinsList = (value, symbol, icon) => {
	const li = document.createElement('li');
	li.classList.add('list__item');

	const img = document.createElement('img');
	img.classList.add('coin__icon');
	img.setAttribute('src', icon);

	const name = document.createElement('div');
	name.classList.add('coin__name');
	name.innerHTML = value;

	const price = document.createElement('div');
	price.classList.add('coin__price');
	price.innerHTML = symbol;

	li.append(img);
	li.append(name);
	li.append(price);
	list.append(li);
}

export const clearList = () => {
	setTimeout(() => {
		list.innerHTML = '';
	}, 500)
	list.style.transform = 'scale(0)';
}