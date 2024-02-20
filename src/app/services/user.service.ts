import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { User } from '../shared/data/user.model';
import { environment } from 'src/environments/environment';

import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _collectionName: string = environment.USERS;
  public user = new Subject<User>();

  constructor(private _firestore: AngularFirestore) {

  }

  setUser(user: User): void {
    if (!environment.production)
      console.log('Setting User', user);

    this._firestore.collection(this._collectionName).doc(user._id).set(user, { merge: true });
    this.user.next(user);
  }

  getNewUserRecordUsingFirebase(firebaseUser: firebase.User): User {
    return <User>{
      email: firebaseUser.email,
      _id: firebaseUser.uid,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      emailVerified: firebaseUser.emailVerified,
      phoneNumber: firebaseUser.phoneNumber,
    }
  }
}
