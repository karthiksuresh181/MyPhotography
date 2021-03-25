import { Component, ViewContainerRef, ComponentFactoryResolver, HostListener, OnInit, ViewChild } from '@angular/core';

import { ProfileComponent } from '../profile/profile.component';
import { ImageComponent } from '../image/image.component';
import { ImageService } from '../image.service';
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('dynamicProfileComponent', { read: ViewContainerRef}) dynamicProfileComponent: ViewContainerRef;
  @ViewChild('dynamicImageComponent', { read: ViewContainerRef}) dynamicImageComponent: ViewContainerRef;
  @ViewChild('dynamicFeedbackComponent', { read: ViewContainerRef}) dynamicFeedbackComponent: ViewContainerRef;

  private imageData: any;
  closeResult = '';
  
  constructor(
    private cfr: ComponentFactoryResolver,
    private imageService: ImageService,
  ) { }

  ngOnInit(): void {
    this.imageService.get_image_set().subscribe(data => {
      this.imageData = data;
  });
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    // console.log("Window InnerHeight: ", window.innerHeight)
    // console.log("window.scrollY: ", window.scrollY)
    // console.log("offsetHeight", document.body.offsetHeight)

    if((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
      if(!this.dynamicProfileComponent.length){
        this.load_profile_component();
      }else if(!this.dynamicImageComponent.length){
        this.load_image_component(this.dynamicImageComponent, this.imageData);
      }else if(!this.dynamicFeedbackComponent.length){
        this.load_feedback_component(); 
      }
    }
  }
  
  load_profile_component(){
    const componentFactory = this.cfr.resolveComponentFactory(ProfileComponent);
    this.dynamicProfileComponent.clear();
    <ProfileComponent>this.dynamicProfileComponent.createComponent(componentFactory).instance;
  }

  load_feedback_component(){
    const componentFactory = this.cfr.resolveComponentFactory(FeedbackComponent);
    this.dynamicFeedbackComponent.clear();
    <FeedbackComponent>this.dynamicFeedbackComponent.createComponent(componentFactory).instance;
  }

  load_image_component(dynamicComponent, data){
    const componentFactory = this.cfr.resolveComponentFactory(ImageComponent);
    dynamicComponent.clear();
    const _component = <ImageComponent>dynamicComponent.createComponent(componentFactory).instance;
    _component.data = data;
  }
}
