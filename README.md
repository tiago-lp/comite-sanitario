# comite-sanitario

Projeto com intuito de desenvolver um sistema real para ajudar a administração do Comitê Sanitário de Campina Grande, acelerando o processo de identificar pessoas e famílias carentes para entender as necessidades das mesmas com maior urgência.

1. Na raíz do repositório executar:

```bash
    docker-compose -f docker-compose.yml up --build comite_sanitario_db
```

2. Agora dentro de /comite_api, executar:

```bash
    python -m venv env
```

3. Após criar o ambiente virtual, ativar:

```bash
    source env/bin/activate
```

4. Instalar as dependências:

```bash
    pip install -r requirements/requirements.txt
```

5. Agora, execute:

```bash
    python manage.py makemigrations core
```

6. Em seguida:

```bash
    python manage.py migrate
```

7. Criando um usuário admin:

```bash
    python manage.py createsuperuser
```

Após esse comando será solicitado um username, email e Password (Password é exigido duas vezes para confirmação).

8. Concluído o preenchimento dos dados, podemos executar a aplicação:

```bash
    python manage.py runserver
```

Com isso podemos acessar [http://localhost:8000/api/admin](http://localhost:8000/api/admin) (Atenção, aqui pode não ser a mesma porta 8000 no seu. Verifique a porta em que está rodando no terminal em que você executou o comando "python manage.py runserver").

Estando na página do Django admin podemos entrar com os dados do usuário que criamos no passo 7.

9. Para executar o Front, acessar o [aqui](https://github.com/tiago-lp/comite-sanitario/blob/main/comite_front/README.md).