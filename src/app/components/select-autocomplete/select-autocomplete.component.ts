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


  // Pomysł na autocomplete: Validacja aby było tylko trzy osoby, lista autocomplete jest disable, oraz walidacja czy osoba juz nie jest zajęta(to bardzo na póżniej)
  // i dodać animację aby ładnie sie przełączało między formularzami 
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
  headers = ["Team Name", "Start date", "End date", "Members", "Action"];
  editState = { ifEdit: false, editTeamId: null };

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
    if (this.teamForm.valid) {
      if (this.editState.ifEdit) {
        const team = this.teams.find(team => team.teamId === this.editState.editTeamId);
        if (team) {
          const valueForm = <Team>{ ...this.teamForm.getRawValue(), teamId: team.teamId };
          this.teams[this.teams.indexOf(team)] = valueForm;
          this.clear();
          this.editState.ifEdit = false;
          this.editState.editTeamId = null;
        }
      } else {
        const teamId = this.teams.reduce((acc, team) => team.teamId > acc ? team.teamId : acc, 0) + 1;
        const valueForm = <Team>{ ...this.teamForm.getRawValue(), teamId };
        this.teams.push(valueForm);
        this.clear();

      }
    }
  }

  clear() {
    this.teamForm.reset();
    this.chosenUsers = [];
    this.teamForm.markAsPristine();
    this.teamForm.markAsUntouched();
  }

  deleteTeam(team: Team) {
    this.teams = this.teams.filter(item => item.teamId !== team.teamId);
  }

  editTeam(team: Team) {
    this.editState.ifEdit = true;
    this.editState.editTeamId = team.teamId;
    this.teamForm.patchValue({
      name: team.name,
      startDate: team.startDate,
      endDate: team.endDate,
      members: team.members
    });
    this.chosenUsers = team.members;
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
    teamId: 1,
    name: MOCK_TEAM_YELLOW, startDate: new Date(2025, 0, 3), endDate: new Date(2025, 0, 6), members: [
      { id: 2, firstName: 'Carine', lastName: 'Stobbe' },
      { id: 6, firstName: 'Reynolds', lastName: 'Chelnam' }]
  },
  {
    teamId: 2,
    name: MOCK_TEAM_BLUE, startDate: new Date(2025, 0, 4), endDate: new Date(2025, 0, 13), members: [
      { id: 22, firstName: 'Barbey', lastName: 'Bonar' },
      { id: 26, firstName: 'Aggy', lastName: 'Laxson' }]
  },
  {
    teamId: 3,
    name: MOCK_TEAM_RED, startDate: new Date(2025, 0, 23), endDate: new Date(2025, 0, 26), members: [
      { id: 2, firstName: 'Carine', lastName: 'Stobbe' },
      { id: 6, firstName: 'Reynolds', lastName: 'Chelnam' },
      { id: 180, firstName: 'Teirtza', lastName: 'Bridgen' }
    ]
  }
];

