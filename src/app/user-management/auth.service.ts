/* export class AuthService {
    loggedIn = false;
    isAuthenticated() {
      const promise = new Promise(
        (resolve, reject) => {
          setTimeout(() => {
            resolve(this.loggedIn);
          }, 800);
        }
      );
      return promise;
    }
  }
 */
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {




  constructor() { }

  logout() {
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.removeItem('token');
  }
}
