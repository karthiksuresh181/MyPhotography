import { Component, ViewContainerRef, ComponentFactoryResolver, HostListener, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  @ViewChild('dynamicImageComponent1', { read: ViewContainerRef}) dynamicImageComponent1: ViewContainerRef;
  @ViewChild('dynamicImageComponent2', { read: ViewContainerRef}) dynamicImageComponent2: ViewContainerRef;
  @ViewChild('dynamicImageComponent3', { read: ViewContainerRef}) dynamicImageComponent3: ViewContainerRef;

  private imageData: any;
  closeResult = '';
  
  constructor(
    private cfr: ComponentFactoryResolver,
    private imageService: ImageService,
    private modalService: NgbModal
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
      if(!this.dynamicImageComponent1.length){
        this.load_image_component(this.dynamicImageComponent1, this.imageData["set_1"]);
      }
    }else if(yOffset>1000 && yOffset<1100){
      if(!this.dynamicImageComponent2.length){
        this.load_image_component(this.dynamicImageComponent2, this.imageData["set_2"]);
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
