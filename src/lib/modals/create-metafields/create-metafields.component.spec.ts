import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMetafieldsComponent } from './create-metafields.component';

describe('CreateMetafieldsComponent', () => {
  let component: CreateMetafieldsComponent;
  let fixture: ComponentFixture<CreateMetafieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMetafieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMetafieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
