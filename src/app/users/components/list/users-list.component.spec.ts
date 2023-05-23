import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersModule } from '../../users.module';
import { UsersService } from '../../services/users.service';
import { UsersListComponent} from './users-list.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  const mockUsersService = jasmine.createSpyObj(['users']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      imports: [
        UsersModule
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
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
