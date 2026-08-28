# Segurança
## Projeto Integrador - Autenticação e Gestão de Credenciais

Esta documentação apresenta os principais recursos de segurança
utilizados na implementação do Verbum.

Os recursos descritos abaixo correspondem às funcionalidades
presentes no código atual do projeto.

---

## 1. Proteção das senhas

O projeto utiliza o sistema de autenticação do Django para realizar
o cadastro e a validação das senhas.

Durante o cadastro, é utilizado o método `create_user()` para criar
o usuário.

Dessa forma, o projeto utiliza o mecanismo de gerenciamento de
senhas do próprio Django em vez de armazenar diretamente a senha
informada pelo usuário.

---

## 2. Validação das senhas

O projeto utiliza os validadores de senha disponíveis no Django.

Entre os validadores configurados estão:

- `UserAttributeSimilarityValidator`;
- `MinimumLengthValidator`;
- `CommonPasswordValidator`;
- `NumericPasswordValidator`.

Essas validações ajudam a impedir o uso de senhas consideradas
fracas ou inadequadas.

As configurações estão presentes em:

`Verbum/settings.py`

---

## 3. Controle de tentativas de login

O projeto possui um mecanismo para limitar tentativas consecutivas
de login com credenciais incorretas.

A configuração utilizada permite:

- até 5 tentativas incorretas;
- bloqueio durante 5 minutos.

O controle é realizado através dos campos:

`failed_login_attempts`

e

`locked_until`

Esses campos fazem parte do modelo `UserProfile`.

O objetivo desse mecanismo é dificultar tentativas repetidas de
descoberta da senha.

---

## 4. Autenticação em dois fatores

O projeto possui autenticação em dois fatores utilizando TOTP.

Para implementar essa funcionalidade, é utilizada a biblioteca
`pyotp`.

O usuário possui um segredo TOTP armazenado no campo:

`totp_secret`

O campo:

`two_factor_enabled`

indica se o segundo fator está habilitado para aquele usuário.

Quando o 2FA está ativado, o usuário precisa informar o código
TOTP após a validação da senha.

---

## 5. Armazenamento das informações do 2FA

As informações relacionadas ao segundo fator ficam associadas ao
modelo `UserProfile`.

O relacionamento com o usuário principal é feito através de:

`OneToOneField`

Isso permite que cada usuário possua um único perfil associado.

O segredo TOTP pode ficar vazio enquanto o usuário ainda não tiver
configurado o segundo fator.

---

## 6. Proteção da sessão

O projeto utiliza o sistema de sessões do Django.

O painel da aplicação possui proteção através do:

`@login_required`

Dessa forma, páginas que exigem autenticação não devem ser
acessadas por usuários que não possuem uma sessão autenticada.

A sessão possui duração configurada de 30 minutos.

O projeto também utiliza:

`SESSION_SAVE_EVERY_REQUEST = True`

para atualizar a sessão enquanto o usuário continua utilizando
a aplicação.

---

## 7. Cookie de sessão

O cookie utilizado pela sessão possui a configuração:

`SESSION_COOKIE_HTTPONLY = True`

O objetivo dessa configuração é impedir que scripts executados no
navegador tenham acesso direto ao cookie através de JavaScript.

Isso ajuda a proteger as informações utilizadas para manter a sessão
do usuário.

---

## 8. Logout

O encerramento da sessão é realizado através da função `logout()`
do Django.

No projeto, essa lógica está presente na função:

`logout_view()`

Após o logout, o usuário é direcionado novamente para a tela
de login.

---

## 9. Resumo dos mecanismos de segurança

| Mecanismo | Implementação |
|---|---|
| Validação de senha | Validadores do Django |
| Proteção da senha | Sistema de autenticação do Django |
| Limitação de tentativas | 5 tentativas |
| Bloqueio temporário | 5 minutos |
| 2FA | TOTP com `pyotp` |
| Controle do 2FA | `UserProfile` |
| Proteção de páginas | `@login_required` |
| Duração da sessão | 30 minutos |
| Cookie HttpOnly | `SESSION_COOKIE_HTTPONLY` |
| Logout | `django.contrib.auth.logout()` |

---

## 10. Considerações

Os mecanismos apresentados foram implementados com o objetivo de
proteger o processo de autenticação e reduzir riscos relacionados
ao acesso indevido às contas dos usuários.

As funcionalidades devem ser avaliadas através da aplicação em
execução e dos testes realizados pelo front-end.
