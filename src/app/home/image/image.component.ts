import { Component, Input, OnInit } from '@angular/core';
import { KeyValuePipe, KeyValue} from '@angular/common'

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() data: any; 
  constructor() { }

  ngOnInit(): void {
    
  }

}
