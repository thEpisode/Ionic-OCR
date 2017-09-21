import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Platform, ActionSheetController, LoadingController } from 'ionic-angular';

import Tesseract from 'tesseract.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('imageResult') private imageResult: ElementRef;
  @ViewChild('demoImg') private demoImg: ElementRef;

  private recognizedText: string;

  image: string = '';
  _zone: any;
  _ocrIsLoaded: boolean = false;

  brightness: number = 12;
  contrast: number = 52;
  unsharpMask: any = { radius: 100, strength: 2 };
  hue: number = -100;
  saturation: number = -100;

  showEditFilters: boolean = false;

  debugText: string = '';

  constructor(
    private camera: Camera,
    public navCtrl: NavController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public actionsheetCtrl: ActionSheetController) {

    this._zone = new NgZone({ enableLongStackTrace: false });
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
                this.randomDemo()
              }
            },
            {
              text: 'Take Photo',
              icon: !this.platform.is('ios') ? 'camera' : null,
              handler: () => {
                this.takePicture()
              }
            },
            {
              text: 'Cancel',
              role: 'cancel', // will always sort to be on the bottom
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
                this.randomDemo()
              }
            },
            {
              text: 'Re-Take photo',
              icon: !this.platform.is('ios') ? 'camera' : null,
              handler: () => {
                this.takePicture()
              }
            },
            {
              text: 'Apply filters',
              icon: !this.platform.is('ios') ? 'barcode' : null,
              handler: () => {
                this.filter()
              }
            },
            {
              text: 'Clean filters',
              icon: !this.platform.is('ios') ? 'refresh' : null,
              handler: () => {
                this.restoreImage()
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
              role: 'cancel', // will always sort to be on the bottom
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
      var canvas = (<any>window).fx.canvas();
    } catch (e) {
      alert(e);
      return;
    }

    /// taken from glfx documentation
    var imageElem = this.imageResult.nativeElement; // another trick is acces to DOM element
    var texture = canvas.texture(imageElem);

    canvas.draw(texture)
      .hueSaturation(this.hue / 100, this.saturation / 100)//grayscale
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
    Tesseract.recognize(image, {})
      .progress((progress) => {
        this._zone.run(() => {
          loader.setContent(`${progress.status}: ${Math.floor(progress.progress * 100)}%`)
          console.log('progress:', progress);
        })
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
          if (loadAPI != true) { this.recognizedText = tesseractResult.text; }
        });
      });
  }

  randomDemo() {

  }

  ionViewDidLoad() {
    console.log('loaded')
    this.analyze(this.demoImg.nativeElement.src, true);
  }
}
