import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';

import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [WelcomeComponent, ProfileComponent, MainComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MainComponent
  ]
})
export class HomeModule { }
