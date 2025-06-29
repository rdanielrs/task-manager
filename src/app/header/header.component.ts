import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { TaskService } from '../services/task.service';

export interface HeaderEvent {
  type: 'newTask' | 'search';
  data?: any;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Observable para enviar eventos para componentes pai
  private headerEvents = new Subject<HeaderEvent>();
  public headerEvents$ = this.headerEvents.asObservable();

  // Subscription para gerenciar limpeza
  private subscription = new Subscription();

  // Estado do componente
  public notificationCount = 0;
  public searchQuery = '';

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inscrever-se nas estatísticas das tarefas para atualizar contagem de notificações
    this.subscription.add(
      this.taskService.getTaskStats().subscribe(stats => {
        this.notificationCount = stats.pending;
      })
    );

    // Inscrever-se nas mudanças da consulta de pesquisa
    this.subscription.add(
      this.taskService.searchQuery$.subscribe(query => {
        this.searchQuery = query;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Lidar com clique no botão nova tarefa
  public onNewTaskClick(): void {
    this.headerEvents.next({
      type: 'newTask',
      data: { timestamp: new Date() }
    });
  }

  // Lidar com entrada de pesquisa
  public onSearchChange(query: string): void {
    this.searchQuery = query;
    this.taskService.searchTasks(query);
    this.headerEvents.next({
      type: 'search',
      data: { query }
    });
  }

  // Verificar se a rota atual está ativa
  public isActiveRoute(route: string): boolean {
    return this.router.url === route || 
           (route === '/home' && this.router.url === '/');
  }
} 