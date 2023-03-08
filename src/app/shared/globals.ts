export class Globals {

  apiurl: string = "http://localhost:8080";
  lang: string = "en";
  username: string = "";
  authkey: string = "";

  logged() {
    const formData = new FormData();
    formData.append('authkey', this.authkey);
    if (this.authkey.length === 0) {
      return false
    }
    return true
  }
}
