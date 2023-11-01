import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumsFeatureComponent } from './forums-feature.component';

describe('ForumsFeatureComponent', () => {
  let component: ForumsFeatureComponent;
  let fixture: ComponentFixture<ForumsFeatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ForumsFeatureComponent]
    });
    fixture = TestBed.createComponent(ForumsFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
