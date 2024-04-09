import { FocusMonitor } from "@angular/cdk/a11y";
import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";
import { Component, ElementRef, HostBinding, Inject, Input, OnDestroy, Optional, Self, ViewChild } from "@angular/core";
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl, Validators } from "@angular/forms";
import { MatFormField, MatFormFieldControl, MAT_FORM_FIELD } from "@angular/material/form-field";
import { Subject } from "rxjs";

export class HourMinuteSec {
  constructor(public hour: string, public minute: string, public second: string) { }
}

@Component({
  selector: 'am-hour-picker-input',
  templateUrl: './hour-picker-input.component.html',
  styleUrls: ['./hour-picker-input.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: HourPickerInput }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  },
})
export class HourPickerInput implements OnDestroy, MatFormFieldControl<HourMinuteSec>, ControlValueAccessor {

  static nextId = 0;
  @ViewChild('tHour') hourInput: HTMLInputElement;
  @ViewChild('tMinute') minuteInput: HTMLInputElement;
  @ViewChild('tSecond') secondInput: HTMLInputElement;
  timeForm: FormGroup<{
    hour: FormControl<string>;
    minute: FormControl<string>;
    second: FormControl<string>;
  }>;
  stateChanges = new Subject<void>();
  focused: boolean = false;
  touched = false;
  controlType = "times-input"
  autofilled?: boolean;
  userAriaDescribedBy?: string;
  onChange = (_: any) => { };
  onTouched = () => { };
  maxHour = 23;
  maxMinSec = 59;

  @Input()
  get value(): HourMinuteSec {
    if (this.timeForm.valid) {
      const {
        value: { hour, minute, second },
      } = this.timeForm;
      return new HourMinuteSec(hour!, minute!, second!);
    }
    return null;
  }
  set value(val: HourMinuteSec | null) {
    const { hour, minute, second } = val || new HourMinuteSec('', '', '');
    this.timeForm.setValue({ hour, minute, second });
    this.stateChanges.next();
  }


  id = `times-input-${HourPickerInput.nextId++}`;
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
  get required(): boolean {
    return this._required;
  }
  set required(req: BooleanInput) { //BooaleanInput
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.timeForm.disable() : this.timeForm.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  get empty() {
    const { hour, minute, second } = this.timeForm.value;
    return !hour && !minute && !second;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.timeForm = formBuilder.group({
      hour: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      minute: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      second: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    });
  }

  get errorState(): boolean {
    return this.timeForm.invalid && this.touched;
  }

  writeValue(time: HourMinuteSec | null): void {
    this.value = time;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(control: AbstractControl, max: number): void {
    const valNum = Number(control.value) <= max ? control.value : String(max);
    console.log(valNum);

    control.setValue(valNum)
    this.onChange(this.value);
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  setDescribedByIds(ids: string[]): void {

  }
  onContainerClick(event: MouseEvent): void {

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

  autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
    if (nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }


  // -----------my methods


  add(max: number, control: AbstractControl) {
    let val = Number(control.value);
    val++;
    if (val <= max) {
      control.setValue(this.string00(val))
    } else {
      control.setValue('00')
    }
  }

  substract(max: number, control: AbstractControl) {
    let val = Number(control.value);
    val--;
    if (val >= 1) {
      control.setValue(this.string00(val))
    } else {
      control.setValue('00')
    }
  }

  check00(control: AbstractControl) {
    control.setValue(this.string00(control.value));
  }

  string00(val: number | string) {
    let valStr = String(val);
    if (valStr.length === 1) {
      valStr = `0${valStr}`;
    }
    return valStr;
  }

}
