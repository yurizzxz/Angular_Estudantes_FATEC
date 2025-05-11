import { HttpClient } from '@angular/common/http'; // Importa o cliente HTTP para requisições
import { Injectable } from '@angular/core'; // Importa o decorador Injectable
import { Student } from './student'; // Importa o modelo Student
import { Observable } from 'rxjs'; // Importa Observable para tipos reativos

@Injectable({
  providedIn: 'root', // Torna o serviço disponível em toda a aplicação
})
export class StudentService { // Define a classe do serviço
  apiUrl = 'http://localhost:3000/students'; // URL base da API de estudantes

  constructor(private http: HttpClient) {} // Injeta o HttpClient

  getAll(): Observable<Student[]> { // Busca todos os estudantes
    return this.http.get<Student[]>(this.apiUrl); // Requisição GET para a API
  }

  save(student: Student): Observable<Student> { // Salva um novo estudante
    return this.http.post<Student>(this.apiUrl, student); // Requisição POST com os dados do estudante
  }

  update(student: Student): Observable<Student> { // Atualiza um estudante
    return this.http.put<Student>(`${this.apiUrl}/${student.id}`, student); // Requisição PUT usando o ID
  }

  delete(student: Student): Observable<void> { // Deleta um estudante
    return this.http.delete<void>(`${this.apiUrl}/${student.id}`); // Requisição DELETE usando o ID
  } 
}
