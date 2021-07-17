export class NewEmail {
  constructor(email) {
    let emailAddress;
    if (email) {
      this.emailAddress = email;
    } else {
      const timeStamp = Math.floor(Date.now() / 1000);
      emailAddress = `cypress${timeStamp}@email.com`;
      this.emailAddress = emailAddress;
    }
  }

  getEmail() {
    return this.emailAddress;
  }
}