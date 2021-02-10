import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ImageComponent } from './image/image.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  declarations: [
    MainComponent,
    WelcomeComponent,
    ImageComponent,
    FeedbackComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MainComponent
  ]
})
export class HomeModule { }
