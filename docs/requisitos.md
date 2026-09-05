# Checklist de Requisitos

## Projeto Integrador - Autenticação e Gestão de Credenciais

Este documento apresenta os requisitos relacionados à autenticação e gestão de credenciais implementados no projeto Verbum.

A documentação foi feita com base nas funcionalidades presentes no código do projeto. Os testes dos requisitos são realizados através da interface da aplicação (front-end).

---

## 1. Cadastro de usuário

**Status:** Implementado

O sistema possui uma tela de cadastro onde o usuário informa os dados necessários para criar uma conta.

Durante o cadastro, o sistema verifica se a senha e a confirmação de senha são iguais. Caso sejam diferentes, o cadastro não é realizado e uma mensagem de erro é apresentada.

O sistema também verifica se o nome de usuário já está cadastrado. Caso o usuário já exista, o cadastro não é realizado e uma mensagem de erro é apresentada.

Quando os dados estão corretos, o usuário é criado utilizando o método `create_user()` do Django.

A implementação está localizada em:

`accounts/views.py`

Função:

`register()`

### Evidências

- `01-cadastro-sucesso.png` - demonstra o cadastro de um usuário realizado com sucesso.
- `02-senhas-diferentes.png` - demonstra a rejeição do cadastro quando as senhas informadas são diferentes.
- `08-usuario-ja-existente.png` - demonstra a rejeição do cadastro quando o nome de usuário já está cadastrado.

---

## 2. Login

**Status:** Implementado

O sistema possui uma tela de login onde o usuário informa seu e-mail e senha.

Primeiro, o sistema verifica se existe um usuário cadastrado com o e-mail informado. A busca pelo e-mail não diferencia letras maiúsculas de minúsculas.

Depois, o sistema utiliza o mecanismo de autenticação do Django para verificar a senha informada.

Caso as credenciais estejam corretas, o usuário pode continuar o processo de autenticação.

Caso as credenciais estejam incorretas, o sistema apresenta uma mensagem informando que o e-mail ou a senha são inválidos.

A implementação está localizada em:

`accounts/views.py`

Função:

`login_view()`

### Evidências

- `03-tela-login.png` - demonstra a tela de acesso à conta.
- `04-email-invalido.png` - demonstra a validação do formato do e-mail informado.
- `05-painel-com-login.png` - demonstra o acesso ao painel após a autenticação.

---

## 3. Proteção contra várias tentativas de login

**Status:** Implementado

O sistema possui um mecanismo de proteção contra várias tentativas de login incorretas.

O usuário pode realizar até 5 tentativas de login com senha incorreta. Ao atingir esse limite, a conta é temporariamente bloqueada durante 5 minutos.

Durante o período de bloqueio, novas tentativas de acesso são impedidas e o sistema apresenta uma mensagem informando que a conta está temporariamente bloqueada.

Após o término do período de bloqueio, a conta é liberada e o contador de tentativas incorretas é reiniciado.

Para controlar esse processo, o projeto utiliza os campos:

- `failed_login_attempts`
- `locked_until`

Esses campos estão presentes no modelo `UserProfile`.

A lógica de controle das tentativas está implementada em:

`accounts/views.py`

A configuração utilizada é:

- Máximo de tentativas: `5`
- Duração do bloqueio: `5 minutos`

### Evidência

- `09-bloqueio-tentativas.png` - demonstra o bloqueio temporário da conta após várias tentativas de login incorretas.

---

## 4. Autenticação em dois fatores (2FA)

**Status:** Implementado

O projeto possui autenticação em dois fatores utilizando TOTP.

O usuário pode realizar a configuração do segundo fator através da aplicação. Para isso, o projeto utiliza a biblioteca `pyotp`.

Durante o login, quando o 2FA está ativado, a senha correta não é suficiente para concluir o acesso. O usuário precisa informar também o código gerado pelo segundo fator.

O projeto utiliza os seguintes campos no `UserProfile`:

- `totp_secret`
- `two_factor_enabled`

As principais funções relacionadas ao 2FA estão em:

`accounts/views.py`

