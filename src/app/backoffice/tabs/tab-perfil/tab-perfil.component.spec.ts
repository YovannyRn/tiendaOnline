import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPerfilComponent } from './tab-perfil.component';

describe('TabPerfilComponent', () => {
  let component: TabPerfilComponent;
  let fixture: ComponentFixture<TabPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
