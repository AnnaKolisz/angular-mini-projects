import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MAT_FORM_FIELD } from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';

export class HourMinute {
  constructor(public hour: string, public minute: string) { }
}

@Component({
  selector: 'app-hour-picker',
  templateUrl: './hour-picker.component.html',
  styleUrls: ['./hour-picker.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: HourPickerComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  },
})
export class HourPickerComponent implements OnInit, OnDestroy, MatFormFieldControl<HourMinute>, ControlValueAccessor {
   startArr = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
   hours: string[];
   minutes: string[];
   parts: FormGroup;
   @ViewChild('hour') hourSelect: HTMLElement;
   @ViewChild('minute') minuteSelect: HTMLElement;

   // for implements ControlValueAccessor
   onChange = (_: any) => { };
   onTouched = () => { };

  //#region for implements MatFormFieldControl<HourMinute>
  
  stateChanges = new Subject<void>();
  static nextId = 0;
  id: string =`app-hour-picker-${HourPickerComponent.nextId++}`;;
  focused= false;
  touched = false;
  controlType = 'app-hour-picker';

  @Input()
  get value(): HourMinute | null {
    if (this.parts.valid) {
      const {value: { hour, minute } } = this.parts;
      return new HourMinute(hour, minute);
    }
    return null;
  }
  set value(time: HourMinute | null) {
    const { hour, minute } = time || new HourMinute('', '');
    this.parts.setValue({ hour, minute });
    this.stateChanges.next();
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  get errorState(): boolean {
    return this.parts.invalid && this.touched;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  get empty() {
    const {  value: { hour, minute } } = this.parts;
    return !hour && !minute;
  }

  //#endregion

  constructor(
    formBuilder: FormBuilder,
    private _elementRef: ElementRef<HTMLElement>,
    private _focusMonitor: FocusMonitor,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl,
  ) { 
    this.parts = formBuilder.group({
      hour: ['', [Validators.required]],
      minute: ['', [Validators.required]],
    });
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }


  ngOnInit(): void {
    this.hours = this.createArray([...this.startArr], 23);
    this.minutes = this.createArray([...this.startArr], 59);
  }
  
  ngOnDestroy(): void {
    this.stateChanges.complete();
  }
  
  createArray(starArr: string[], untilWhen: number){
    for(let i = 10; i <= untilWhen; i++){
      starArr.push(String(i));
    }
    return starArr;
  }

  // Method for implements MatFormFieldControl<HourMinute>
  setDescribedByIds(ids: string[]){
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.hourctn',
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  // Method for implements MatFormFieldControl<HourMinute>
  onContainerClick(event: MouseEvent) {
    if (this.parts.controls.hour.valid) {
      this._focusMonitor.focusVia(this.hourSelect, 'program');
    } else {
      this._focusMonitor.focusVia(this.minuteSelect, 'program');
    }
  }

  // Method for implements ControlValueAccessor
  writeValue(time: HourMinute | null): void {
    this.value = time;
  }

  // Method for implements ControlValueAccessor
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Method for implements ControlValueAccessor
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
