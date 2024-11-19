import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MineTsComponent } from './mine.ts.component';

describe('MineTsComponent', () => {
  let component: MineTsComponent;
  let fixture: ComponentFixture<MineTsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MineTsComponent]
    });
    fixture = TestBed.createComponent(MineTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
