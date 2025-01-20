import { Component, ElementRef, ViewChild } from '@angular/core';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { ConfigTable, Person, Team } from 'src/app/model/data';
import { DataService } from 'src/app/service/data.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


export function maxMembersValidator(max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const members = control.value;
    return Array.isArray(members) && members.length > max ? { ifMax: true } : null;
  };
}
@Component({
  selector: 'am-select-autocomplete',
  templateUrl: './select-autocomplete.component.html',
  styleUrls: ['./select-autocomplete.component.scss']
})
export class SelectAutocompleteComponent {

  // Pomysł na autocomplete: Validacja aby było tylko trzy osoby, lista autocomplete jest disable, oraz walidacja czy osoba juz nie jest zajęta
  // Tabela z jakimś fajnym filtrem
  // można dodać gantt

  sub$: Subscription;
  teamsSelect = MOCK_TEAM_SELECT;
  allUsers: Person[];
  chosenUsers: Person[] = [];
  filteredUsers: Person[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('inputP') inputField: ElementRef<HTMLInputElement>;
  teams: Team[] = MOCK_TEAM;
  teamForm = new FormGroup({
    name: new FormControl(null, { validators: Validators.required }),
    startDate: new FormControl<Date | null>(null, { nonNullable: true, validators: Validators.required }),
    endDate: new FormControl<Date | null>(null, { nonNullable: true, validators: Validators.required }),
    members: new FormControl<Person[]>([], { nonNullable: true, validators: [Validators.required, maxMembersValidator(3)] }),
    filter: new FormControl<string>('')
  });
  headers = ["Team Name", "Start date", "End date", "Members", "Action"]

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.getData200().pipe(
      map(items => items.slice(0, 25).map(({ id, firstName, lastName }) => ({ id, firstName, lastName, combinedName: `${lastName} ${firstName}` })))
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
    const value = (event.value || '').trim();
    event.chipInput!.clear();
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
    console.log(this.teamForm);
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

const MOCK_TEAM_SELECT = [
  { name: 'Team Yellow', hexColor: '#FAC05E' }, { name: 'Team Blue', hexColor: '#2B98CA' }, { name: 'Team Red', hexColor: '#D64933' }
];
const MOCK_TEAM_YELLOW = MOCK_TEAM_SELECT[0];
const MOCK_TEAM_BLUE = MOCK_TEAM_SELECT[1];
const MOCK_TEAM_RED = MOCK_TEAM_SELECT[2];


const MOCK_TEAM = [
  {
    name: MOCK_TEAM_YELLOW, startDate: new Date(2025, 0, 3), endDate: new Date(2025, 0, 6), members: [
      { id: 2, firstName: 'Carine', lastName: 'Stobbe' },
      { id: 6, firstName: 'Reynolds', lastName: 'Chelnam' }]
  },
  {
    name: MOCK_TEAM_BLUE, startDate: new Date(2025, 0, 4), endDate: new Date(2025, 0, 13), members: [
      { id: 22, firstName: 'Barbey', lastName: 'Bonar' },
      { id: 26, firstName: 'Aggy', lastName: 'Laxson' }]
  },
  {

    name: MOCK_TEAM_RED, startDate: new Date(2025, 0, 23), endDate: new Date(2025, 0, 26), members: [
      { id: 2, firstName: 'Carine', lastName: 'Stobbe' },
      { id: 6, firstName: 'Reynolds', lastName: 'Chelnam' },
      { id: 180, firstName: 'Teirtza', lastName: 'Bridgen' }
    ]
  }
];

