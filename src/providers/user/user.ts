import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  firedata = firebase.database().ref('/chatusers');
  constructor(public afireauth: AngularFireAuth) {
    console.log('Hello UserProvider Provider');
  }

  adduser(newUser) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password).then(() => {
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newUser.displayName,
          photoURL: ''
        }).then(() => {
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            displayName: newUser.displayName,
            photoURL: 'https://cdn-images-1.medium.com/max/1600/1*AoarrKQjCE0zVJkxl9za8Q.jpeg'
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err);
          })
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }
}
