import { Component, ViewContainerRef, ComponentFactoryResolver, HostListener, OnInit, ViewChild } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('dynamicProfileComponent', { read: ViewContainerRef}) dynamicProfileComponent: ViewContainerRef;
  constructor(
    private vcr: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    let yOffset = window.pageYOffset;
    if(yOffset > 50 && yOffset<100){
      if(!this.dynamicProfileComponent.length){
        this.load_profile_component();
      }
    }
  }
  
  async load_profile_component(){
    const componentFactory = this.cfr.resolveComponentFactory(ProfileComponent);
    this.dynamicProfileComponent.clear();
    const dynamicComponent = <ProfileComponent>this.dynamicProfileComponent.createComponent(componentFactory).instance;
  }
}
