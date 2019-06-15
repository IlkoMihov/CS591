import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarbleComponent } from './farble.component';

describe('FarbleComponent', () => {
  let component: FarbleComponent;
  let fixture: ComponentFixture<FarbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
