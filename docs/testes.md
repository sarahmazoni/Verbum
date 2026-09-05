# Testes da Aplicação

## Projeto Integrador - Autenticação e Gestão de Credenciais

Este documento apresenta os testes realizados na aplicação Verbum durante a etapa de Autenticação e Gestão de Credenciais.

Os testes foram realizados utilizando o front-end da aplicação, conforme solicitado nas orientações do Projeto Integrador.

As evidências dos testes estão armazenadas na pasta `docs/evidencias/`.

---

## 1. Verificação do ambiente

Antes da realização dos testes funcionais, foi realizada a verificação do projeto utilizando o comando:

    python manage.py check

### Resultado

O Django retornou um aviso:

    WARNINGS:
    accounts.UserProfile: (models.W042) Auto-created primary key used when not defining a primary key type, by default 'django.db.models.AutoField'.

    System check identified 1 issue (0 silenced).

Foi identificado apenas um aviso relacionado ao tipo de chave primária utilizada no modelo `UserProfile`. Esse aviso não impede a execução da aplicação.

**Resultado: Aprovado com aviso.**

---

## 2. Inicialização da aplicação

A aplicação foi executada utilizando:

    python manage.py runserver

O servidor foi iniciado corretamente em:

    http://127.0.0.1:8000/

A aplicação ficou disponível para acesso através do navegador.

**Resultado: Aprovado.**

---

## 3. Acesso à tela de login

Foi acessada a tela de autenticação da aplicação em `/accounts/login/`.

A interface apresentou os seguintes campos e opções:

- E-mail
- Senha
- Botão "Entrar"
- Opção para cadastro de uma nova conta

**Evidência:** `03-tela-login.png`

**Resultado: Aprovado.**

---

## 4. Cadastro de usuário

Foi acessada a tela de cadastro através da rota `/accounts/register/`.

Foram informados usuário, e-mail, senha e confirmação da senha.

Com os dados válidos, a aplicação apresentou a mensagem:

    Usuário cadastrado com sucesso!

**Evidência:** `01-cadastro-sucesso.png`

**Resultado: Aprovado.**

---

## 5. Validação da confirmação de senha

Foi realizado um teste informando senhas diferentes nos campos "Senha" e "Confirme sua senha".

A aplicação apresentou a mensagem:

    As senhas não coincidem.

O cadastro não foi concluído.

**Evidência:** `02-senhas-diferentes.png`

**Resultado: Aprovado.**

---

## 6. Validação do formato do e-mail

Foi realizado um teste informando um endereço de e-mail sem o caractere `@`.

O navegador impediu o envio do formulário e informou que o e-mail precisava conter o caractere `@`.

**Evidência:** `04-email-invalido.png`

**Resultado: Aprovado.**

---

## 7. Usuário já existente

Foi realizada uma tentativa de cadastro utilizando um nome de usuário que já estava cadastrado.

A aplicação impediu o cadastro duplicado e apresentou mensagem informando que o usuário já existia.

**Evidência:** `08-usuario-ja-existente.png`

**Resultado: Aprovado.**

---

## 8. Validação de senha

Foi realizada uma tentativa de cadastro com senha que não atende aos critérios configurados no Django.

A aplicação rejeitou a senha e apresentou a mensagem de validação.

**Evidência:** `10-teste_validacao_senha.png`

**Resultado: Aprovado.**

---

## 9. Login válido

Foi realizado o login com e-mail e senha de uma conta cadastrada, sem 2FA ativado.

A aplicação autenticou o usuário e redirecionou para o painel.

**Evidência:** `05-painel-com-login.png`

**Resultado: Aprovado.**

---

## 10. Proteção de rota sem login

Foi acessada a rota `/accounts/setup2fa/` sem sessão autenticada.

A aplicação impediu o acesso e encaminhou o usuário para o fluxo de login.

**Evidência:** `06-setup2fa-sem-login.png`

**Resultado: Aprovado.**

---

## 11. Autenticação em dois fatores

Foi configurado o 2FA e realizado um novo login.

Após a senha correta, a aplicação exigiu o código TOTP na tela de verificação. Com o código válido, o login foi concluído.

**Evidência:** `07-verifica-2fa.png`

**Resultado: Aprovado.**

---

## 12. Bloqueio por tentativas excessivas

Foram realizadas 5 tentativas de login com senha incorreta.

A aplicação bloqueou a conta temporariamente e apresentou a mensagem de bloqueio.

