import { Component, ViewContainerRef, ComponentFactoryResolver, HostListener, OnInit, ViewChild } from '@angular/core';

import { ProfileComponent } from '../profile/profile.component';
import { ImageComponent } from '../image/image.component';
import { ImageService } from '../image.service';
import { CarouselComponent } from '../carousel/carousel.component'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('dynamicProfileComponent', { read: ViewContainerRef}) dynamicProfileComponent: ViewContainerRef;
  @ViewChild('dynamicImageComponent', { read: ViewContainerRef}) dynamicImageComponent: ViewContainerRef;

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
    let yOffset = window.pageYOffset;
    if(yOffset > 50 && yOffset<100){
      if(!this.dynamicProfileComponent.length){
        this.load_profile_component();
      }
    }else if(yOffset>600 && yOffset<700){
      if(!this.dynamicImageComponent.length){
        this.load_image_component(this.dynamicImageComponent, this.imageData);
      }
    }
  }
  
  load_profile_component(){
    const componentFactory = this.cfr.resolveComponentFactory(ProfileComponent);
    this.dynamicProfileComponent.clear();
    <ProfileComponent>this.dynamicProfileComponent.createComponent(componentFactory).instance;
  }

  load_image_component(dynamicComponent, data){
    const componentFactory = this.cfr.resolveComponentFactory(ImageComponent);
    dynamicComponent.clear();
    const _component = <ImageComponent>dynamicComponent.createComponent(componentFactory).instance;
    _component.data = data;
  }
}
