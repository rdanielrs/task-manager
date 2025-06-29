import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  private taskStatsSubject = new BehaviorSubject<{
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
  }>({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  public taskStats$ = this.taskStatsSubject.asObservable();

  private searchQuerySubject = new BehaviorSubject<string>('');
  public searchQuery$ = this.searchQuerySubject.asObservable();

  constructor() {
    // Inicializar com algumas tarefas de exemplo
    this.initializeSampleTasks();
  }

  private initializeSampleTasks(): void {
    const sampleTasks: Task[] = [
      {
        id: '1',
        title: 'Completar proposta do projeto',
        description: 'Finalizar o documento de proposta para o novo projeto do cliente',
        status: 'completed',
        priority: 'high',
        createdAt: new Date('2024-01-15'),
        dueDate: new Date('2024-01-20'),
        assignedTo: 'João Silva',
        tags: ['proposta', 'cliente']
      },
      {
        id: '2',
        title: 'Revisar mudanças no código',
        description: 'Revisar o último pull request para o branch principal',
        status: 'in-progress',
        priority: 'medium',
        createdAt: new Date('2024-01-16'),
        dueDate: new Date('2024-01-18'),
        assignedTo: 'Maria Santos',
        tags: ['revisão-código', 'desenvolvimento']
      },
      {
        id: '3',
        title: 'Atualizar documentação',
        description: 'Atualizar a documentação da API com novos endpoints',
        status: 'pending',
        priority: 'low',
        createdAt: new Date('2024-01-17'),
        dueDate: new Date('2024-01-25'),
        assignedTo: 'Miguel Oliveira',
        tags: ['documentação', 'api']
      },
      {
        id: '4',
        title: 'Configurar ambiente de desenvolvimento',
        description: 'Configurar o novo ambiente de desenvolvimento para a equipe',
        status: 'pending',
        priority: 'high',
        createdAt: new Date('2024-01-18'),
        dueDate: new Date('2024-01-22'),
        assignedTo: 'Ana Costa',
        tags: ['configuração', 'ambiente']
      }
    ];

    this.tasksSubject.next(sampleTasks);
    this.updateTaskStats();
  }

  // Obter todas as tarefas
  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  // Obter estatísticas das tarefas
  getTaskStats(): Observable<{ total: number; pending: number; inProgress: number; completed: number }> {
    return this.taskStats$;
  }

  // Adicionar nova tarefa
  addTask(task: Omit<Task, 'id' | 'createdAt'>): void {
    const newTask: Task = {
      ...task,
      id: this.generateId(),
      createdAt: new Date()
    };

    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([...currentTasks, newTask]);
    this.updateTaskStats();
  }

  // Atualizar tarefa
  updateTask(taskId: string, updates: Partial<Task>): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    );
    
    this.tasksSubject.next(updatedTasks);
    this.updateTaskStats();
  }

  // Excluir tarefa
  deleteTask(taskId: string): void {
    const currentTasks = this.tasksSubject.value;
    const filteredTasks = currentTasks.filter(task => task.id !== taskId);
    
    this.tasksSubject.next(filteredTasks);
    this.updateTaskStats();
  }

  // Pesquisar tarefas
  searchTasks(query: string): void {
    this.searchQuerySubject.next(query);
  }

  // Obter tarefas filtradas com base na pesquisa
  getFilteredTasks(): Observable<Task[]> {
    return new Observable(observer => {
      this.tasks$.subscribe(tasks => {
        this.searchQuery$.subscribe(query => {
          if (!query.trim()) {
            observer.next(tasks);
          } else {
            const filtered = tasks.filter(task =>
              task.title.toLowerCase().includes(query.toLowerCase()) ||
              task.description.toLowerCase().includes(query.toLowerCase()) ||
              task.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
            );
            observer.next(filtered);
          }
        });
      });
    });
  }

  // Atualizar estatísticas das tarefas
  private updateTaskStats(): void {
    const tasks = this.tasksSubject.value;
    const stats = {
      total: tasks.length,
      pending: tasks.filter(task => task.status === 'pending').length,
      inProgress: tasks.filter(task => task.status === 'in-progress').length,
      completed: tasks.filter(task => task.status === 'completed').length
    };
    
    this.taskStatsSubject.next(stats);
  }

  // Gerar ID único
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
} 