**Evidência:** `09-bloqueio-tentativas.png`

**Resultado: Aprovado.**

---

## 13. Gerenciamento de sessão

O painel só pôde ser acessado após a autenticação. A sessão está configurada para 30 minutos e o cookie de sessão está como HttpOnly.

**Evidências:** `05-painel-com-login.png` e `06-setup2fa-sem-login.png`

**Resultado: Aprovado.**

---

## 14. Logout

Com o usuário autenticado, foi acionada a opção de sair.

A sessão foi encerrada e o usuário retornou para a tela de login. O painel deixou de ficar acessível sem nova autenticação.

**Resultado: Aprovado.**

---
## 15. Recuperação de senha — solicitação

Foi acessada a opção “Esqueci minha senha” a partir do login.
O formulário solicitou o e-mail. Após o envio, a aplicação mostrou
a tela de confirmação de envio.

**Evidências:** `11-login-esqueci-senha.png`, `12-form-recuperacao.png`,
`13-email-enviado.png`

**Resultado: Aprovado.**

---

## 16. Recuperação de senha — link no console

Com o `EMAIL_BACKEND` de console, o servidor exibiu o e-mail com
o link de redefinição.

**Evidência:** `14-email-console.png`

**Resultado: Aprovado.**

---

## 17. Recuperação de senha — redefinição válida

O link válido foi aberto. Foram informadas senha e confirmação
válidas. A aplicação concluiu o processo e permitiu o login com
a nova senha.

**Evidências:** `15-nova-senha.png`, `16-reset-sucesso.png`

**Resultado: Aprovado.**

---

## 18. Token reutilizado

Após a redefinição, o mesmo link foi aberto novamente.
A aplicação recusou o token.

**Evidência:** `17-token-reutilizado.png`

**Resultado: Aprovado.**

---

## 19. Token inválido ou expirado

Foi acessado um link inválido. A aplicação apresentou a falha
no front-end.

**Evidência:** `18-token-invalido.png`

**Resultado: Aprovado.**

---

## 20. Logs do processo

Foram verificados os registros:

- solicitação recebida;
- recuperação concluída;
- tentativa com token inválido.

Nenhum log continha token ou senha.

**Evidências:** `19-log-solicitacao.png`, `20-log-sucesso.png`,
`21-log-falha-token.png`

**Resultado: Aprovado.**

---

## 21. Resumo dos testes

| Teste | Funcionalidade | Evidência | Resultado |
| --- | --- | --- | --- |
| 01 | Verificação do ambiente Django | — | Aprovado com aviso |
| 02 | Inicialização da aplicação | — | Aprovado |
| 03 | Tela de login | 03-tela-login.png | Aprovado |
| 04 | Cadastro de usuário | 01-cadastro-sucesso.png | Aprovado |
| 05 | Confirmação de senha | 02-senhas-diferentes.png | Aprovado |
| 06 | Validação de e-mail | 04-email-invalido.png | Aprovado |
| 07 | Usuário já existente | 08-usuario-ja-existente.png | Aprovado |
| 08 | Validação de senha | 10-teste_validacao_senha.png | Aprovado |
| 09 | Login válido | 05-painel-com-login.png | Aprovado |
| 10 | Rota protegida sem login | 06-setup2fa-sem-login.png | Aprovado |
| 11 | Autenticação em dois fatores | 07-verifica-2fa.png | Aprovado |
| 12 | Bloqueio por tentativas | 09-bloqueio-tentativas.png | Aprovado |
| 13 | Gerenciamento de sessão | 05 e 06 | Aprovado |
| 14 | Logout | — | Aprovado |
| 15 | Pedido de recuperação | 11, 12 e 13 | Aprovado |
| 16 | Link no console | 14-email-console.png | Aprovado |
| 17 | Redefinição válida | 15 e 16 | Aprovado |
| 18 | Token reutilizado | 17-token-reutilizado.png | Aprovado |
| 19 | Token inválido | 18-token-invalido.png | Aprovado |
| 20 | Logs do processo | 19, 20 e 21 | Aprovado |

---

## 22. Observações

Os testes desta etapa foram realizados diretamente pelo front-end da aplicação.

As evidências estão organizadas na pasta `docs/evidencias/`.

O aviso `models.W042` não impede a execução nem a avaliação funcional da aplicação.

Enquanto os prints da recuperação não forem gerados, manter os nomes previstos
neste documento e substituir somente se a equipe padronizar outra numeração.
