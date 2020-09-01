import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstaImagesComponent } from './insta-images.component';

describe('InstaImagesComponent', () => {
  let component: InstaImagesComponent;
  let fixture: ComponentFixture<InstaImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstaImagesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstaImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
