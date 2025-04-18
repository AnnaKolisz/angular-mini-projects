import { FocusMonitor } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, ElementRef, EventEmitter, HostBinding, inject, input, Input, model, OnDestroy, OnInit, Optional, Self, signal, untracked } from '@angular/core';
import { NgControl, ControlValueAccessor, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD, MatFormFieldControl } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'am-review-star-input',
    imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule],
    templateUrl: './review-star-input.component.html',
    styleUrl: './review-star-input.component.scss',
    providers: [{ provide: MatFormFieldControl, useExisting: ReviewStarInputComponent }],
    host: {
        '[class.floating]': 'shouldLabelFloat',
        '[id]': 'id',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewStarInputComponent implements ControlValueAccessor, MatFormFieldControl<number>, OnInit, OnDestroy {


  readonly _value = model<number | null>(0, { alias: 'value' });
  stars: boolean[] = Array(5).fill(false);
  stateChanges = new Subject<void>();
  static nextId = 0;
  readonly id = `am-review-star-input-${ReviewStarInputComponent.nextId++}`;
  readonly _placeholder = input<string>('', { alias: 'placeholder' });
  readonly _required = input<boolean, unknown>(false, {
    alias: 'required',
    transform: booleanAttribute,
  });
  readonly _disabledByInput = input<boolean, unknown>(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });
  protected readonly _formField = inject(MAT_FORM_FIELD, {
    optional: true,
  });

  readonly touched = signal(false);
  private readonly _focused = signal(false);
  private readonly _disabledByCva = signal(false);
  private readonly _disabled = computed(() => this._disabledByInput() || this._disabledByCva());
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  onChange = (_: any) => { };
  onTouched = () => { };


  get focused(): boolean {
    return this._focused();
  }

  get empty() {
    return this._value() === 0;
  }

  get shouldLabelFloat() {

    return this.focused || !this.empty;
  }

  get placeholder(): string {
    return this._placeholder();
  }

  get required(): boolean {
    return this._required();
  }

  get disabled(): boolean {
    return this._disabled();
  }

  get value(): number {
    return this._value();
  }

  get errorState(): boolean {
    return this._value() === null;
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
  ) {
    console.log()
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    effect(() => {
      // Read signals to trigger effect.
      this._placeholder();
      this._required();
      this._disabled();
      this._focused();
      // Propagate state changes.
      untracked(() => this.stateChanges.next());
    });

  }

  ngOnInit() {
    this.updateStars();
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  updateStars() {
    this.stars = this.stars.map((_, index) => index < this.value);
  }

  setRating(index: number) {
    this._value.set(index + 1);
    this.updateStars();
    this.onChange(this.value);
    this.onTouched();
  }

  onFocusIn() {
    console.log('bum', this.focused);
    if (!this._focused()) {
      this._focused.set(true);
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched.set(true);
      this._focused.set(false);
      this.onTouched();
    }
  }

  setDescribedByIds(ids: string[]): void {

  }
  onContainerClick(event: MouseEvent): void {

  }

  //   ---------- ControlValueAccessor

  writeValue(obj: number): void {
    this._value.set(obj);
    this.updateStars();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByCva.set(isDisabled);
  }


}
