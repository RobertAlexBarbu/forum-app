import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewForumPageComponent } from './new-forum-page.component';

describe('NewForumPageComponent', () => {
  let component: NewForumPageComponent;
  let fixture: ComponentFixture<NewForumPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewForumPageComponent]
    });
    fixture = TestBed.createComponent(NewForumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
