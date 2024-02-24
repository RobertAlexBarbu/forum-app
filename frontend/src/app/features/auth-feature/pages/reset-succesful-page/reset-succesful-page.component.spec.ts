import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetSuccesfulPageComponent } from './reset-succesful-page.component';

describe('ResetSuccesfulPageComponent', () => {
  let component: ResetSuccesfulPageComponent;
  let fixture: ComponentFixture<ResetSuccesfulPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetSuccesfulPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetSuccesfulPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
