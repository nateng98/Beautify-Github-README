interface Config{
	baseUrl: string; // defines interface Config with single property baseUrl of type string
}
const checkConfig = (server:string): Config | {} => {
	let config: Config | {} = {}; // let config holds value of Config or empty object and initialize it with empty object
	switch (server) { // base on the server value
		case 'production':
			config = {
				baseUrl: '',
			};
			break;
		case 'local':
			config = {
				baseUrl: 'http://localhost:8000'
			};
			break;
		default:
			break;
	}
	return config;
};

export const selectServer = 'local';
export const config = checkConfig(selectServer) as Config;