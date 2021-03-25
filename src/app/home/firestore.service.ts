import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Feedback } from "./feedback.model"

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  createResponse(feedback: Feedback){
    return this.firestore.collection('feedback').doc().set(Object.assign({}, feedback))
  }
}
