import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Image } from 'src/app/shared/models/product/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageApi {

  constructor(private httpClient: HttpClient) { }
  
  getImageById(fileUuid: string): Observable<Image> {
    const api = `apparel/file/${fileUuid}`;
    return this.httpClient.get<any>(api).pipe(map(res => {
      return new Image().deserialize(res.data);
    }));
  }
}
