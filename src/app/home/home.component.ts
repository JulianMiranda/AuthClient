import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { ClipboardService } from "ngx-clipboard";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  token: any;

  constructor(
    private _afAuth: AngularFireAuth,
    private _clipboardService: ClipboardService
  ) {}

  ngOnInit() {
    this._afAuth.authState.subscribe(obj => {
      if (obj) {
        obj.getIdToken(true).then(idToken => (this.token = idToken));
      }
    });
  }

  copy() {
    this._clipboardService.copyFromContent(this.token);
  }
}
