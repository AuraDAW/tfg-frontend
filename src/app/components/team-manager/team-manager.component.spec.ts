import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamManagerComponent } from './team-manager.component';
import { TeamsService } from '../../services/teams/teams.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { TranslateModule } from '@ngx-translate/core';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { CommonModule } from '@angular/common';

describe('TeamManagerComponent', () => {
  let component: TeamManagerComponent;
  let fixture: ComponentFixture<TeamManagerComponent>;
  let teamsServiceSpy: jasmine.SpyObj<TeamsService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    teamsServiceSpy = jasmine.createSpyObj('TeamsService', [
      'getTeams', 'getTeamsUser', 'postPokemonTeam', 'deleteTeam'
    ]);
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'isLoggedIn', 'getUserIdFromToken', 'getRoleFromToken'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        TeamManagerComponent,
        CommonModule,
        MatDialogModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: TeamsService, useValue: teamsServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TeamManagerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set userId and userRole on ngOnInit', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    authServiceSpy.getUserIdFromToken.and.returnValue(5);
    authServiceSpy.getRoleFromToken.and.returnValue(2);
    teamsServiceSpy.getTeams.and.returnValue(of([]));
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.userId).toBe(5);
    expect(component.userRole).toBe(2);
    expect(teamsServiceSpy.getTeams).toHaveBeenCalled();
  });

  it('should call showTeamsUser if userRole is not admin', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    authServiceSpy.getUserIdFromToken.and.returnValue(7);
    authServiceSpy.getRoleFromToken.and.returnValue(1);
    teamsServiceSpy.getTeamsUser.and.returnValue(of([]));
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.userId).toBe(7);
    expect(component.userRole).toBe(1);
    expect(teamsServiceSpy.getTeamsUser).toHaveBeenCalledWith(7);
  });

  it('should call postPokemonTeam and refresh teams on createTeam', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({ name: 'Team1', description: 'Desc1' }), close: null });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);
    component.userId = 1;
    teamsServiceSpy.postPokemonTeam.and.returnValue(of({ id: 1 })); // <-- Fix here
    spyOn(component as any, 'showTeamsUser');
    component.createTeam();
    expect(dialogSpy.open).toHaveBeenCalledWith(DialogFormComponent);
    expect(teamsServiceSpy.postPokemonTeam).toHaveBeenCalled();
    expect((component as any).showTeamsUser).toHaveBeenCalled();
  });

  it('should not call postPokemonTeam if dialog is closed without result', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(undefined), close: null });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);
    component.createTeam();
    expect(teamsServiceSpy.postPokemonTeam).not.toHaveBeenCalled();
  });

  it('should navigate to editTeam', () => {
    component.editTeam({ id: 2, user_id: 3 } as any);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/teamBuilder/3/2');
  });

  it('should navigate to viewTeam', () => {
    component.viewTeam({ id: 4 } as any);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/teamViewer/4');
  });

  it('should call deleteTeam and refresh teams on confirm', async () => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true, isDenied: false, isDismissed: false }));
    teamsServiceSpy.deleteTeam.and.returnValue(of({ message: 'Deleted' }));
    spyOn(component as any, 'showTeamsUser');
    await component.deleteTeam({ id: 1, name: 'Test' } as any);
    expect(teamsServiceSpy.deleteTeam).toHaveBeenCalledWith(1);
    expect((component as any).showTeamsUser).toHaveBeenCalled();
  });

  it('should not call deleteTeam if not confirmed', async () => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: false, isDenied: false, isDismissed: false }));
    await component.deleteTeam({ id: 1, name: 'Test' } as any);
    expect(teamsServiceSpy.deleteTeam).not.toHaveBeenCalled();
  });

  it('should call showAllTeams if userRole is admin (2)', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    authServiceSpy.getUserIdFromToken.and.returnValue(10);
    authServiceSpy.getRoleFromToken.and.returnValue(2);
    const mockTeams = [
      { id: 1, name: 'Team1', description: 'desc1', user_id: 1 },
      { id: 2, name: 'Team2', description: 'desc2', user_id: 2 }
    ];
    teamsServiceSpy.getTeams.and.returnValue(of(mockTeams));
    spyOn(component as any, 'showAllTeams').and.callThrough();

    fixture.detectChanges();
    component.ngOnInit();

    expect(component.userId).toBe(10);
    expect(component.userRole).toBe(2);
    expect((component as any).showAllTeams).toHaveBeenCalled();
    expect(teamsServiceSpy.getTeams).toHaveBeenCalled();
    expect(component.aTeams).toEqual(mockTeams as any);
  });
});
