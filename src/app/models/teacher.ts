export class Teacher {
  t_id: string;
  name: string;
  username: string;
  contact: string;
  address: string;
  subjects: string[];

  constructor() {}

  // constructor(t_id, username, contact, address) {
  //   this.t_id = t_id;
  //   this.username = username;
  //   this.name = name;
  //   this.contact = contact;
  //   this.address = address;
  // }

  setDetails(t_id, username, name, contact, address) {
    this.t_id = t_id;
    this.name = name;
    this.username = username;
    this.contact = contact;
    this.address = address;
  }

  setSubjects(subjects) {
    this.subjects = subjects;
  }
}
