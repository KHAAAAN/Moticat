System.register(['angular2/platform/browser', 'angular2/core', 'angular2/router', 'angular2/http', 'angular2-jwt', 'rxjs/Rx', './moticat-api.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, core_1, router_1, http_1, angular2_jwt_1, moticat_api_service_1, core_2;
    var AppComponent;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (_1) {},
            function (moticat_api_service_1_1) {
                moticat_api_service_1 = moticat_api_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(http, authHttp, _moticatAPIService) {
                    this.http = http;
                    this.authHttp = authHttp;
                    this._moticatAPIService = _moticatAPIService;
                    this.lock = new Auth0Lock('kMbP7jdZNCQmk1yDjY5rziIfgap9v7fz', 'jayk94.auth0.com');
                    this.jwtHelper = new angular2_jwt_1.JwtHelper();
                    this.quoteAuthor = '';
                    this.quoteText = '';
                    this.videoLink = '';
                    this.videoTitle = '';
                    this.helloKitty = 'app/img/hellokitty.jpg';
                    this.logoImage = "app/img/moticatlogo.png";
                    this.valueChange = new core_2.EventEmitter();
                }
                AppComponent.prototype.login = function () {
                    var _this = this;
                    this.lock.show(function (err, profile, id_token) {
                        if (err) {
                            throw new Error(err);
                        }
                        localStorage.setItem('profile', JSON.stringify(profile));
                        localStorage.setItem('id_token', id_token);
                        _this.profile = JSON.parse(localStorage['profile']);
                        location.reload();
                        _this.newCombo();
                    });
                };
                AppComponent.prototype.logout = function () {
                    localStorage.removeItem('profile');
                    localStorage.removeItem('id_token');
                    this.profile = null;
                };
                AppComponent.prototype.loggedIn = function () {
                    return angular2_jwt_1.tokenNotExpired();
                };
                AppComponent.prototype.AnotherOne = function () {
                    location.reload();
                    setTimeout(this.newCombo(), 5000);
                };
                AppComponent.prototype.shareLink = function (event) {
                    console.log(event);
                };
                AppComponent.prototype.newCombo = function () {
                    var _this = this;
                    this._moticatAPIService.getCombos()
                        .subscribe(function (data) {
                        _this.quoteText = data.quote.text;
                        _this.quoteAuthor = data.quote.author;
                        _this.videoTitle = data.video.title;
                        _this.videoLink = data.video.link;
                        _this.onValueChange(_this.videoLink);
                    });
                };
                AppComponent.prototype.getVideoLink = function () {
                    console.log(this.videoLink);
                    return this.videoLink;
                };
                AppComponent.prototype.ngOnInit = function () {
                    if (this.loggedIn()) {
                        this.profile = JSON.parse(localStorage['profile']);
                        console.log(this.profile);
                        this.newCombo();
                    }
                };
                AppComponent.prototype.tokenSubscription = function () {
                    this.authHttp.tokenStream.subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
                };
                AppComponent.prototype.useJwtHelper = function () {
                    var token = localStorage.getItem('id_token');
                    console.log(this.jwtHelper.decodeToken(token), this.jwtHelper.getTokenExpirationDate(token), this.jwtHelper.isTokenExpired(token));
                };
                AppComponent.prototype.onValueChange = function (value) {
                    this.valueChange.emit(value);
                };
                __decorate([
                    core_2.Output(), 
                    __metadata('design:type', Object)
                ], AppComponent.prototype, "valueChange", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        templateUrl: 'app/app.component.html',
                        styleUrls: ['app/app.component.css']
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp, moticat_api_service_1.MoticatAPIService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
            browser_1.bootstrap(AppComponent, [
                http_1.HTTP_PROVIDERS,
                router_1.ROUTER_PROVIDERS,
                moticat_api_service_1.MoticatAPIService,
                core_1.provide(angular2_jwt_1.AuthHttp, {
                    useFactory: function (http) {
                        return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig(), http);
                    },
                    deps: [http_1.Http]
                })
            ]);
        }
    }
});
//# sourceMappingURL=app.component.js.map