- `setup_2fa()`
- `verify_2fa()`

### Evidências

- `06-setup2fa-sem-login.png` - demonstra a proteção da configuração do 2FA, impedindo o acesso de usuários não autenticados.
- `07-verifica-2fa.png` - demonstra a tela de verificação do código de autenticação em dois fatores.

---

## 5. Gerenciamento de sessão

**Status:** Implementado

O projeto utiliza o sistema de sessões do Django para controlar o acesso dos usuários autenticados.

O painel do sistema é protegido pelo `@login_required`, fazendo com que somente usuários autenticados possam acessá-lo.

A sessão está configurada para durar 30 minutos e o projeto utiliza `SESSION_SAVE_EVERY_REQUEST` para atualizar a sessão enquanto o usuário continua utilizando a aplicação.

O cookie de sessão também está configurado como `HttpOnly`.

Essas configurações estão no arquivo:

`Verbum/settings.py`

### Evidências

- `05-painel-com-login.png` - demonstra o acesso ao painel após a autenticação.
- `06-setup2fa-sem-login.png` - demonstra que uma página protegida não pode ser acessada sem autenticação.

---

## 6. Logout

**Status:** Implementado

O sistema possui uma opção de logout para que o usuário possa encerrar sua sessão.

A função responsável por isso utiliza o mecanismo de logout disponibilizado pelo Django.

Após sair da conta, o usuário é redirecionado para a tela de login.

A implementação está localizada em:

`accounts/views.py`

Função:

`logout_view()`

---

## 7. Validação de senha

**Status:** Implementado

O projeto utiliza os validadores de senha disponibilizados pelo Django.

Entre as validações configuradas estão:

- comparação com informações do usuário;
- tamanho mínimo da senha;
- verificação de senhas comuns;
- verificação de senha formada somente por números.

Essas configurações estão presentes no arquivo:

`Verbum/settings.py`

### Evidência

- `10-teste_validacao_senha.png` - demonstra que o sistema rejeita uma senha que não atende aos critérios de segurança configurados.

---

## 8. Resumo dos requisitos implementados

| Requisito | Status |
| --- | --- |
| Cadastro de usuário | Implementado |
| Login | Implementado |
| Proteção contra tentativas excessivas | Implementado |
| Autenticação em dois fatores | Implementado |
| Gerenciamento de sessão | Implementado |
| Logout | Implementado |
| Validação de senha | Implementado |
| Recuperação de senha | Implementado |

---

## 9. Forma de comprovação

Os requisitos são comprovados por meio das evidências de funcionamento disponíveis na pasta `docs/evidencias`.

Os testes foram realizados utilizando o front-end da aplicação, conforme solicitado nas instruções do Projeto Integrador.

As evidências disponíveis estão relacionadas aos respectivos requisitos e demonstram o funcionamento prático das funcionalidades testadas.

As evidências foram registradas por meio de capturas de tela da aplicação durante a realização dos testes.

---

## 10. Recuperação de senha

**Status:** Implementado

O sistema permite redefinir a senha por token temporário.

O usuário solicita a recuperação pela tela de login, informa o
e-mail e recebe um link com token. O token tem prazo de validade,
é invalidado depois do uso e falha quando está expirado ou
adulterado.

A implementação está em:

`accounts/views.py`

Classes:

- `PasswordResetRequestView`
- `PasswordResetConfirmView`

As rotas estão em `accounts/urls.py`.

O tempo de expiração está em `Verbum/settings.py`
(`PASSWORD_RESET_TIMEOUT`).

A solicitação, o sucesso e a falha do token são registrados em log,
sem armazenar o token nem a senha.

### Evidências

- `11-login-esqueci-senha.png`
- `12-form-recuperacao.png`
- `13-email-enviado.png`
- `14-email-console.png`
- `15-nova-senha.png`
- `16-reset-sucesso.png`
- `17-token-reutilizado.png`
- `18-token-invalido.png`
- `19-log-solicitacao.png`
- `20-log-sucesso.png`
- `21-log-falha-token.png`

O detalhamento técnico está em `docs/recuperacao-senha.md`.
