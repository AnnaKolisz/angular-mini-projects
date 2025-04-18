import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
    selector: 'am-signature-pad',
    templateUrl: './signature-pad.component.html',
    styleUrls: ['./signature-pad.component.scss'],
    standalone: false
})
export class SignaturePadComponent {

  @ViewChild('canvas', { static: false }) canvasEL!: ElementRef<HTMLCanvasElement>;

  @ViewChild('ctn', { static: false }) container!: ElementRef<HTMLDivElement>;
  signatureImg?: string = '';
  private canvas: any;
  private context: CanvasRenderingContext2D;
  private isDrawing!: boolean;

  // tutaj spróbuj zrobić dynamiczne z viewport
  ngAfterViewInit(): void {
    this.canvas = this.canvasEL.nativeElement;
    const ctn = this.container.nativeElement;
    this.canvas.width = (ctn.clientWidth / 2) - 64;
    this.canvas.height = ctn.clientHeight - 16;
    this.context = this.canvas.getContext('2d');
    console.log(this.context)
    this.context.strokeStyle = '#004D40';
    this.context.lineWidth = 1;

  }
  /* what copilot said
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Additional logic to redraw graphics based on new size
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  */

  onMouseDown(event: any): void {
    // The mouse button is clicked, which means the start of drawing the signature
    this.isDrawing = true;
    const coords = this.relativeCoords(event);
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
      this.context.stroke();
    }
  }

  clearSignature(): void {
    this.signatureImg = undefined;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
  }

  saveSignature(): void {
    this.signatureImg = this.canvas.toDataURL('image/png');
  }

  //mouseevent
  private relativeCoords(event: any) {
    const bounds = event.target.getBoundingClientRect();
    const cords = {
      clientX: event.clientX || event.changedTouches[0].clientX,
      clientY: event.clientY || event.changedTouches[0].clientY
    };
    const x = cords.clientX - bounds.left;
    const y = cords.clientY - bounds.top;
    return { x, y };

  }
}
