import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ApiResponse } from './api-response';
export class Globals {

  apiurl: string = "https://api.gschmackig.acacialinux.org";
  lang: string = "en";

  logged(cs: CookieService) {
    let authkey = this.getAuthkey(cs);
    if (!authkey || authkey.length == 0) {
      return false
    }
    return true
  }

  async login(http: HttpClient, cs: CookieService,  username: string, password: string): Promise<string | undefined> {
    try {
      const formData = new FormData();
      formData.append('user', username);
      formData.append('pass', password);
      let response = await http.post<ApiResponse>(this.apiurl + '/auth', formData).toPromise();
      if (response.response_code === 200) {
        this.setAuthkey(cs, response.payload);
        this.setUname(cs, username);
        return;
      } else {
        return response.payload;
      }
    } catch(err) {
      return "" + err;
    }
  }

  async logoff(http: HttpClient, cs: CookieService): Promise<undefined> {
    try {
      let formdata = new FormData();
      let authkey = this.getAuthkey(cs);
      authkey ? formdata.append('authkey', authkey) : {};
      let response = await http.post<ApiResponse>(this.apiurl + '/logoff', formdata).toPromise();
      if (response.response_code !== 200) {
        console.error(response.payload);
      }
      this.reset(cs);
      return;
    } catch(err) {
      console.error(err)
      return;
    }
  }

  async signup(http: HttpClient, cs: CookieService, username: string, password: string): Promise<string | undefined> {
    try {
      let formData = new FormData();
      formData.append('cuser', username);
      formData.append('cpass', password);
      let response = await http.post<ApiResponse>(this.apiurl + '/createuser', formData).toPromise();
      if (response.response_code === 200) {
        let response = await this.login(http, cs, username, password);
        return response;
      } else {
        return response.payload;
      }
    } catch(err) {
      return "" + err;
    }
  }

  reset(cs: CookieService) {
    cs.set('username', "");
    cs.set('authkey', "");
  }

  getStars(stars: number | undefined) {
    let ret = "";
    if (stars) {
      for (let i = 0; i < Math.floor(stars); i++) {
        ret += '★';
      }
      stars % 1 != 0 ? ret += '⯪' : {};
    } else {
      ret = '☆';
    }
    return ret
  }

  getUname(cs: CookieService) {
    if (cs.get('username')) {
      return cs.get('username');
    }
    return;
  }

  getAuthkey(cs: CookieService) {
    if (cs.get('authkey')) {
      return cs.get('authkey');
    }
    return;
  }

  setUname(cs: CookieService, username: string) {
    cs.set('username', username);
  }

  setAuthkey(cs: CookieService, authkey: string) {
    cs.set('authkey', authkey)
  }

  async checkApiAuth(http: HttpClient, cs: CookieService): Promise<boolean> {
    try {
      let formData = new FormData();
      let authkey = this.getAuthkey(cs);
      authkey ? formData.append('authkey', authkey) : {};
      if((await http.post<ApiResponse>(this.apiurl + '/checkauth', formData).toPromise()).response_code !== 200) {
        return false;
      } else {
        return true;
      }
    } catch(err) {
      return false;
    }
  }

}
