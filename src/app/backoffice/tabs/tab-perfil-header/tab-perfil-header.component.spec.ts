import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPerfilHeaderComponent } from './tab-perfil-header.component';

describe('TabPerfilHeaderComponent', () => {
  let component: TabPerfilHeaderComponent;
  let fixture: ComponentFixture<TabPerfilHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabPerfilHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabPerfilHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
