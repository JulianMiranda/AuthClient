import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  isLogginIn: Observable<boolean>;
  isLogginOut: Observable<boolean>;
  pictureUrl$: Observable<string>;

  constructor(private _afAuth: AngularFireAuth, private _router: Router) {}

  ngOnInit() {
    this.isLogginIn = this._afAuth.authState.pipe(map(user => !!user));
    this.isLogginOut = this.isLogginIn.pipe(map(loggedIn => !loggedIn));
    this.pictureUrl$ = this._afAuth.authState.pipe(
      map(user => (user ? user.photoURL : null))
    );
  }

  logout() {
    this._afAuth.auth.signOut();
    this._router.navigateByUrl("/");
  }
}
