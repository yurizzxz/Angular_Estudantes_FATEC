import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './routes/student/student.component';
import { CourseComponent } from './routes/course/course.component';
import { HomeComponent } from './routes/home/home.component';

const routes: Routes = [
     { path: "students", component: StudentComponent   },
     { path: "courses" , component: CourseComponent    },
     { path: ""        , component: HomeComponent      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
