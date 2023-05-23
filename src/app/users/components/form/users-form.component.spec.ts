import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IUser } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { UsersModule } from '../../users.module';
import { UsersFormComponent } from './users-form.component';

describe('UsersFormComponent', () => {
  let component: UsersFormComponent;
  let fixture: ComponentFixture<UsersFormComponent>;
  const mockUsersService = jasmine.createSpyObj(['addUser']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersFormComponent],
      imports: [
        UsersModule,
      ],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService
        },
      ]

    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
