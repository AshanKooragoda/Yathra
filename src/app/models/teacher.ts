export class Teacher {
  t_id: string;
  name: string;
  username: string;
  contact: string;
  address: string;

  subjects: any[];

  constructor() {
    this.subjects = [];
  }

  setDetails(t_id, username, name, contact, address) {
    this.t_id = t_id;
    this.username = username;
    this.name = name;
    this.contact = contact;
    this.address = address;
  }

  setSubjects(subjects) {
    this.subjects = subjects;
  }
}
