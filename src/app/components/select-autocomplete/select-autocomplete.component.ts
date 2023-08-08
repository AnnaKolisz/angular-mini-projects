import { Component, ElementRef, ViewChild } from '@angular/core';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { Person, Team } from 'src/app/model/data';
import { DataService } from 'src/app/service/data.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'am-select-autocomplete',
  templateUrl: './select-autocomplete.component.html',
  styleUrls: ['./select-autocomplete.component.scss']
})
export class SelectAutocompleteComponent {

  sub$: Subscription;
  teamsSelect = ['Team Yellow', 'Team Blue', 'Team Red'];
  allUsers: Person[];
  chosenUsers: Person[] = [];
  filteredUsers: Person[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('inputP') inputField: ElementRef<HTMLInputElement>;
  teams: Team[] = [{
    name: 'Team Yellow', startDate: new Date(), endDate: new Date(), members: [
      { id: 2, firstName: 'Carine', lastName: 'Stobbe' },
      { id: 6, firstName: 'Reynolds', lastName: 'Chelnam' }]
  }];
  teamForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    startDate: new FormControl<Date | null>(null, { nonNullable: true, validators: Validators.required }),
    endDate: new FormControl<Date | null>(null, { nonNullable: true, validators: Validators.required }),
    members: new FormControl<Person[]>([], { nonNullable: true, validators: Validators.required }),
    filter: new FormControl<string>('')
  });

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.getData200().pipe(
      map(items => items.slice(0, 50).map(({ id, firstName, lastName }) => ({ id, firstName, lastName, combinedName: `${lastName} ${firstName}` })))
    ).subscribe(
      items => {
        this.allUsers = items;
        this.filteredUsers = [...items];
        this.onChanges();
      });
  }

  ngOnDestroy(): void {
    if (this.sub$) { this.sub$.unsubscribe(); }
  }


  displayFn(user: Person): string {
    return user && user.lastName ? `${user.lastName} ${user.firstName}` : '';
  }

  add(event: MatChipInputEvent): void {
    console.log('add', event);
    const value = (event.value || '').trim();
    // if (value) {
    //   this.chosenUsers.push(value);
    // }

    // // Clear the input value
    event.chipInput!.clear();

    // this.fruitCtrl.setValue(null);
  }

  remove(person: Person): void {
    const index = this.chosenUsers.indexOf(person);
    if (index >= 0) {
      this.chosenUsers.splice(index, 1);
      this.filteredUsers.push(person);
      this.filteredUsers.sort((a, b) => a.combinedName.localeCompare(b.combinedName));
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const chosen = this.allUsers.find(person => person.id === event.option.value);
    if (chosen) {
      this.chosenUsers.push(chosen);
      this.filteredUsers = this.filteredUsers.filter(person => person.id !== chosen.id);
    }
    this.inputField.nativeElement.value = '';
    this.teamForm.patchValue({ filter: null });
  }

  onChanges() {
    this.sub$ = this.teamForm.get('filter').valueChanges.pipe(
      tap(item => console.log(item)),
      startWith(null),
      filter(item => !Number.isInteger(item)),
      map((searchValue: any | null) => (searchValue ? this._filter(searchValue) : this.getFiltredWorkers())),
    ).subscribe(res => this.filteredUsers = res);
  }

  private _filter(value: string): Person[] {

    const filterValue = value.toLowerCase();
    return this.allUsers.filter(worker => worker.combinedName.toLowerCase().includes(filterValue));
  }

  getFiltredWorkers() {
    const ids = this.chosenUsers.map(user => user.id);
    return this.allUsers.filter(item => !ids.includes(item.id));
  }

  onSubmit() {
    if (this.teamForm.valid) {
      const valueForm = <Team>this.teamForm.getRawValue();
      this.teams.push(valueForm);
      this.clear();
    }
  }

  clear() {
    this.teamForm.reset();
    this.chosenUsers = [];
    this.teamForm.markAsPristine();
    this.teamForm.markAsUntouched();
  }

}
