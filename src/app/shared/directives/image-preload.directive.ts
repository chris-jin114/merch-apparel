import { Directive, Input, HostBinding } from '@angular/core';
import { environment } from 'src/environments/local';

@Directive({
  selector: 'img[default]',
  host: {
    '(error)': 'updateUrl()',
    '(load)': 'load()',
    '[src]': 'src'
  }
})
export class ImagePreloadDirective {
  @Input() src: string;
  @Input() default: string;

  assetUrl: string = environment.cloudAssets;
  defaultImage: string = this.assetUrl + '/images/broken-image.png';
  constructor() {}

  updateUrl() {
    if (!this.default) {
      this.default = this.defaultImage;
    }
    this.src = this.default;
  }

  load() {
    
  }
}
