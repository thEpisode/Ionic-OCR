webpackJsonp([0],{

/***/ 107:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 107;

/***/ }),

/***/ 148:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 148;

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_tesseract_js__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_tesseract_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_tesseract_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let HomePage = class HomePage {
    constructor(camera, navCtrl, platform, loadingCtrl, actionsheetCtrl) {
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.actionsheetCtrl = actionsheetCtrl;
        this.image = '';
        this._ocrIsLoaded = false;
        this.brightness = 12;
        this.contrast = 52;
        this.unsharpMask = { radius: 100, strength: 2 };
        this.hue = -100;
        this.saturation = -100;
        this.showEditFilters = false;
        this.debugText = '';
        this._zone = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */]({ enableLongStackTrace: false });
    }
    openMenu() {
        if (this._ocrIsLoaded === true) {
            let actionSheet;
            if (!this.image) {
                actionSheet = this.actionsheetCtrl.create({
                    title: 'Actions',
                    cssClass: 'action-sheets-basic-page',
                    buttons: [
                        {
                            text: 'Random demo',
                            icon: !this.platform.is('ios') ? 'shuffle' : null,
                            handler: () => {
                                this.randomDemo();
                            }
                        },
                        {
                            text: 'Take Photo',
                            icon: !this.platform.is('ios') ? 'camera' : null,
                            handler: () => {
                                this.takePicture();
                            }
                        },
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            icon: !this.platform.is('ios') ? 'close' : null,
                            handler: () => {
                                console.log('Cancel clicked');
                            }
                        }
                    ]
                });
            }
            else {
                actionSheet = this.actionsheetCtrl.create({
                    title: 'Actions',
                    cssClass: 'action-sheets-basic-page',
                    buttons: [
                        {
                            text: 'Random demo',
                            icon: !this.platform.is('ios') ? 'shuffle' : null,
                            handler: () => {
                                this.randomDemo();
                            }
                        },
                        {
                            text: 'Re-Take photo',
                            icon: !this.platform.is('ios') ? 'camera' : null,
                            handler: () => {
                                this.takePicture();
                            }
                        },
                        {
                            text: 'Apply filters',
                            icon: !this.platform.is('ios') ? 'barcode' : null,
                            handler: () => {
                                this.filter();
                            }
                        },
                        {
                            text: 'Clean filters',
                            icon: !this.platform.is('ios') ? 'refresh' : null,
                            handler: () => {
                                this.restoreImage();
                            }
                        },
                        {
                            text: this.showEditFilters == false ? 'Customize filters' : 'Hide customization filters',
                            icon: !this.platform.is('ios') ? 'hammer' : null,
                            handler: () => {
                                this.showEditFilters = this.showEditFilters == false ? true : false;
                            }
                        },
                        {
                            text: 'Read image',
                            icon: !this.platform.is('ios') ? 'analytics' : null,
                            handler: () => {
                                this.analyze(this.imageResult.nativeElement.src, false);
                            }
                        },
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            icon: !this.platform.is('ios') ? 'close' : null,
                            handler: () => {
                                console.log('Cancel clicked');
                            }
                        }
                    ]
                });
            }
            actionSheet.present();
        }
        else {
            alert('OCR API is not loaded');
        }
    }
    restoreImage() {
        if (this.image) {
            this.imageResult.nativeElement.src = this.image;
        }
    }
    takePicture() {
        let loader = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loader.present();
        // Take a picture saving in device, as jpg and allows edit
        this.camera.getPicture({
            quality: 100,
            destinationType: this.camera.DestinationType.NATIVE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            targetHeight: 1000,
            sourceType: 1,
            allowEdit: true,
            saveToPhotoAlbum: true,
            correctOrientation: true
        }).then((imageURI) => {
            loader.dismissAll();
            this.image = imageURI;
            this.debugText = imageURI;
        }, (err) => {
            console.log(`ERROR -> ${JSON.stringify(err)}`);
        });
    }
    filter() {
        /// Initialization of glfx.js
        /// is important, to use js memory elements
        /// access to Window element through (<any>window)
        try {
            var canvas = window.fx.canvas();
        }
        catch (e) {
            alert(e);
            return;
        }
        /// taken from glfx documentation
        var imageElem = this.imageResult.nativeElement; // another trick is acces to DOM element
        var texture = canvas.texture(imageElem);
        canvas.draw(texture)
            .hueSaturation(this.hue / 100, this.saturation / 100) //grayscale
            .unsharpMask(this.unsharpMask.radius, this.unsharpMask.strength)
            .brightnessContrast(this.brightness / 100, this.contrast / 100)
            .update();
        /// replace image src 
        imageElem.src = canvas.toDataURL('image/png');
    }
    analyze(image, loadAPI) {
        let loader = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loader.present();
        if (loadAPI == true) {
            this._ocrIsLoaded = false;
        }
        /// Recognize data from image
        __WEBPACK_IMPORTED_MODULE_3_tesseract_js___default.a.recognize(image, {})
            .progress((progress) => {
            this._zone.run(() => {
                loader.setContent(`${progress.status}: ${Math.floor(progress.progress * 100)}%`);
                console.log('progress:', progress);
            });
        })
            .then((tesseractResult) => {
            this._zone.run(() => {
                loader.dismissAll();
                if (loadAPI == true) {
                    this._ocrIsLoaded = true;
                }
                console.log('Tesseract result: ');
                console.log(tesseractResult);
                /// Show a result if data isn't initializtion
                if (loadAPI != true) {
                    this.recognizedText = tesseractResult.text;
                }
            });
        });
    }
    randomDemo() {
    }
    ionViewDidLoad() {
        console.log('loaded');
        this.analyze(this.demoImg.nativeElement.src, true);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('imageResult'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], HomePage.prototype, "imageResult", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('demoImg'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], HomePage.prototype, "demoImg", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Cami Git\Ionic-OCR\src\pages\home\home.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>\n			Policía Nacional de Colombia\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3 *ngIf="debugText">Debug: {{debugText}}</h3>\n	<span>{{recognizedText}}</span>\n	<img src="assets/img/demo.png" #demoImg class="start-api" />\n	<img [src]="image" #imageResult />\n	\n	<div *ngIf="_ocrIsLoaded && !image">\n			<img src="assets/img/Start-arrow.png" #start class="start-arrow" />\n	</div>\n	<div *ngIf="image && showEditFilters">\n			<ion-list>\n					<ion-list-header>\n						Adjust Image Filters\n					</ion-list-header>\n\n					<ion-item>\n						<ion-label>Brightness</ion-label>\n						<ion-range min="-100" max="100" pin="true" step="1" [(ngModel)]="brightness" color="secondary">\n							<ion-icon range-left small name="sunny"></ion-icon>\n							<ion-icon range-right name="sunny"></ion-icon>\n						</ion-range>\n					</ion-item>\n\n					<ion-item>\n						<ion-label>Contrast</ion-label>\n						<ion-range min="-100" max="100" pin="true" step="1" [(ngModel)]="contrast" color="secondary">\n							<ion-icon range-left small name="contrast"></ion-icon>\n							<ion-icon range-right name="contrast"></ion-icon>\n						</ion-range>\n					</ion-item>\n\n					<ion-item>\n						<ion-label>UnsharpMask Radius</ion-label>	\n						<ion-range min="0" max="200" pin="true" step="1" [(ngModel)]="unsharpMask.radius" color="secondary">\n							<ion-icon range-left small name="ios-radio"></ion-icon>\n							<ion-icon range-right name="ios-radio"></ion-icon>\n						</ion-range>\n					</ion-item>\n\n					<ion-item>\n						<ion-label>UnsharpMask Strength</ion-label>\n						<ion-range min="0" max="5" step="0.5" pin="true" [(ngModel)]="unsharpMask.strength" color="secondary">\n							<ion-icon range-left small name="md-cog"></ion-icon>\n							<ion-icon range-right name="md-cog"></ion-icon>\n						</ion-range>\n					</ion-item>\n\n					<ion-item>\n						<ion-label>Hue</ion-label>\n						<ion-range min="-100" max="100" pin="true" step="1" [(ngModel)]="hue" color="secondary">\n							<ion-icon range-left small name="md-color-palette"></ion-icon>\n							<ion-icon range-right name="md-color-palette"></ion-icon>\n						</ion-range>\n					</ion-item>\n\n					<ion-item>\n						<ion-label>Saturation</ion-label>\n						<ion-range min="-100" max="100" pin="true" step="1" [(ngModel)]="saturation" color="secondary">\n							<ion-icon range-left small name="thermometer"></ion-icon>\n							<ion-icon range-right name="thermometer"></ion-icon>\n						</ion-range>\n					</ion-item>\n\n				</ion-list>\n	</div>\n\n	<ion-fab right bottom>\n		<button ion-fab (click)="openMenu()" color="danger"><ion-icon name="add"></ion-icon></button>\n	</ion-fab>\n</ion-content>'/*ion-inline-end:"C:\Cami Git\Ionic-OCR\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(214);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(192);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */])
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(192);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let MyApp = class MyApp {
    constructor(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
};
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Cami Git\Ionic-OCR\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Cami Git\Ionic-OCR\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[195]);
//# sourceMappingURL=main.js.map