import { Component, OnInit, NgZone, OnDestroy } from "@angular/core";
import * as firebaseui from "firebaseui";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
  ui: firebaseui.auth.AuthUI;

  constructor(
    private _afAuth: AngularFireAuth,
    private _router: Router,
    private _ngZone: NgZone
  ) {}

  ngOnInit() {
    const uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
      }
    };
    this.ui = new firebaseui.auth.AuthUI(this._afAuth.auth);
    this.ui.start("#firebaseui-auth-container", uiConfig);
  }

  onLoginSuccessful(result) {
    this._ngZone.run(() => {
      this._router.navigateByUrl("/token");
    });
  }

  ngOnDestroy(): void {
    this.ui.delete();
  }
}
