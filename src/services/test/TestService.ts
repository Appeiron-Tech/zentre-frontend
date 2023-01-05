import ApiService from '@/models/ApiService';
import type { IResTest } from '@/services/test/ITestService';

export default class TestService extends ApiService{
	constructor(){
		super({baseURL: '/test'})
	}

	/**
	 * 
	 * @returns 
	 */
	async getTestService(): Promise<IResTest>{
		const config = {
			params: {}
		}
		return (await this.get('/getTestService', config)).data
	}

}