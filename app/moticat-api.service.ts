import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';

@Injectable()
export class MoticatAPIService {
	constructor (private http: Http) {}

	private _locationURLs = ['combo'];
	private _baseURL = 'http://52.33.19.46:8080/';

	getUrl(index){
		return this._baseURL + this._locationURLs[index];
	}

	getCombos(){
		console.log(localStorage['id_token']);
		return this.http.get(this.getUrl(0) + '/' + localStorage['id_token'])
		.map(res => res.json())
		.do(res => console.log('getCombos: success'))
		.catch(this.handleError);
	}

	private handleError (error: Response) {
		console.log('errors4days');
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
