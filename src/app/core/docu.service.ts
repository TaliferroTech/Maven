import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocuService {

  private _itemDocs?: AngularFirestoreCollection;
  public items?: Observable<any[]>;

  private _itemDoc?: AngularFirestoreDocument<any>;
  public item?: Observable<any>;

  private collectionName: string = 'project-documents'

  constructor(private _firestore: AngularFirestore) { }


  getAll() {
    this._itemDocs = this._firestore.collection(this.collectionName, ref => ref.orderBy('title'));
    this.items = this._itemDocs.valueChanges({ idField: '_id' });
  }

  delete(id: string) {
    this._firestore.collection(this.collectionName).doc(id).delete();

  }
  update(id: string, data: any) {
    data.updated_at = new Date().getTime();

    this._firestore.collection(this.collectionName).doc(id).set(data, { merge: true });
  }

  add(data: any) {
    data.updated_at = new Date().getTime();
    data.created_at = new Date().getTime();

    return this._firestore.collection(this.collectionName).add(data);
  }

  addRecordReturnKey(data: any) {
    data.updated_at = new Date().getTime();
    data.created_at = new Date().getTime();

    const id = this._firestore.createId();
    this._firestore.collection(this.collectionName).doc(id).set(data);
    return id;
  }

  get(id: string) {
    this._itemDoc = this._firestore.doc<any>(this.collectionName + '/' + id);
    this.item = this._itemDoc.valueChanges({ idField: '_id' });
  }

  searchCurrentByCategory(category: any) {
    this.items = this._itemDocs?.valueChanges({ idField: '_id' }).pipe(
      map(items => {
        return items.filter(item => { return (item['category'] == category) || (item['category'] == Number(category)) })
      })
    );
  }


}
