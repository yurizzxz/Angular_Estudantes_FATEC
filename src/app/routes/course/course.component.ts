import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../../types/course'; // Certifique-se de importar o tipo Course
import { CoursesService } from '../../services/courses.service'; // Serviço de cursos

@Component({
  selector: 'app-course',
  standalone: false,
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent {
  courses: Course[] = []; 
  modalOpen = false;
  formGroupCourse: FormGroup; 

  constructor(
    private service: CoursesService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupCourse = formBuilder.group({
      id: [''],
      name: [''],
      level: [''],
      categories: [[]],
      duration: [''],
      active: [false],
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.service.getAll().subscribe({
      next: (json) => (this.courses = json),
    });
  }

  openUpdateModal(course: Course) {
    this.formGroupCourse.setValue(course);
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  save() {
    const course = this.formGroupCourse.value;
    if (!course.id) {
      this.service.save(course).subscribe({
        next: (json) => {
          this.courses.push(json);
          this.formGroupCourse.reset();
          this.modalOpen = false;
          alert('Curso cadastrado com sucesso!');
        },
      });
    } else {
      this.service.update(course).subscribe({
        next: () => {
          this.loadCourses();
          this.formGroupCourse.reset();
          this.modalOpen = false;
          alert('Curso atualizado com sucesso!');
        },
      });
    }
  }

  update(course: Course) {
    this.formGroupCourse.setValue(course);
    this.save();
  }

  delete(course: Course) {
    this.service.delete(course).subscribe({
      next: () => {
        this.loadCourses();
        alert('Curso removido com sucesso!');
      },
    });
  }
}
