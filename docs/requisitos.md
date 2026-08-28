# Checklist de Requisitos
## Projeto Integrador - Autenticação e Gestão de Credenciais

Este documento apresenta os requisitos relacionados à autenticação e
gestão de credenciais implementados no projeto Verbum.

A documentação foi feita com base nas funcionalidades presentes no
código do projeto. Os testes dos requisitos são realizados através
da interface da aplicação (front-end).

---

## 1. Cadastro de usuário

**Status:** Implementado

O sistema possui uma tela de cadastro onde o usuário informa os dados
necessários para criar uma conta.

Durante o cadastro, o sistema verifica se a senha e a confirmação de
senha são iguais. Caso sejam diferentes, o cadastro não é realizado
e uma mensagem de erro é apresentada.

Quando os dados estão corretos, o usuário é criado utilizando o
método `create_user()` do Django.

A implementação está localizada em:

`accounts/views.py`

Função:

`register()`

---

## 2. Login

**Status:** Implementado

O sistema possui uma tela de login onde o usuário informa seu e-mail
e senha.

Primeiro, o sistema verifica se existe um usuário cadastrado com o
e-mail informado. Depois, utiliza o mecanismo de autenticação do
Django para verificar a senha.

Caso as credenciais estejam corretas, o usuário pode continuar o
processo de autenticação.

Caso estejam incorretas, o sistema apresenta uma mensagem informando
que as credenciais são inválidas.

A implementação está localizada em:

`accounts/views.py`

Função:

`login_view()`

---

## 3. Proteção contra várias tentativas de login

**Status:** Implementado

Foi implementado um controle para evitar que o usuário possa realizar
tentativas de login sem limite.

O sistema permite até 5 tentativas de login incorretas. Depois disso,
a conta fica temporariamente bloqueada durante 5 minutos.

Para controlar esse processo, o projeto utiliza as informações:

- `failed_login_attempts`
- `locked_until`

Esses campos estão presentes no modelo `UserProfile`.

A lógica de controle das tentativas está implementada em:

`accounts/views.py`

---

## 4. Autenticação em dois fatores (2FA)

**Status:** Implementado

O projeto possui autenticação em dois fatores utilizando TOTP.

O usuário pode realizar a configuração do segundo fator através da
aplicação. Para isso, o projeto utiliza a biblioteca `pyotp`.

Durante o login, quando o 2FA está ativado, a senha correta não é
suficiente para concluir o acesso. O usuário precisa informar também
o código gerado pelo segundo fator.

O projeto utiliza os seguintes campos no `UserProfile`:

- `totp_secret`
- `two_factor_enabled`

As principais funções relacionadas ao 2FA estão em:

`accounts/views.py`

- `setup_2fa()`
- `verify_2fa()`

---

## 5. Gerenciamento de sessão

**Status:** Implementado

O projeto utiliza o sistema de sessões do Django para controlar o
acesso dos usuários autenticados.

O painel do sistema é protegido pelo `@login_required`, fazendo com
que somente usuários autenticados possam acessá-lo.

A sessão está configurada para durar 30 minutos e o projeto utiliza
`SESSION_SAVE_EVERY_REQUEST` para atualizar a sessão enquanto o
usuário continua utilizando a aplicação.

O cookie de sessão também está configurado como `HttpOnly`.

Essas configurações estão no arquivo:

`Verbum/settings.py`

---

## 6. Logout

**Status:** Implementado

O sistema possui uma opção de logout para que o usuário possa
encerrar sua sessão.

A função responsável por isso utiliza o mecanismo de logout
disponibilizado pelo Django.

Após sair da conta, o usuário é redirecionado para a tela de login.

A implementação está localizada em:

`accounts/views.py`

Função:

`logout_view()`

---

## 7. Validação de senha

**Status:** Implementado

O projeto utiliza os validadores de senha disponibilizados pelo
Django.

Entre as validações configuradas estão:

- comparação com informações do usuário;
- tamanho mínimo da senha;
- verificação de senhas comuns;
- verificação de senha formada somente por números.

Essas configurações estão presentes no arquivo:

`Verbum/settings.py`

---

## 8. Resumo dos requisitos implementados

| Requisito | Status |
|---|---|
| Cadastro de usuário | Implementado |
| Login | Implementado |
| Proteção contra tentativas excessivas | Implementado |
| Autenticação em dois fatores | Implementado |
| Gerenciamento de sessão | Implementado |
| Logout | Implementado |
| Validação de senha | Implementado |

---

## 9. Forma de comprovação

Os requisitos serão comprovados através da execução da aplicação.

Os testes serão realizados utilizando o front-end, conforme solicitado
nas instruções do Projeto Integrador.

Para cada funcionalidade serão registradas evidências do funcionamento
da aplicação.
