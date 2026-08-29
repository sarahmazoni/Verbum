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
