import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.scss'],
})
export class ImageZoomComponent implements OnInit, OnChanges {
  @ViewChild('imageZoom', { static: false }) imageZoom: ElementRef;
  @ViewChild('imageContainer', { static: false }) imageContainer: ElementRef;

  @Input() src: string;

  scale = 0;

  imageLoading = true;

  isDragging = false;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes) {
    if (changes.src) {
      this.imageLoading = true;
    }
  }
  onSliderChange(event) {
    this.scale = event.value;
    const prevScrollWidth = this.imageZoom.nativeElement.scrollWidth;
    const prevScrollHeight = this.imageZoom.nativeElement.scrollHeight;
    const prevScrollLeft = this.imageContainer.nativeElement.scrollLeft;
    const prevScrollTop = this.imageContainer.nativeElement.scrollTop;
    const clientWidth = this.imageContainer.nativeElement.clientWidth;
    const clientHeight = this.imageContainer.nativeElement.clientHeight;

    this.imageZoom.nativeElement.width = clientWidth + (2000 - clientWidth) * (this.scale / 100);
    this.imageZoom.nativeElement.height = clientHeight + (2000 - clientHeight) * (this.scale / 100);
    this.imageZoom.nativeElement.style.top = 0;
    this.imageZoom.nativeElement.style.left = 0;

    const curScrollWidth = this.imageContainer.nativeElement.scrollWidth;
    const curScrollHeight = this.imageContainer.nativeElement.scrollHeight;

    this.imageContainer.nativeElement.scrollLeft =
      (prevScrollLeft + clientWidth / 2) *  (curScrollWidth / prevScrollWidth) - clientWidth / 2;
    this.imageContainer.nativeElement.scrollTop =
      (prevScrollTop + clientHeight / 2) * (curScrollHeight / prevScrollHeight) - clientHeight / 2;
  }

  imageLoaded() {
    this.imageLoading = false;
  }

  onMouseDown(event) {
    this.isDragging = true;
  }

  onMouseMove(event) {
    event.preventDefault();
    if (!this.isDragging) { return; }
    this.imageContainer.nativeElement.scrollLeft -= event.movementX;
    this.imageContainer.nativeElement.scrollTop -= event.movementY;

  }

  onMouseUp(event) {
    this.isDragging = false;
  }
}
