import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneForumPageComponent } from './one-forum-page.component';

describe('OneForumPageComponent', () => {
  let component: OneForumPageComponent;
  let fixture: ComponentFixture<OneForumPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OneForumPageComponent]
    });
    fixture = TestBed.createComponent(OneForumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
