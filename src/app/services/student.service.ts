import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../types/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  save(student:Student): Observable<Student>{
    return this.http.post<Student>(this.apiUrl, student)
  }

  update(student:Student): Observable<Student>{
    return this.http.put<Student>(`${this.apiUrl}/${student.id}`, student);
  }

  delete(student:Student): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${student.id}`);
  } 

}