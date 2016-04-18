import {bootstrap} from 'angular2/platform/browser';
import {Component, provide, OnInit} from 'angular2/core';
import {RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from 'angular2-jwt';
import 'rxjs/Rx';

import {MoticatAPIService} from './moticat-api.service';

import {EventEmitter, Output} from 'angular2/core';

//@CanActivate(() => tokenNotExpired())

declare var Auth0Lock;
@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css']
})

export class AppComponent implements OnInit{
  lock = new Auth0Lock('kMbP7jdZNCQmk1yDjY5rziIfgap9v7fz', 'jayk94.auth0.com');
  jwtHelper: JwtHelper = new JwtHelper();
  public quoteAuthor: string = '';
  public quoteText: string = '';

  public videoLink: string = '';
  public videoTitle: string = '';

  public logoImage = "app/img/moticatlogo.png";
	public profile;

  constructor(public http: Http, public authHttp: AuthHttp,
			 private _moticatAPIService: MoticatAPIService) {
			 }

  login() {
    this.lock.show((err: string, profile: string, id_token: string) => {

      if (err) {
        throw new Error(err);
      }

      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', id_token);

	this.profile = JSON.parse(localStorage['profile']);
	this.newCombo();
    });
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
	
	this.profile = null;
  }

  loggedIn() {
    return tokenNotExpired();
  }

  AnotherOne(){

	location.reload();
    setTimeout(
      this.newCombo(), 5000);


  }

  shareLink(event){
	console.log(event);
  }

newCombo(){
     this._moticatAPIService.getCombos()
          .subscribe(
        data => {
				this .quoteText = data.quote.text;
				this.quoteAuthor = data.quote.author;
				this.videoTitle = data.video.title;
				this.videoLink = data.video.link;
				
				this.onValueChange(this.videoLink);
            }
            );
}

getVideoLink(){
	console.log(this.videoLink);
	return this.videoLink;
}

	ngOnInit(){
		if(this.loggedIn()){
			this.profile = JSON.parse(localStorage['profile']);
			console.log(this.profile);
			this.newCombo();
		}
	}


  tokenSubscription() {
    this.authHttp.tokenStream.subscribe(
        data => console.log(data),
        err => console.log(err),
        () => console.log('Complete')
      );
  }

  useJwtHelper() {
    var token = localStorage.getItem('id_token');

    console.log(
      this.jwtHelper.decodeToken(token),
      this.jwtHelper.getTokenExpirationDate(token),
      this.jwtHelper.isTokenExpired(token)
    );
  }

  @Output() valueChange = new EventEmitter();
  onValueChange(value){
	this.valueChange.emit(value);
  }
}

bootstrap(AppComponent, [
	HTTP_PROVIDERS,
	ROUTER_PROVIDERS,
	MoticatAPIService,
	provide(AuthHttp, {
		useFactory: (http) => {
		  return new AuthHttp(new AuthConfig(), http);
		},
		deps: [Http]
	  })
])

