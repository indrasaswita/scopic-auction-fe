export const environment = {
	production: true,
	version: '1.8',
	lastUpdate: 'May 2021',
	appName: 'auction',
	apiUrl: 'https://auction-be.indrasaswita.com/api/',
	enableDebug: false,
	pusher: {
		key: '2b7a847e874afb5b4aa3',
		cluster: 'ap1'
	}
};

// untuk build
// ng build --prod --aot --vendor-chunk --common-chunk --delete-output-path --buildOptimizer
