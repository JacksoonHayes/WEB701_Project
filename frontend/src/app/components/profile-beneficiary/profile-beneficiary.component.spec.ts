import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBeneficiaryComponent } from './profile-beneficiary.component';

describe('ProfileBeneficiaryComponent', () => {
  let component: ProfileBeneficiaryComponent;
  let fixture: ComponentFixture<ProfileBeneficiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBeneficiaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileBeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
