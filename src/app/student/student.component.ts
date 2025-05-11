import { Component, OnInit } from '@angular/core'; // Importa decorador Component e interface OnInit
import { Student } from '../student'; // Importa a interface Student
import { StudentService } from '../student.service'; // Importa o serviço de estudantes
import { FormBuilder, FormGroup } from '@angular/forms'; // Importa classes para manipulação de formulários

@Component({
  selector: 'app-student', // Seletor do componente
  standalone: false, // Define que não é um componente standalone
  templateUrl: './student.component.html', // Caminho do template HTML
  styleUrl: './student.component.css', // Caminho do CSS
})
export class StudentComponent implements OnInit { // Define o componente Student
  students: Student[] = []; // Armazena a lista de estudantes
  isEditing: boolean = false; // Indica se está em modo de edição
  formGroupStudent: FormGroup; // Representa o formulário reativo

  constructor( // Construtor do componente
    private service: StudentService, // Injeta o serviço de estudantes
    private formBuilder: FormBuilder // Injeta o construtor de formulários
  ) {
    this.formGroupStudent = formBuilder.group({ // Inicializa o formulário com campos vazios
      id: [''], // Campo id
      name: [''], // Campo name
      course: [''], // Campo course
    });
  }

  ngOnInit(): void { // Método executado ao iniciar o componente
    this.loadStudents(); // Carrega os estudantes ao iniciar
  }

  loadStudents() { // Carrega todos os estudantes
    this.service.getAll().subscribe({ // Chama o serviço para buscar todos
      next: (json) => (this.students = json), // Atribui a resposta à lista de estudantes
    });
  }

  save() { // Salva um novo estudante
    this.service.save(this.formGroupStudent.value).subscribe({ // Envia os dados do formulário para salvar
      next: (json) => { // Após salvar com sucesso
        this.students.push(json); // Adiciona o novo estudante à lista
        this.formGroupStudent.reset(); // Reseta o formulário
      },
    });
  }

  onClickUpdate(student: Student) { // Ao clicar em editar um estudante
    this.formGroupStudent.setValue(student); // Preenche o formulário com os dados
    this.isEditing = true; // Ativa o modo de edição
  }

  onConfirmUpdate() { // Confirma a atualização de um estudante
    this.service.update(this.formGroupStudent.value).subscribe({ // Chama o serviço para atualizar
      next: () => { // Após atualizar com sucesso
        this.loadStudents(); // Recarrega a lista de estudantes
        this.formGroupStudent.reset(); // Reseta o formulário
        this.isEditing = false; // Sai do modo de edição
      },
    });
  }

  clear() { // Limpa o formulário
    this.formGroupStudent.reset(); // Reseta os campos do formulário
  }

  onClickDelete(student: Student) { // Ao clicar em deletar um estudante
    this.service.delete(student).subscribe({ // Chama o serviço para deletar
      next: () => this.loadStudents(), // Recarrega a lista após deletar
    });
  }
}
