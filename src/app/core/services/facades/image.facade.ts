import { Injectable } from '@angular/core';
import { ImageApi } from '../apis/image.api';
import { Observable, BehaviorSubject } from 'rxjs';
import { Image } from 'src/app/shared/models/product/image.model';
import { first } from 'rxjs/operators';
import { filter } from 'minimatch';

@Injectable({
  providedIn: 'root'
})
export class ImageFacade {

  constructor(
    private imageApi: ImageApi
  ) { }

  getImage(fileUuid: string) {
    return this.imageApi.getImageById(fileUuid);
  }
}
