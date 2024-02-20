import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {


  private _collectionName: string = environment.SETTINGS;

  public newStoreId: any;

  constructor(private _firestore: AngularFirestore, private _dataService: DatabaseService) { }

  setSetting(uid: string, data: any): void {
    if (!data.createdAt)
      data.createdAt = new Date().getTime();

    data.lastUpdated = new Date().getTime();
    if (!environment.production)
      console.log('New User Settings', uid);

    this._firestore.collection(this._collectionName).doc(uid).set(data, { merge: true });
  }

  newStoreSetting(data: any): string {
    return this._dataService.addRecordReturnKey(this._collectionName, data);
  }

}
