import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppConfigService } from '../services/app-config.service';

@Component({
  selector: 'app-singleton-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './singleton-demo.component.html',
  styleUrl: './singleton-demo.component.scss'
})
export class SingletonDemoComponent implements OnInit {
  // Instâncias do Singleton para demonstração
  public configInstance1: AppConfigService;
  public configInstance2: AppConfigService;
  
  // Propriedades para demonstração
  public areSameInstance: boolean = false;
  public currentConfig: any = {};
  public newTheme: 'light' | 'dark' = 'light';
  public newLanguage: string = 'pt-BR';

  constructor() {
    // Obter instâncias do Singleton
    this.configInstance1 = AppConfigService.getInstance();
    this.configInstance2 = AppConfigService.getInstance();
    
    // Verificar se são a mesma instância
    this.areSameInstance = this.configInstance1 === this.configInstance2;
  }

  ngOnInit(): void {
    this.updateConfigDisplay();
  }

  /**
   * Demonstra que ambas as instâncias são a mesma
   */
  public demonstrateSingleton(): void {
    console.log('=== Demonstração do Padrão Singleton ===');
    console.log('Instância 1:', this.configInstance1);
    console.log('Instância 2:', this.configInstance2);
    console.log('São a mesma instância?', this.areSameInstance);
    console.log('ID da instância 1:', this.configInstance1['_appName']);
    console.log('ID da instância 2:', this.configInstance2['_appName']);
  }

  /**
   * Altera o tema usando qualquer instância
   */
  public changeTheme(): void {
    // Usar a primeira instância para alterar
    this.configInstance1.theme = this.newTheme;
    
    // Verificar se a segunda instância também foi alterada
    console.log('Tema na instância 1:', this.configInstance1.theme);
    console.log('Tema na instância 2:', this.configInstance2.theme);
    
    this.updateConfigDisplay();
  }

  /**
   * Altera o idioma usando qualquer instância
   */
  public changeLanguage(): void {
    // Usar a segunda instância para alterar
    this.configInstance2.language = this.newLanguage;
    
    // Verificar se a primeira instância também foi alterada
    console.log('Idioma na instância 1:', this.configInstance1.language);
    console.log('Idioma na instância 2:', this.configInstance2.language);
    
    this.updateConfigDisplay();
  }

  /**
   * Atualiza a exibição da configuração
   */
  private updateConfigDisplay(): void {
    this.currentConfig = this.configInstance1.getConfig();
  }

  /**
   * Demonstra que não é possível criar uma nova instância
   */
  public tryCreateNewInstance(): void {
    try {
      // @ts-ignore - Ignorar erro do TypeScript para demonstração
      const newInstance = new AppConfigService();
      console.log('Nova instância criada:', newInstance);
    } catch (error) {
      console.log('Erro ao tentar criar nova instância:', error);
      alert('Não é possível criar uma nova instância do Singleton!');
    }
  }
} 