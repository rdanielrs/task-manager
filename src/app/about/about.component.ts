import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  // Informações sobre o projeto
  public projectInfo = {
    name: 'Gerenciador de Tarefas',
    version: '1.0.0',
    description: 'Uma aplicação moderna para gerenciamento de tarefas e projetos',
    features: [
      'Criação e gerenciamento de tarefas',
      'Sistema de prioridades',
      'Filtros e pesquisa avançada',
      'Interface responsiva',
      'Padrões de design implementados'
    ],
    technologies: [
      'Angular 17',
      'TypeScript',
      'SCSS',
      'RxJS',
      'Padrões de Design'
    ]
  };
} 