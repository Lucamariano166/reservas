### Sistema de Reservas de Salas de Reunião

Este é um sistema de reservas de salas de reunião, onde os usuários podem visualizar a disponibilidade das salas, realizar reservas e editar ou cancelar suas próprias reservas. A aplicação é desenvolvida com um backend em PHP usando Laravel e um frontend em React.
### Tecnologias Utilizadas

    Backend: PHP, Laravel
    Frontend: ReactJS, HTML5, CSS
    Banco de Dados: PostgreSQL

### Requisitos Para o Backend

    PHP >= 8.0
    Composer
    PostgreSQL

### Instalação Backend

    Clone o repositório:

    git clone https://github.com/seu_usuario/sistema-reservas.git

    cd sistema-reservas/backend

    Instale as dependências do Laravel:

    composer install

    Crie um arquivo .env a partir do .env.example e configure as credenciais do banco de dados:

    cp .env.example .env

    Gere a chave da aplicação:

    php artisan key

    Execute as migrações para criar as tabelas no banco de dados:

    php artisan migrate

    Para popular o banco de dados com dados iniciais, execute o seeder:

     php artisan db:seed --class=RoomsTableSeeder

    Inicie o servidor local:

    php artisan serve

  ### Estrutura do Banco de Dados

  As tabelas criadas no banco de dados incluem:

    rooms: Armazena informações sobre as salas.
        id: Identificador único da sala.
        name: Nome da sala.

    reservations: Armazena informações sobre as reservas.
        id: Identificador único da reserva.
        room_id: Identificador da sala (chave estrangeira).
        start_time: Data e hora de início da reserva.
        end_time: Data e hora de término da reserva.
        user_name: Nome do responsável pela reserva.

        SQL para Criar o Banco de Dados no PostgreSQL

        Para criar o banco de dados, você pode executar os seguintes comandos SQL:

        CREATE DATABASE reservas;

        \c reservas;

        CREATE TABLE rooms ( id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL );

CREATE TABLE reservations ( id SERIAL PRIMARY KEY, room_id INT REFERENCES rooms(id), start_time TIMESTAMP NOT NULL, end_time TIMESTAMP NOT NULL, user_name VARCHAR(255) NOT NULL );
### Rotas da API

    GET /api/reservations: Lista todas as reservas.
    POST /api/reservations: Cria uma nova reserva.
    GET /api/reservations/{id}: Recupera uma reserva específica.
    PUT /api/reservations/{id}: Atualiza uma reserva existente.
    DELETE /api/reservations/{id}: Cancela uma reserva.

### Validações

    As salas não podem ser reservadas duas vezes no mesmo horário.
    As reservas não podem ser feitas para o passado.
