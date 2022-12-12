import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfigTable, Employee } from 'src/app/model/data';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'am-resize',
  templateUrl: './resize.component.html',
  styleUrls: ['./resize.component.scss']
})
export class ResizeComponent implements OnInit, AfterViewInit {

  data$: Observable<Employee[]>;
  data: Employee[];
  headersUp = ["First Name", "Last Name", "Company", "Department"]
  configUp: ConfigTable[] = [
    { key: 'firstName' },
    { key: 'lastName' },
    { key: 'company' },
    { key: 'department' },

  ];
  x: number = 0;
  y: number = 0;
  upHeight: number = 0;
  @ViewChild('dragMe') resizer: ElementRef;
  @ViewChild('up') up: ElementRef;
  @ViewChild('down') down: ElementRef;
  moveListen: Function;
  upListen: Function;

  constructor(
    private dataService: DataService,
    private renderer: Renderer2
  ) { }
  
  ngOnInit(): void {
    this.dataService.getData200().subscribe(list => this.data = list);
  }
  
  ngAfterViewInit(): void {
    this.renderer.listen(this.resizer.nativeElement, 'mousedown', this.mouseDownHandler.bind(this));
  }
  

  mouseDownHandler(event: MouseEvent) {
    console.log(event);
    //Get the current mouse position
    this.x = event.clientX;
    this.y = event.clientY;
    console.log(this.up)
    this.upHeight = this.up.nativeElement.getBoundingClientRect().height;
   // console.log('bum', this.x, this.y, this.upHeight);

    // Attach the listeners to `document`
    //document.addEventListener('mousemove', this.mouseMoveHandler);
    this.moveListen = this.renderer.listen(document, 'mousemove', this.mouseMoveHandler.bind(this));

    this.upListen = this.renderer.listen(document, 'mouseup', this.mouseUpHandler.bind(this));
  };

  mouseMoveHandler(event) {
    console.log(event);
    const dx = event.clientX - this.x;
    const dy = event.clientY - this.y;
    console.log('bum', 'x', this.x, 'y', this.y, 'upHeight', this.upHeight);
    console.log(this.resizer.nativeElement.parentNode.getBoundingClientRect().height)
   const newUpHeight = ((this.upHeight + dy) * 100) / this.resizer.nativeElement.parentNode.getBoundingClientRect().height;

 //  const newUpHeight = this.upHeight + dy - 24;
    console.log('new', newUpHeight);
    this.up.nativeElement.style.height = `${newUpHeight}%`;
    console.log(this.up.nativeElement);
    this.renderer.setStyle(this.resizer.nativeElement, 'cursor', 'row-resize');
    this.renderer.setStyle(document.body, 'cursor', 'row-resize');
    this.renderer.setStyle(this.up.nativeElement, 'userSelect', 'none');
    this.renderer.setStyle(this.up.nativeElement, 'pointerEvents', 'none');
    this.renderer.setStyle(this.down.nativeElement, 'userSelect', 'none');
    this.renderer.setStyle(this.down.nativeElement, 'pointerEvents', 'none');
  }


  mouseUpHandler(event) {
    console.log(event);
    // resizer.style.removeProperty('cursor');
    // document.body.style.removeProperty('cursor');
    this.renderer.removeStyle(this.resizer.nativeElement, 'cursor');
    this.renderer.removeStyle(document.body, 'cursor');

    // leftSide.style.removeProperty('user-select');
    // leftSide.style.removeProperty('pointer-events');

    this.renderer.removeStyle(this.up.nativeElement, 'user-select');
    this.renderer.removeStyle(this.up.nativeElement, 'pointer-events');

    // rightSide.style.removeProperty('user-select');
    // rightSide.style.removeProperty('pointer-events');

    this.renderer.removeStyle(this.down.nativeElement, 'user-select');
    this.renderer.removeStyle(this.down.nativeElement, 'pointer-events');

  //   // // Remove the handlers of `mousemove` and `mouseup`
  //    document.removeEventListener('mousemove', this.mouseMoveHandler.bind(this));
  //    document.removeEventListener('mouseup', this.mouseUpHandler.bind(this));
  // //  this.renderer.listen(document, 'mousemove', this.remove.bind(this));
  // // this.renderer.listen(document, 'mouseup', this.remove.bind(this));
 // this.mouseMoveHandler();
 this.moveListen();
 this.upListen();

  }

  //https://htmldom.dev/create-resizable-split-views/

}
