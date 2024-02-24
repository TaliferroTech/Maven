import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

import { AngularFireFunctions } from '@angular/fire/compat/functions';


interface DataItem {
  name: string,
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private _itemDocs?: AngularFirestoreCollection;
  public items?: Observable<any[]>;

  private _itemDoc?: AngularFirestoreDocument<any>;
  public item?: Observable<any>;

  
  constructor(private _firestore: AngularFirestore, private _authService: AuthService, private fns: AngularFireFunctions) { }

  getAll(collectionName: string) {
    this._itemDocs = this._firestore.collection(collectionName);
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getAllByEmail(collectionName: string, email: string) {
    this._itemDocs = this._firestore.collection(collectionName, ref => ref.where("email", "==", email));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  delete(collectionName: string, id: string) {
    this._firestore.collection(collectionName).doc(id).delete();

  }

  updateByUID(collectionName: string, data: any) {
    data.lastUpdated = new Date().getTime();
    if (this._authService.firebaseUser) {
      data.uid = this._authService.firebaseUser?.uid;
      this._firestore.collection(collectionName).doc(data.uid).set(data,{merge: true});
    }
  }

  update(collectionName: string, id: string, data: any) {
    this.setUpdateMeta(data);
    this._firestore.collection(collectionName).doc(id).set(data, { merge: true });
  }

  setUpdateMeta(data: any) : void {
    data.lastUpdated = new Date().getTime();
    if (this._authService.firebaseUser) {
      data.uid = this._authService.firebaseUser.uid;
      data.updatedBy = (this._authService.firebaseUser.email) ? this._authService.firebaseUser.email : '';
    }

  }

  add(collectionName: string, data: any) {
    data.createdAt = new Date().getTime();
    this.setUpdateMeta(data);
    
    return this._firestore.collection(collectionName).add(data);
  }

  addRecordReturnKey(collectionName: string, data: any) {
    data.createdAt = new Date().getTime();
    this.setUpdateMeta(data);
    
    const id = this._firestore.createId();    
    this._firestore.collection(collectionName).doc(id).set(data);
    return id;
  }

  get(collectionName: string, id: string) {
    this._itemDoc = this._firestore.doc<any>(collectionName + '/' + id);
    this.item = this._itemDoc.valueChanges({ idField: '_id' });
  }

  getByTitle(collectionName: string, title: string) {
    return this._firestore.collection(collectionName, ref => ref.where('title', '==', title)).get();
  }

  getByLastUpdated(collectionName: string) {
    this._itemDocs = this._firestore.collection(collectionName, ref => ref.orderBy('lastUpdated', "desc"));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  getAllByNotThis(collectionName: string, fieldName: string, notThisValue: string) {
    this._itemDocs = this._firestore.collection(collectionName, ref => ref.where(fieldName, "!=", notThisValue));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  sendNLP(textToSend: string) {
     let temp : Observable<any>;
     const callable = this.fns.httpsCallable('mavensearch');
    temp = callable({ name: 'textToSend' });

    temp.subscribe(d => {
      console.log("Function returns:", d)
    })
  }
}
