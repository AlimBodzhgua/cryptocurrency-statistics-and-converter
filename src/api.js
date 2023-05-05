import {API_KEY} from '../config.js';

const options = {
 	headers: {
    	'Content-Type': 'application/json',
    	'x-access-token': API_KEY,
	},
};

export const getCoins = async (order = 'marketCap', limit = 30) => {
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

export const getCoinDetails = async (uuid) => {
	const url = `https://api.coinranking.com/v2/coin/${uuid}`;
	try {
		const response = await fetch(url, options);
		const json = await response.json();
		return json.data.coin;
	} catch (error) {
		throw new Error('Error getting coin details', error);
	}
}

export const getCoinPrice = async (uuid) => {
	const url = `https://api.coinranking.com/v2/coin/wsogvtv82FCd/price`
	try {
		const response = await fetch(url, options);
	} catch (error) {
		throw new Error('Error getting coin price', error);
	}
}

export const convertCoin = async (tokenFrom, tokenTo, amount) => {
	const url = `https://api.coinconvert.net/convert/${tokenFrom}/${tokenTo}?amount=${amount}`;
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

export const getGlobalStats = async () => {
	const url = 'https://api.coinranking.com/v2/stats';
	try {
		const response = await fetch(url, options);
		const json = await response.json();
		return json.data;
	} catch (error) {
		throw new Error('Error getting global stats');
	}
}