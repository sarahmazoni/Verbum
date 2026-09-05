# Recuperação de Senha

## Projeto Integrador - Etapa 2

Este documento descreve a recuperação de senha do Verbum, alinhada
aos itens 2.1 a 2.7 do checklist oficial.

A funcionalidade foi implementada com as views de redefinição de
senha do Django, templates próprios e registro em log dos eventos
do processo. Os testes são realizados pelo front-end.

---

## 1. Objetivo

Permitir que o titular redefina a senha sem conhecimento da senha
atual, usando um token temporário, com expiração, uso único e
registro de auditoria.

---

## 2. Onde está no código

| Elemento | Local |
| --- | --- |
| Solicitação | `accounts/views.py` — `PasswordResetRequestView` |
| Confirmação da nova senha | `accounts/views.py` — `PasswordResetConfirmView` |
| Rotas | `accounts/urls.py` |
| Tela de pedido | `password_reset_form.html` |
| Tela de e-mail enviado | `password_reset_done.html` |
| Tela de nova senha / link inválido | `password_reset_confirm.html` |
| Tela de conclusão | `password_reset_complete.html` |
| Tempo de vida do token | `Verbum/settings.py` — `PASSWORD_RESET_TIMEOUT` |
| Envio em desenvolvimento | `EMAIL_BACKEND` (console) |

Rotas:

- `/accounts/password-reset/`
- `/accounts/password-reset/done/`
- `/accounts/password-reset-confirm/<uidb64>/<token>/`
- `/accounts/password-reset-complete/`

---

## 3. Fluxo

1. Na tela de login, o usuário escolhe “Esqueci minha senha”.
2. Informa o e-mail.
3. O sistema registra a solicitação em log e apresenta a tela de
   confirmação de envio.
4. É gerado um token temporário associado ao usuário.
5. Em desenvolvimento, o link aparece no console do servidor.
6. O usuário abre o link, informa a nova senha e a confirmação.
7. Se o token for válido e a senha atender aos validadores, a senha
   é atualizada (hash + salt do Django).
8. O token deixa de ser válido.
9. O sistema registra o sucesso em log e mostra a tela de conclusão.

Se o token estiver expirado, adulterado ou já utilizado, a tela de
confirmação informa que o link é inválido e o evento é registrado
em log.

---

## 4. Token (itens 2.2, 2.3, 2.4 e 2.5)

O token é gerado pelo `PasswordResetTokenGenerator` do Django.

Características usadas nesta etapa:

- geração criptográfica (HMAC) com dados do usuário e da senha atual;
- o token **não é gravado** no banco;
- o token **não é gravado** no log;
- validade definida por `PASSWORD_RESET_TIMEOUT` (3600 segundos);
- depois que a senha muda, o token antigo deixa de ser aceito;
- link expirado, reutilizado ou inválido apresenta falha visível
  no front-end (`validlink` falso).

Justificativa do tempo: 1 hora reduz a janela de abuso do link
e ainda permite que o usuário conclua o fluxo na mesma sessão
de estudo.

---

## 5. Auditoria (itens 2.6 e 2.7)

Os eventos são registrados pelo `logging` do Python nas views
personalizadas.

| Evento | Nível | Mensagem |
| --- | --- | --- |
| Pedido de recuperação | INFO | Solicitação de recuperação de senha recebida. |
| Token inválido ou expirado | WARNING | Tentativa de recuperação de senha com token inválido ou expirado. |
| Redefinição concluída | INFO | Recuperação de senha concluída com sucesso. |

Os logs não incluem senha, token, uid ou e-mail.

---

## 6. Relação com a LGPD (mínimo desta etapa)

- Finalidade do e-mail no fluxo: recuperar o acesso à conta.
- Não se coleta dado adicional para essa função.
- A mensagem de “e-mail enviado” não confirma se o endereço
  está cadastrado, reduzindo exposição de contas.
- A nova senha não é armazenada em texto puro.

---

## 7. Checklist 2.x

| Nº | Requisito | Status | Onde comprovar |
| --- | --- | --- | --- |
| 2.1 | Funcionalidade implementada | Implementado | Fluxo completo no front-end |
| 2.2 | Token criptograficamente seguro | Implementado | Gerador de token do Django + este documento |
| 2.3 | Token com expiração | Implementado | `PASSWORD_RESET_TIMEOUT` |
| 2.4 | Token invalidado após o uso | Implementado | Reuso do mesmo link |
| 2.5 | Falha para token expirado/inválido | Implementado | Tela de link inválido |
| 2.6 | Log da solicitação | Implementado | Log INFO na request |
| 2.7 | Log de sucesso e falha | Implementado | Log INFO e WARNING na confirm |

---

## 8. Evidências

As capturas ficam em `docs/evidencias/`.

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


