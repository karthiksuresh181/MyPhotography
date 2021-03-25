import { Component, OnInit } from '@angular/core';
import { Feedback } from '../feedback.model';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedback;

  constructor(private fireStoreService: FirestoreService) { }

  ngOnInit(): void {
  }

  submitFeedback(name, email, message): void{
    if(name){
      if(email){
        if(message){
          this.feedback = new Feedback(name, email, message);
          this.fireStoreService.createResponse(this.feedback);
        }
      }
    }
  }

}
