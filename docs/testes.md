# Testes da Aplicação

## Projeto Integrador - Autenticação e Gestão de Credenciais

Este documento apresenta os testes realizados na aplicação Verbum durante a etapa de desenvolvimento.

Os testes foram realizados utilizando o front-end da aplicação, conforme solicitado nas orientações do Projeto Integrador.

---

## 1. Verificação do ambiente

Antes da realização dos testes funcionais, foi realizada a verificação do projeto utilizando o comando:

```bash
py manage.py check
```

### Resultado

O Django retornou:

```text
System check identified some issues:

WARNINGS:
accounts.UserProfile: (models.W042) Auto-created primary key used when not defining a primary key type, by default 'django.db.models.AutoField'.

System check identified 1 issue (0 silenced).
```

Foi identificado apenas um aviso relacionado ao tipo de chave primária utilizada no modelo `UserProfile`. Esse aviso não impede a execução da aplicação.

**Resultado: Aprovado com aviso.**

---

## 2. Inicialização da aplicação

A aplicação foi executada utilizando:

```bash
py manage.py runserver
```

O servidor foi iniciado corretamente em:

```text
http://127.0.0.1:8000/
```

A aplicação ficou disponível para acesso através do navegador.

### Resultado

**Resultado: Aprovado.**

A aplicação foi inicializada corretamente e o front-end ficou disponível para realização dos testes.

---

## 3. Acesso à tela de login

Foi acessada a tela de autenticação da aplicação.

A interface apresentou os seguintes campos e opções:

- E-mail;
- Senha;
- Botão "Entrar";
- Opção para visualizar a senha;
- Opção "Esqueci minha senha";
- Opção para cadastro de uma nova conta.

### Resultado

**Resultado: Aprovado.**

A tela de autenticação foi carregada corretamente pelo front-end.

---

## 4. Cadastro de usuário

Foi acessada a tela de cadastro através da rota:

```text
/accounts/register/
```

Foram informados os dados necessários para criação de uma conta:

- Usuário;
- E-mail;
- Senha;
- Confirmação da senha.

Com os dados válidos, a aplicação apresentou a mensagem:

```text
Usuário cadastrado com sucesso!
```

### Resultado

**Resultado: Aprovado.**

O cadastro de usuário foi realizado corretamente através do front-end.

A evidência correspondente está armazenada na pasta `docs/evidencias/`.

---

## 5. Validação da confirmação de senha

Foi realizado um teste informando senhas diferentes nos campos "Senha" e "Confirme sua senha".

A aplicação apresentou a mensagem:

```text
As senhas não coincidem.
```

O cadastro não foi concluído.

### Resultado

**Resultado: Aprovado.**

A aplicação realizou corretamente a validação da confirmação da senha.

A evidência correspondente está armazenada na pasta `docs/evidencias/`.

---

## 6. Validação do formato do e-mail

Foi realizado um teste informando um endereço de e-mail em formato inválido.

Foi utilizado um endereço sem o caractere `@`.

O navegador apresentou uma mensagem informando que o endereço de e-mail precisava conter o caractere `@`.

### Resultado

**Resultado: Aprovado.**

A validação do campo de e-mail impediu o envio de um endereço em formato inválido.

A evidência correspondente está armazenada na pasta `docs/evidencias/`.

---

## 7. Usuário já existente

Foi realizada uma tentativa de cadastro utilizando um nome de usuário que já estava cadastrado no sistema.

A aplicação identificou que o nome de usuário já estava cadastrado e apresentou a mensagem:

```text
Este nome de usuário já está cadastrado.
```

O cadastro não foi concluído.

### Resultado

**Resultado: Aprovado.**

A aplicação realizou corretamente a validação de unicidade do nome de usuário e impediu o cadastro de um usuário duplicado.

A evidência correspondente está armazenada na pasta `docs/evidencias/`.

---

## 8. Login

Foi realizado um teste de login utilizando uma conta cadastrada anteriormente.

Foram informados o e-mail e a senha cadastrados nos respectivos campos do formulário de autenticação.

Após o envio das credenciais válidas, a aplicação realizou a autenticação do usuário e redirecionou para o painel da aplicação.

O painel apresentou a identificação do usuário autenticado e os recursos disponíveis para o usuário.

### Resultado

**Resultado: Aprovado.**

O login foi realizado corretamente através do front-end e o usuário autenticado foi direcionado ao painel da aplicação.

A evidência correspondente está armazenada na pasta `docs/evidencias/`.

---

## 9. Resumo dos testes

| **Teste** | **Funcionalidade** | **Resultado** |
|---|---|---|
| 01 | Verificação do ambiente Django | Aprovado com aviso |
| 02 | Inicialização da aplicação | Aprovado |
| 03 | Tela de login | Aprovado |
| 04 | Cadastro de usuário | Aprovado |
| 05 | Confirmação de senha | Aprovado |
| 06 | Validação de e-mail | Aprovado |
| 07 | Usuário já existente | Aprovado |
| 08 | Login válido | Aprovado |

---

## 10. Observações

Os testes desta etapa foram realizados diretamente pelo front-end da aplicação.

As evidências dos testes realizados estão organizadas na pasta:

```text
docs/evidencias/
```

Os testes que apresentaram funcionamento correto foram registrados como aprovados.

O teste de usuário já existente foi corrigido para apresentar uma mensagem amigável ao usuário, em vez de exibir diretamente o erro de integridade do banco de dados.

O teste de login também foi concluído com sucesso, confirmando a autenticação das credenciais e o redirecionamento do usuário para o painel da aplicação.

Os demais testes relacionados às funcionalidades de segurança, autenticação em dois fatores, bloqueio por tentativas de login, gerenciamento de sessão e logout deverão ser registrados conforme suas respectivas evidências de funcionamento pelo front-end.
