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
System check identified no issues (0 silenced).
```

Não foram identificados problemas de configuração pelo sistema de verificações do Django.

**Resultado: Aprovado.**

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

O Django retornou um erro relacionado à restrição de unicidade do campo `username`:

```text
UNIQUE constraint failed: auth_user.username
```

### Resultado

**Resultado: Identificado.**

A restrição de unicidade está funcionando no banco de dados, impedindo a existência de dois usuários com o mesmo nome de usuário.

Porém, durante o teste, o erro foi apresentado diretamente pelo Django. O ideal é que essa situação seja tratada pela aplicação e apresentada ao usuário através de uma mensagem mais amigável.

A evidência correspondente está armazenada na pasta `docs/evidencias/`.

---

## 8. Login

Foi realizada uma tentativa de login utilizando uma conta cadastrada anteriormente.

Durante o teste inicial, foi identificado um problema relacionado à proteção CSRF.

Após a alteração da forma de renderização da página de login, o erro de CSRF deixou de ser apresentado.

Entretanto, foi identificado que o formulário ainda estava realizando o envio para:

```text
POST /homePage/
```

em vez de encaminhar os dados para a rota responsável pela autenticação:

```text
/accounts/login/
```

Por esse motivo, o login ainda não foi considerado aprovado nesta etapa.

### Resultado

**Resultado: Em teste.**

O funcionamento do login será novamente verificado após a correção do formulário de autenticação.

---

## 9. Resumo dos testes

| Teste | Funcionalidade | Resultado |
|---|---|---|
| 01 | Verificação do ambiente Django | Aprovado |
| 02 | Inicialização da aplicação | Aprovado |
| 03 | Tela de login | Aprovado |
| 04 | Cadastro de usuário | Aprovado |
| 05 | Confirmação de senha | Aprovado |
| 06 | Validação de e-mail | Aprovado |
| 07 | Usuário já existente | Identificado |
| 08 | Login válido | Em teste |

---

## 10. Observações

Os testes desta etapa foram realizados diretamente pelo front-end da aplicação.

As evidências dos testes realizados estão organizadas na pasta:

```text
docs/evidencias/
```

Os testes que apresentaram funcionamento correto foram registrados como aprovados.

O teste de login permanece em desenvolvimento devido à inconsistência identificada no envio do formulário.

Os resultados serão atualizados após a conclusão dos testes restantes da funcionalidade de autenticação.
