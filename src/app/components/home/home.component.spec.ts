import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TeamsService } from '../../services/teams/teams.service';
import { UsersService } from '../../services/users/users.service';
import { of, throwError } from 'rxjs';
import { Team } from '../../models/team';
import { User } from '../../models/user';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LogoPathPipe } from '../../pipes/logoPath/logo-path.pipe';
import { CommonModule } from '@angular/common';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let teamsServiceSpy: jasmine.SpyObj<TeamsService>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;

  const mockTeams: Team[] = [
    {
      id: 1,
      name: 'Team 1',
      description: 'Desc',
      user_id: 10,
      pokemon_1: 25,
      pokemon_2: 4,
      pokemon_3: 7,
      pokemon_4: 1,
      pokemon_5: 39,
      pokemon_6: 52,
      favorited: true
    }
  ];
  const mockUser: User = { id: 10, username: 'Ash', email: 'ash@poke.com', password: 'pikachu' };

  beforeEach(async () => {
    teamsServiceSpy = jasmine.createSpyObj('TeamsService', ['getFavoritedTeams']);
    usersServiceSpy = jasmine.createSpyObj('UsersService', ['getTeamCreator']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        LogoPathPipe,
        CommonModule,
        HomeComponent
      ],
      providers: [
        { provide: TeamsService, useValue: teamsServiceSpy },
        { provide: UsersService, useValue: usersServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load teams of the week and fetch usernames', (done) => {
    teamsServiceSpy.getFavoritedTeams.and.returnValue(of(mockTeams));
    usersServiceSpy.getTeamCreator.and.returnValue(of(mockUser));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.aTeamsWeek).toEqual(mockTeams);
    expect(usersServiceSpy.getTeamCreator).toHaveBeenCalledWith(10);

    // Wait for the async username mapping
    setTimeout(() => {
      expect(component.userNamesMap.get(1)).toBe('Ash');
      done();
    }, 0);
  });

  it('should handle error when loading teams', () => {
    teamsServiceSpy.getFavoritedTeams.and.returnValue(throwError(() => new Error('fail')));
    spyOn(console, 'log');
    component.ngOnInit();
    expect(console.log).toHaveBeenCalledWith(jasmine.any(Error));
  });

it('should NOT display teams of the week section if aTeamsWeek array is empty', () => {
  // Simulate the service returning an empty array
  teamsServiceSpy.getFavoritedTeams.and.returnValue(of([]));
  fixture.detectChanges();
  const compiled = fixture.nativeElement as HTMLElement;
  // Since aTeamsWeek is empty, there should be no content related to teams of the week
  // Adjust the selector/text below to match what would be rendered for teams of the week
  expect(compiled.textContent).not.toContain('Team Of The Week');
  // If you have a section or card for teams, you can check for its absence as well
  // expect(compiled.querySelector('.teams-of-the-week')).toBeNull();
});
});
