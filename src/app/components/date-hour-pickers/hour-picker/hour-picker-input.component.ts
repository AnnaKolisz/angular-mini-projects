import { Component, ElementRef, HostBinding, Input, OnDestroy, Optional, Self } from "@angular/core";
import {  ControlValueAccessor, FormControl, FormGroup, NgControl } from "@angular/forms";
import { MatFormFieldControl } from "@angular/material/form-field";
import {  Subject } from "rxjs";

export class HourMinuteSec {
  constructor(public hour: string, public minute: string, public second: string) { }
}

@Component({
  selector: 'am-hour-picker-input',
  template: `
    <div role="group" [formGroup]="timeForm">
        <input  type="text" maxlength="2" onlyNumbers formControlName="hour" >
        <div>
            <button (click)="add('hour')"> < </button>
            <button (click)="substract('hour')"> > </button>
        </div>
        <span>:</span>
        <input  type="text" maxlength="2" formControlName="minute" >
        <span>:</span>
        <input type="text"  maxlength="2" formControlName="second">

    </div>
    `,
  styleUrls: ['./hour-picker.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: HourPickerInput }],
})
export class HourPickerInput implements OnDestroy, MatFormFieldControl<HourMinuteSec>, ControlValueAccessor {


  stateChanges = new Subject<void>();

  focused: boolean = false;
  touched = false;
  empty: boolean;
  shouldLabelFloat: boolean;
  required: boolean;
  disabled: boolean;
  errorState: boolean;
  controlType?: string;
  autofilled?: boolean;
  userAriaDescribedBy?: string;
  onChange = (_: any) => {};
  onTouched = () => {};



  hours: string[];
  minutes: string[];

  timeForm = new FormGroup({
    hour: new FormControl('00'),
    minute: new FormControl('00'),
    second: new FormControl('00')
  })

  @Input()
  get value(): HourMinuteSec {
    let n = this.timeForm.value;
    return <HourMinuteSec>n;
    // if (n.area.length == 3 && n.exchange.length == 3 && n.subscriber.length == 4) {
    //   return new MyTel(n.area, n.exchange, n.subscriber);
    // }
    // return null;
  }
  set value(val: HourMinuteSec | null) {
    val = val || new HourMinuteSec('', '', '');
    this.timeForm.setValue({ ...val });
    this.stateChanges.next();
  }
  static nextId = 0;
  @HostBinding()
  id = `hour-input-${HourPickerInput.nextId++}`;
  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private _elementRef: ElementRef<HTMLElement>,
  ) { 
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }


  writeValue(obj: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnChange(fn: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  setDescribedByIds(ids: string[]): void {
    throw new Error('Method not implemented.');
  }
  onContainerClick(event: MouseEvent): void {
    throw new Error('Method not implemented.');
  }


  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }
  
  onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }


  // -----------my methods


  add(controlName: string) {
    let val = Number(this.timeForm.get(controlName).value);

    val++;
    this.timeForm.patchValue({ [controlName]: val })


  }

  substract(controlName: string) {
    let val = Number(this.timeForm.get(controlName).value);

    val++;
    this.timeForm.patchValue({ [controlName]: val })


  }

}
