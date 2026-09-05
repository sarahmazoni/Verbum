# Documentação da Implementação
## Projeto Integrador - Autenticação e Gestão de Credenciais

Este documento explica como foram implementadas as principais
funcionalidades de autenticação e gestão de credenciais do projeto
Verbum.

A descrição foi feita com base no código desenvolvido no projeto,
relacionando cada funcionalidade aos arquivos e funções responsáveis
por sua execução.

---

## 1. Cadastro de usuário

O cadastro é realizado através da função `register()`, localizada
no arquivo `accounts/views.py`.

O usuário acessa a tela de cadastro e informa os dados solicitados
pela aplicação.

Antes de criar a conta, o sistema verifica se a senha informada é
igual à confirmação da senha.

Quando os dados estão corretos, o usuário é criado utilizando o
método `create_user()` do Django.

Esse método é utilizado para realizar a criação do usuário de acordo
com o sistema de autenticação do Django.

### Fluxo

1. Usuário acessa a tela de cadastro.
2. Informa os dados.
3. Sistema verifica os campos.
4. Sistema compara a senha com a confirmação.
5. Usuário é criado.
6. Sistema apresenta o resultado do cadastro.

---

## 2. Login

O login é implementado pela função `login_view()`, localizada em:

`accounts/views.py`

O usuário informa seu e-mail e senha através do front-end.

O sistema verifica se existe um usuário correspondente ao e-mail
informado e utiliza o mecanismo `authenticate()` do Django para
validar as credenciais.

Quando as credenciais são válidas, o processo de autenticação
continua.

Quando são inválidas, o sistema informa o usuário através da
interface.

### Fluxo

1. Usuário informa e-mail e senha.
2. Sistema procura o usuário.
3. Sistema verifica as credenciais.
4. Caso estejam corretas, o processo continua.
5. Caso o 2FA esteja desativado, o login pode ser concluído.
6. Caso o 2FA esteja ativado, o usuário precisa realizar a segunda
   etapa de autenticação.

---

## 3. Controle de tentativas de login

O projeto possui um mecanismo para limitar tentativas de login
incorretas.

Foram definidos os seguintes valores:

- 5 tentativas máximas;
- 5 minutos de bloqueio.

A aplicação utiliza os campos `failed_login_attempts` e
`locked_until`, presentes no modelo `UserProfile`.

Quando o usuário ultrapassa o número permitido de tentativas,
o sistema registra o período de bloqueio.

Após o período definido, o acesso pode ser tentado novamente.

Esse mecanismo ajuda a reduzir tentativas repetidas de descoberta
de senha.

---

## 4. Autenticação em dois fatores

O projeto utiliza autenticação em dois fatores baseada em TOTP.

A implementação utiliza a biblioteca `pyotp`.

O modelo `UserProfile` possui os campos:

- `totp_secret`;
- `two_factor_enabled`.

O segredo é utilizado para gerar e validar os códigos do segundo
fator.

### Configuração do 2FA

A configuração é realizada pela função:

`setup_2fa()`

localizada em:

`accounts/views.py`

Durante esse processo, o sistema gera o segredo necessário para
a utilização do segundo fator.

### Verificação do 2FA

A validação do código é realizada pela função:

`verify_2fa()`

Quando o usuário possui o segundo fator ativado, o login não é
concluído somente com a senha.

O usuário precisa informar o código TOTP.

### Fluxo do login com 2FA

1. Usuário informa e-mail e senha.
2. Sistema verifica as credenciais.
3. Sistema verifica se o 2FA está ativado.
4. Caso esteja ativado, o usuário é encaminhado para a tela
   de verificação.
5. Usuário informa o código TOTP.
6. Sistema verifica o código.
7. Caso o código seja válido, o login é concluído.

---

## 5. Gerenciamento de sessão

O gerenciamento de sessão utiliza os recursos fornecidos pelo
Django.

O painel da aplicação possui proteção através do decorator:

`@login_required`

Isso impede que usuários não autenticados acessem páginas que
necessitam de autenticação.

