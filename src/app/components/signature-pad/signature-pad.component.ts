import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'am-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss']
})
export class SignaturePadComponent {
  
  @ViewChild('signPad', {static: false}) signPad!: ElementRef<HTMLCanvasElement>;
   signatureImg?: string = '';
  private sigPadElement: any;
  private context: any;
  private isDrawing!: boolean;


  public ngAfterViewInit(): void {
    this.sigPadElement = this.signPad.nativeElement;
    this.context = this.sigPadElement.getContext('2d');
    this.context.strokeStyle = '#004D40';
    this.context.lineWidth = 1;
  }

  onMouseDown(e: any): void {
    // The mouse button is clicked, which means the start of drawing the signature
    this.isDrawing = true;
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e: any): void {
    // The mouse button is released, so this means the end of drawing the signature
    this.isDrawing = false;
  }

  onMouseMove(e: any): void {
    if (this.isDrawing) { // if we're not drawing we need to ignore the events
      const coords = this.relativeCoords(e);
      this.context.lineTo(coords.x, coords.y);
     //this.context.lineTo(e.clientX, e.clientY)
      this.context.stroke();
    }
  }

  clearSignature(): void {
    this.signatureImg = undefined;
    this.context.clearRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
    this.context.beginPath();
  }

  saveSignature(): void {
    this.signatureImg = this.sigPadElement.toDataURL('image/png');
  }

  private relativeCoords(event: any): { x: number, y: number } {
    const bounds = event.target.getBoundingClientRect();
    const cords = {
      clientX: event.clientX || event.changedTouches[0].clientX,
      clientY: event.clientY || event.changedTouches[0].clientY
    };
    const x = cords.clientX - bounds.left;
    const y = cords.clientY - bounds.top;

    return {x, y};
  }
}
