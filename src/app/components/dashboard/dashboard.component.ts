import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  student: any;
  studentObj: Student = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: ''
  };
  id = '';
  first_name=   '';
  last_name = '';
  email = '';
  mobile = '';


  StudentList: Student[] = []

  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }
  getAllStudents() {
    this.data.getAllStudents().subscribe(res => {
      this.StudentList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('error while fetching students data')

    })
  }
  resetForm() {
    this.id = ''; 
    this.email = '';
    this.mobile = '';
    this.first_name = '';
    this.last_name= '';
  }

  addStudent() {
    if (this.first_name == '' || this.last_name == '' || this.email == '' || this.mobile == '') {
      alert('fill all input fields')
      return;
    }

    this.studentObj.id = '';
    this.studentObj.id = this.email;
    this.studentObj.id = this.first_name;
    this.studentObj.id = this.last_name;
    this.studentObj.id = this.mobile;

    this.data.addStudent(this.studentObj)
    this.resetForm()
  }

  updateStudent() {

  }
  deleteStudent(student: Student) {
    if (window.confirm('Are you sure you want to delete' + student.first_name + '' + student.last_name + ' ?')) {
      this.data.deleteStudent(student)
    }
  }

  // register() {
  //   this.auth.logout();
  // }
}