As configurações relacionadas à sessão estão em:

`Verbum/settings.py`

A duração da sessão foi configurada para 30 minutos.

Também foi utilizado:

`SESSION_SAVE_EVERY_REQUEST = True`

Essa configuração permite atualizar a sessão enquanto o usuário
continua realizando requisições na aplicação.

O cookie de sessão também possui a configuração:

`SESSION_COOKIE_HTTPONLY = True`

Essa configuração impede que scripts executados no navegador
acessem diretamente o cookie através de JavaScript.

---

## 6. Logout

O logout é implementado pela função:

`logout_view()`

localizada em:

`accounts/views.py`

A função utiliza o mecanismo `logout()` fornecido pelo Django.

Depois do logout, o usuário é redirecionado para a tela de login.

### Fluxo

1. Usuário autenticado seleciona a opção de sair.
2. A função de logout é executada.
3. A sessão de autenticação é encerrada.
4. Usuário é redirecionado para a tela de login.

---

## 7. Validação de senhas

O projeto utiliza os validadores de senha disponibilizados pelo
Django.

As configurações estão presentes no arquivo:

`Verbum/settings.py`

Entre os validadores utilizados estão:

- `UserAttributeSimilarityValidator`;
- `MinimumLengthValidator`;
- `CommonPasswordValidator`;
- `NumericPasswordValidator`.

Esses validadores ajudam a evitar a utilização de senhas muito
fracas ou inadequadas.

---

## 8. Estrutura relacionada à autenticação

Os principais arquivos utilizados nesta parte do projeto são:

### `accounts/views.py`

Contém a lógica das principais funcionalidades de autenticação,
incluindo:

- cadastro;
- login;
- controle de tentativas;
- configuração do 2FA;
- verificação do 2FA;
- logout.

### `accounts/models.py`

Contém o modelo `UserProfile`, que possui informações utilizadas
no controle de autenticação, incluindo:

- `totp_secret`;
- `two_factor_enabled`;
- `failed_login_attempts`;
- `locked_until`.

### `accounts/urls.py`

Define as rotas utilizadas pelas funcionalidades de autenticação,
como cadastro, login, painel, configuração do 2FA, verificação do
2FA e logout.

### `Verbum/settings.py`

Contém configurações relacionadas à autenticação, sessões e
validação de senhas.

---

## 9. Considerações

As funcionalidades descritas neste documento correspondem às
implementações presentes no código atual do projeto.

A comprovação do funcionamento será realizada através dos testes
da aplicação e das evidências obtidas pelo front-end.

## 10. Recuperação de senha

A recuperação de senha utiliza as views do Django, com classes
próprias para registrar os eventos.

Arquivo: `accounts/views.py`

- `PasswordResetRequestView` — pedido do e-mail e log da solicitação
- `PasswordResetConfirmView` — validação do token, nova senha e logs
  de sucesso ou de token inválido

### Fluxo

1. Usuário acessa “Esqueci minha senha”.
2. Informa o e-mail.
3. Sistema registra a solicitação.
4. Sistema gera o token temporário.
5. Usuário abre o link e define a nova senha.
6. Sistema valida o token e a senha.
7. Senha é atualizada pelo mecanismo do Django.
8. Token deixa de ser válido.
9. Sistema registra o resultado.

A expiração é configurada em `PASSWORD_RESET_TIMEOUT`.

Na estrutura de arquivos:

- `accounts/views.py` também contém as classes de recuperação;
- `accounts/urls.py` define as rotas `password-reset`,
  `password-reset/done`, `password-reset-confirm` e
  `password-reset-complete`;
- `Verbum/settings.py` contém `PASSWORD_RESET_TIMEOUT` e o
  backend de e-mail usado em desenvolvimento.

---

## 11. Considerações

As funcionalidades descritas neste documento correspondem às
implementações presentes no código atual do projeto.

A comprovação do funcionamento será realizada através dos testes
da aplicação e das evidências obtidas pelo front-end.
