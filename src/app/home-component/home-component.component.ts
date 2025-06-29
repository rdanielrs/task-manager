import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent, HeaderEvent } from '../header/header.component';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.scss'
})
export class HomeComponentComponent implements OnInit, OnDestroy {
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  // Subscription para gerenciar limpeza
  private subscription = new Subscription();

  // Estado do componente
  public tasks: Task[] = [];
  public filteredTasks: Task[] = [];
  public taskStats = {
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  };

  // Formulário de nova tarefa
  public showNewTaskForm = false;
  public newTask = {
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: '',
    assignedTo: '',
    tags: ''
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Inscrever-se nas tarefas
    this.subscription.add(
      this.taskService.getTasks().subscribe(tasks => {
        this.tasks = tasks;
      })
    );

    // Inscrever-se nas tarefas filtradas
    this.subscription.add(
      this.taskService.getFilteredTasks().subscribe(filteredTasks => {
        this.filteredTasks = filteredTasks;
      })
    );

    // Inscrever-se nas estatísticas das tarefas
    this.subscription.add(
      this.taskService.getTaskStats().subscribe(stats => {
        this.taskStats = stats;
      })
    );
  }

  ngAfterViewInit(): void {
    // Inscrever-se nos eventos do cabeçalho após a inicialização da view
    this.subscription.add(
      this.headerComponent.headerEvents$.subscribe(event => {
        this.handleHeaderEvent(event);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Lidar com eventos do componente cabeçalho
  private handleHeaderEvent(event: HeaderEvent): void {
    console.log('Componente home recebeu evento:', event);

    switch (event.type) {
      case 'newTask':
        this.showNewTaskForm = true;
        break;

      case 'search':
        // A pesquisa é tratada pelo serviço
        break;
    }
  }

  // Criar nova tarefa
  public createTask(): void {
    if (this.newTask.title.trim()) {
      const taskData = {
        title: this.newTask.title,
        description: this.newTask.description,
        priority: this.newTask.priority,
        status: 'pending' as const,
        dueDate: this.newTask.dueDate ? new Date(this.newTask.dueDate) : undefined,
        assignedTo: this.newTask.assignedTo || undefined,
        tags: this.newTask.tags ? this.newTask.tags.split(',').map(tag => tag.trim()) : undefined
      };

      this.taskService.addTask(taskData);
      this.resetNewTaskForm();
      this.showNewTaskForm = false;
    }
  }

  // Cancelar criação de nova tarefa
  public cancelNewTask(): void {
    this.resetNewTaskForm();
    this.showNewTaskForm = false;
  }

  // Resetar formulário de nova tarefa
  private resetNewTaskForm(): void {
    this.newTask = {
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      assignedTo: '',
      tags: ''
    };
  }

  // Atualizar status da tarefa
  public updateTaskStatus(taskId: string, newStatus: 'pending' | 'in-progress' | 'completed'): void {
    this.taskService.updateTask(taskId, { status: newStatus });
  }

  // Excluir tarefa
  public deleteTask(taskId: string): void {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.taskService.deleteTask(taskId);
    }
  }

  // Obter cor da prioridade
  public getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  }

  // Obter cor do status
  public getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return '#10b981';
      case 'in-progress': return '#3b82f6';
      case 'pending': return '#f59e0b';
      default: return '#6b7280';
    }
  }

  // Formatar data
  public formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}
