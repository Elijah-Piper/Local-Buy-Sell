import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountIndicComponent } from './account-indic.component';

describe('AccountIndicComponent', () => {
  let component: AccountIndicComponent;
  let fixture: ComponentFixture<AccountIndicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountIndicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountIndicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
