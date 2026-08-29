# Testes da Aplicação

## Projeto Integrador - Autenticação e Gestão de Credenciais

Este documento apresenta os testes realizados na aplicação Verbum durante a etapa de desenvolvimento.

Os testes foram realizados utilizando o front-end da aplicação, conforme solicitado nas orientações do Projeto Integrador.

---

## 1. Verificação do ambiente

Antes da realização dos testes funcionais, foi realizada a verificação do projeto utilizando o comando:

```bash
py manage.py check
Resultado

O Django realizou a verificação do projeto corretamente, apresentando apenas um aviso relacionado à configuração do tipo de chave primária automática utilizada pelo modelo UserProfile.

O aviso identificado foi:

accounts.UserProfile: (models.W042) Auto-created primary key used when not defining a primary key type.

Esse aviso não impede a execução da aplicação nem interfere nas funcionalidades de autenticação e gestão de credenciais testadas nesta etapa.

Resultado: Aprovado.

2. Inicialização da aplicação

A aplicação foi executada utilizando:

py manage.py runserver

O servidor foi iniciado corretamente em:

http://127.0.0.1:8000/

A aplicação ficou disponível para acesso através do navegador.

Resultado

Resultado: Aprovado.

A aplicação foi inicializada corretamente e o front-end ficou disponível para realização dos testes.

3. Acesso à tela de login

Foi acessada a tela de autenticação da aplicação.

A interface apresentou os seguintes campos e opções:

E-mail;
Senha;
Botão "Entrar";
Opção para visualizar a senha;
Opção "Esqueci minha senha";
Opção para cadastro de uma nova conta.
Resultado

Resultado: Aprovado.

A tela de autenticação foi carregada corretamente pelo front-end.

4. Cadastro de usuário

Foi acessada a tela de cadastro através da rota:

/accounts/register/

Foram informados os dados necessários para criação de uma conta:

Usuário;
E-mail;
Senha;
Confirmação da senha.

Com os dados válidos, a aplicação apresentou a mensagem:

Usuário cadastrado com sucesso!
Resultado

Resultado: Aprovado.

O cadastro de usuário foi realizado corretamente através do front-end.

A evidência correspondente está armazenada na pasta docs/evidencias/.

5. Validação da confirmação de senha

Foi realizado um teste informando senhas diferentes nos campos "Senha" e "Confirme sua senha".

A aplicação apresentou a mensagem:

As senhas não coincidem.

O cadastro não foi concluído.

Resultado

Resultado: Aprovado.

A aplicação realizou corretamente a validação da confirmação da senha.

A evidência correspondente está armazenada na pasta docs/evidencias/.

6. Validação do formato do e-mail

Foi realizado um teste informando um endereço de e-mail em formato inválido.

Foi utilizado um endereço sem o caractere @.

O navegador apresentou uma mensagem informando que o endereço de e-mail precisava conter o caractere @.

Resultado

Resultado: Aprovado.

A validação do campo de e-mail impediu o envio de um endereço em formato inválido.

A evidência correspondente está armazenada na pasta docs/evidencias/.

7. Usuário já existente

Foi realizada uma tentativa de cadastro utilizando um nome de usuário que já estava cadastrado no sistema.

A aplicação apresentou a mensagem:

Este nome de usuário já está cadastrado.

O cadastro não foi concluído.

Resultado

Resultado: Aprovado.

A aplicação realizou corretamente a validação de unicidade do nome de usuário, impedindo o cadastro de um usuário com um nome já existente.

A evidência correspondente está armazenada na pasta docs/evidencias/.

8. Login

Foi realizada uma tentativa de login utilizando uma conta cadastrada anteriormente.

Foram informados o e-mail e a senha correspondentes à conta cadastrada.

Após o envio do formulário, a aplicação realizou a autenticação corretamente e direcionou o usuário para o painel da aplicação.

O erro relacionado à proteção CSRF identificado durante o teste inicial não foi mais apresentado após a correção do formulário de autenticação.

Resultado

Resultado: Aprovado.

O login foi realizado corretamente através do front-end e o usuário autenticado foi direcionado para o painel da aplicação.

A evidência correspondente está armazenada na pasta docs/evidencias/.

9. Resumo dos testes
Teste	Funcionalidade	Resultado
01	Verificação do ambiente Django	Aprovado
02	Inicialização da aplicação	Aprovado
03	Tela de login	Aprovado
04	Cadastro de usuário	Aprovado
05	Confirmação de senha	Aprovado
06	Validação de e-mail	Aprovado
07	Usuário já existente	Aprovado
08	Login válido	Aprovado
10. Observações

Os testes desta etapa foram realizados diretamente pelo front-end da aplicação.

As evidências dos testes realizados estão organizadas na pasta:

docs/evidencias/

Os testes que apresentaram funcionamento correto foram registrados como aprovados.

O teste de usuário já existente foi corrigido para apresentar uma mensagem amigável ao usuário, evitando a exibição direta de um erro do banco de dados.

O teste de login também foi corrigido e validado através do front-end, com o usuário sendo autenticado e direcionado para o painel da aplicação.
