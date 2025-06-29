import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  // Informações de contato
  public contactInfo = {
    email: 'contato@gerenciadortarefas.com',
    phone: '+55 (11) 99999-9999',
    address: 'São Paulo, SP - Brasil',
    workingHours: 'Segunda a Sexta, 9h às 18h'
  };

  // Formulário de contato
  public contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // Redes sociais
  public socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: '💼'
    },
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: '🐙'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: '🐦'
    }
  ];

  /**
   * Enviar formulário de contato
   */
  public submitForm(): void {
    if (this.validateForm()) {
      console.log('Formulário enviado:', this.contactForm);
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      this.resetForm();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  /**
   * Validar formulário
   */
  private validateForm(): boolean {
    return this.contactForm.name.trim() !== '' &&
           this.contactForm.email.trim() !== '' &&
           this.contactForm.subject.trim() !== '' &&
           this.contactForm.message.trim() !== '';
  }

  /**
   * Resetar formulário
   */
  private resetForm(): void {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
} 