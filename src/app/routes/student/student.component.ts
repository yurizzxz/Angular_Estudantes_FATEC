import { Component, OnInit } from '@angular/core';
import { Student } from '../../types/student';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../../services/student.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student',
  standalone: false,
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  modalOpen = false;
  formGroupStudent: FormGroup;

  constructor(
    private service: StudentService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupStudent = formBuilder.group({
      id: [''],
      name: [''],
      course: [''],
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.service.getAll().subscribe({
      next: (json) => (this.students = json),
    });
  }

  openUpdateModal(student: Student) {
    this.formGroupStudent.setValue(student);
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  save() {
    const student = this.formGroupStudent.value;
    if (!student.id) {
      this.service.save(student).subscribe({
        next: (json) => {
          this.students.push(json);
          this.formGroupStudent.reset();
          this.modalOpen = false;
          alert('Aluno cadastrado com sucesso!');
        },
      });
    } else {
      this.service.update(student).subscribe({
        next: () => {
          this.loadStudents();
          this.formGroupStudent.reset();
          this.modalOpen = false;
          alert('Aluno atualizado com sucesso!');
        },
      });
    }
  }

  update(student: Student) {
    this.formGroupStudent.setValue(student);
    this.save();
  }

  delete(student: Student) {
    this.service.delete(student).subscribe({
      next: () => {
        this.loadStudents();
        alert('Aluno removido com sucesso!');
      },
    });
  }
}
