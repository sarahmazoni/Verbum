# Verbum

## Plataforma de Aprendizagem de Idiomas

O **Verbum** é uma plataforma web de aprendizagem de idiomas baseada em vocabulário de alta frequência, gramática, expressões frequentes e acompanhamento individual do progresso do estudante.

## Objetivo

O projeto tem como objetivo disponibilizar uma plataforma que organize o aprendizado de idiomas de forma estruturada, permitindo que o usuário acompanhe seu desenvolvimento em diferentes áreas do idioma estudado.

## Funcionalidades

* Cadastro e autenticação de usuários
* Autenticação em dois fatores (2FA)
* Recuperação e alteração de senha
* Gerenciamento de perfil
* Seleção do idioma estudado
* Vocabulário de alta frequência
* Conteúdos de gramática
* Chunks e expressões frequentes
* Cognatos e falsos cognatos
* Acompanhamento do progresso
* Histórico de estudos
* Gerenciamento de consentimento
* Consulta, exportação e exclusão de dados pessoais
* Registro de eventos de auditoria

## Stack Tecnológico

### Backend

* Python
* Django

### Banco de Dados

* PostgreSQL

### Frontend

* HTML
* CSS
* Bootstrap
* JavaScript

### Arquitetura

O sistema utilizará a arquitetura **MVT (Model-View-Template)** disponibilizada pelo framework Django.

## Segurança

O projeto prevê mecanismos de segurança para proteção das contas e dos dados dos usuários, incluindo:

* Hash seguro de senhas utilizando Argon2
* Salt para proteção das credenciais
* Autenticação em dois fatores
* Controle e expiração de sessões
* Proteção contra tentativas excessivas de autenticação
* Recuperação de senha por token temporário
* Comunicação protegida por HTTPS/TLS
* Registro e auditoria de eventos de segurança

## Privacidade e LGPD

O sistema será desenvolvido considerando princípios de proteção de dados pessoais, permitindo ao usuário:

* Consultar seus dados
* Solicitar a exportação de seus dados
* Excluir sua conta
* Gerenciar seu consentimento

Os registros de consentimento considerarão informações como finalidade, data e versão do consentimento.

## Estrutura do Projeto

```text
Verbum/
├── docs/
├── src/
├── README.md
├── LICENSE
└── .gitignore
```

## Documentação

Os documentos de requisitos e escopo fornecidos para o Projeto Integrador estão disponíveis na pasta `docs`.

## Equipe

* Sarah
* Henrique
* Gabriel

## Status

Projeto em desenvolvimento.
