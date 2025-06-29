/**
 * Exemplo de Padrão Singleton Tradicional
 * Esta classe demonstra como implementar o padrão Singleton em TypeScript
 */
export class AppConfigService {
  // Instância única (private static)
  private static instance: AppConfigService;
  
  // Propriedades da configuração
  private _appName: string = 'Gerenciador de Tarefas';
  private _version: string = '1.0.0';
  private _theme: 'light' | 'dark' = 'light';
  private _language: string = 'pt-BR';
  private _maxTasks: number = 100;

  // Construtor privado (impede instanciação direta)
  private constructor() {
    console.log('AppConfigService Singleton criado');
  }

  /**
   * Método estático para obter a instância única
   * Garante que apenas uma instância existe em toda a aplicação
   */
  public static getInstance(): AppConfigService {
    if (!AppConfigService.instance) {
      AppConfigService.instance = new AppConfigService();
    }
    return AppConfigService.instance;
  }

  // Getters e Setters para as propriedades
  get appName(): string {
    return this._appName;
  }

  set appName(value: string) {
    this._appName = value;
  }

  get version(): string {
    return this._version;
  }

  get theme(): 'light' | 'dark' {
    return this._theme;
  }

  set theme(value: 'light' | 'dark') {
    this._theme = value;
    console.log(`Tema alterado para: ${value}`);
  }

  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
    console.log(`Idioma alterado para: ${value}`);
  }

  get maxTasks(): number {
    return this._maxTasks;
  }

  set maxTasks(value: number) {
    this._maxTasks = value;
  }

  /**
   * Método para obter todas as configurações
   */
  public getConfig(): object {
    return {
      appName: this._appName,
      version: this._version,
      theme: this._theme,
      language: this._language,
      maxTasks: this._maxTasks
    };
  }

  /**
   * Método para resetar a instância (útil para testes)
   */
  public static resetInstance(): void {
    AppConfigService.instance = undefined as any;
  }
} 