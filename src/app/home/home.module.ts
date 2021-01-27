import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [WelcomeComponent, ProfileComponent],
  imports: [
    CommonModule
  ],
  exports: [
    WelcomeComponent
  ]
})
export class HomeModule { }
