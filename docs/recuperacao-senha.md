# Recuperação de Senha

## Projeto Integrador - Etapa 2

Documentação dos itens 2.1 a 2.7 do checklist.

---

## 1. Objetivo

Redefinir a senha sem conhecer a senha atual, com token temporário, expiração, uso único e auditoria.

---

## 2. Onde está no código

| Elemento | Local |
| --- | --- |
| Solicitação | `accounts/views.py` — `PasswordResetRequestView` |
| Confirmação | `accounts/views.py` — `PasswordResetConfirmView` |
| Rotas | `accounts/urls.py` |
| Formulário | `password_reset_form.html` |
| E-mail enviado | `password_reset_done.html` |
| Nova senha / inválido | `password_reset_confirm.html` |
| Conclusão | `password_reset_complete.html` |
| Timeout | `PASSWORD_RESET_TIMEOUT = 900` |
| Envio em desenvolvimento | backend de e-mail console |

Rotas:

- `/accounts/password-reset/`
- `/accounts/password-reset/done/`
- `/accounts/password-reset-confirm/<uidb64>/<token>/`
- `/accounts/password-reset-complete/`

---

## 3. Fluxo

1. “Esqueci minha senha” no login.
2. Informe do e-mail.
3. Log da solicitação e tela de confirmação.
4. Geração do token.
5. Link no console em desenvolvimento.
6. Nova senha + confirmação.
7. Validação do token e dos validadores.
8. Token invalidado.
9. Log de sucesso.

Token expirado, adulterado ou reutilizado: tela de link inválido e log de falha.

---

## 4. Token (2.2 a 2.5)

Gerado pelo `PasswordResetTokenGenerator` (HMAC).

- não vai para o banco
- não vai para o log
- vale 900 segundos
- perde validade quando a senha muda
- `validlink` falso no front-end quando inválido

---

## 5. Auditoria (2.6 e 2.7)

| Evento | Nível | Mensagem |
| --- | --- | --- |
| Pedido | INFO | Solicitação de recuperação de senha recebida. |
| Token inválido | WARNING | Tentativa de recuperação de senha com token inválido ou expirado. |
| Sucesso | INFO | Recuperação de senha concluída com sucesso. |

---

## 6. LGPD (mínimo desta etapa)

Finalidade limitada à recuperação de acesso. Sem coleta extra. A tela de envio não confirma se o e-mail existe. Senha só em hash.

---

## 7. Checklist 2.x

| Nº | Requisito | Status | Comprovação |
| --- | --- | --- | --- |
| 2.1 | Funcionalidade | Implementado | Front-end |
| 2.2 | Token seguro | Implementado | Gerador do Django |
| 2.3 | Expiração | Implementado | `PASSWORD_RESET_TIMEOUT` |
| 2.4 | Invalidação após uso | Implementado | Reuso do link |
| 2.5 | Falha visível | Implementado | Tela de link inválido |
| 2.6 | Log da solicitação | Implementado | INFO |
| 2.7 | Log de sucesso e falha | Implementado | INFO e WARNING |

---

## 8. Evidências

`11` a `21` em `docs/evidencias/`.
