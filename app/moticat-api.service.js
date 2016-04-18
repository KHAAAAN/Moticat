System.register(['angular2/core', 'angular2/http', 'rxjs/Observable'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1;
    var MoticatAPIService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            MoticatAPIService = (function () {
                function MoticatAPIService(http) {
                    this.http = http;
                    this._locationURLs = ['combo'];
                    this._baseURL = 'http://52.33.19.46:8080/';
                }
                MoticatAPIService.prototype.getUrl = function (index) {
                    return this._baseURL + this._locationURLs[index];
                };
                MoticatAPIService.prototype.getCombos = function () {
                    console.log(localStorage['id_token']);
                    return this.http.get(this.getUrl(0) + '/' + localStorage['id_token'])
                        .map(function (res) { return res.json(); })
                        .do(function (res) { return console.log('getCombos: success'); })
                        .catch(this.handleError);
                };
                MoticatAPIService.prototype.handleError = function (error) {
                    console.log('errors4days');
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                MoticatAPIService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], MoticatAPIService);
                return MoticatAPIService;
            }());
            exports_1("MoticatAPIService", MoticatAPIService);
        }
    }
});
//# sourceMappingURL=moticat-api.service.js.map