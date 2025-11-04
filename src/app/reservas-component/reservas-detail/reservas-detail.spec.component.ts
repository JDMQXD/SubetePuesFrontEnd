import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservasDetailComponent } from './reservas-detail.component';

describe('ReservasDetailComponent', () => {
  let component: ReservasDetailComponent;
  let fixture: ComponentFixture<ReservasDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservasDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
