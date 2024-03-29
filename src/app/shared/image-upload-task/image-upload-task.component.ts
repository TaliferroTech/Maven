import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-upload-task',
  templateUrl: './image-upload-task.component.html',
  styleUrls: ['./image-upload-task.component.css']
})
export class ImageUploadTaskComponent implements OnInit, OnDestroy {

  @Input() file?: File;
  @Input() data: any;

  public uploadProgress: any;
  private _ref?: AngularFireStorageReference;
  private _task?: AngularFireUploadTask;
  public downloadURL?: any;
  private _taskSubscription?: Subscription


  constructor(private _storage: AngularFireStorage, private _db: AngularFirestore) {


  }

  ngOnInit(): void {
    this.startUpload();
  }

  ngOnDestroy(): void {
    if (this._taskSubscription)
      this._taskSubscription.unsubscribe();
  }

  startUpload() {
    try {
      const path = environment.FILE_PATH + `/${Date.now()}_${this.file?.name}`;

      this._ref = this._storage.ref(path);
      this.processUpload(path);
    } catch (error) {
      if (!environment.production)
        console.error("START UPLOAD", error);
    }
  }

  processUpload(path: string): void {
    try {
      this._task = this._storage.upload(path, this.file)
      this.uploadProgress = this._task.percentageChanges();
      this._taskSubscription = this._task.snapshotChanges().pipe(
        finalize(async () => {
          this.downloadURL = await this._storage.ref(path).getDownloadURL().toPromise();
          this.data.files.push({
            'name': this.file?.name,
            'url': this.downloadURL,
            'uploadedAt': new Date().getTime()
          });
        })
      ).subscribe();
    } catch (error) {
      if (!environment.production)
        console.error("PROCESS UPLOAD");
    }
  }

}
