# Projeto FullStack

## Backend
O projeto foi construído utilizado conceito de arquitetura limpa com DDD no qual definimos alguns casos de usos base e entidades que iremos discutir mais adiante

### Entidades de Domínio
- User
  - A entidade base do projeto no qual representa um usuário no sistema principal que definimos um id, email , nome e senha.
  - Vale salientar que a mesma não é capaz de auto criar, mas deve ser executada por um service que define as regras de negócio
  - No qual o nome usuário tem que haver no mínimo 2 caracteres, e a senha 8 dígitos. Claro, não podemos cadastrar usuários com mesmo email pois foge do nosso domínio
- Exchange Registration
  - Tal entidade armazena um valor resultante da conversão em determinado período, ou seja, guarda o câmbio em si
  - Por exemplo, se definimos uma conversão 'USD-BRL' e colocamos valor 4.90, significa que um dolar(USD) equivale a 4.90 reais (BRL), sempre seguindo esse fluxo
  - De maneira resumida, tal é responsável por armazenar o valor proveniente da API por minuto que é feita a request
- Exchange Registrarion Cache
  - Como próprio nome discorre, trata-se do cache das principais estatisticas provenientes do câmbio, sendo ela o valor máximo atingido, menor e a média. Sendo ele podendo ser relacionado a hora, ou seja, média dos valores de uma hora específica ou dia, sendo definido isso no campo 'type'
  - OBS: Nesse projeto por falta de tempo, implementamos apenas a função de salvar no cache esses dados, não a função de ler ou remover

## Casos de uso
- Register User
  - Caso de uso responsável por registrar no banco de dados o usuário, respeitando as regras do domínio.
  - A senha é criptografada antes de inserir no banco utilizando algoritmo bcrypt
- Authenticate user
  - Caso de uso responsável por autenticar o usuário de acordo com a senha e email digitado. Após isso é gerado um token de autenticação formato jwt no qual usamos como payload o email e id do usuário
  OBS: Não houve implementação dos middlewares em rotas de acordo com token gerado
- Save Exchange Registration
  - Caso de uso responsável por fazer leitura da API e salvar os dados no banco
  - Essa leitura é feita a cada minuto e salvo. Por padrão do sistema, são realizados em alguns câmbios somente 'USD-BRL', 'BRL-USD', 'EUR-BRL', 'BRL-EUR', 'BRL-ARS', 'ARS-BRL','JPY-BRL','BRL-JPY'
- Generate Exchange
  - Caso de uso responsável por gerar de fatos as métricas baseada nos dados armazenados sobre os câmbios.
  - Tal é baseado no dia para checar as métricas das horas ou no mês, no qual retorna as métricas dos dias do mês específico
  - Depois de calculado, é salvo no cache para ser lido mais tarde
  - OBS: O processo de remoção de cache assim como leitura, não foi implementado

## Configuração
- Defina as variavéis de ambiente no .env.example
- execute `npm start` para rodar o prjeto, se tudo der certo, irá mostrar uma mensagem de êxito
- Caso deseje executar os testes, execute `npm test`

## Acerca das dependências
- Fastify: Gerenciar rotas, parâmetros
- Prisma: ORM para manusear o banco de dados
- Bcryptjs: Usado para criptografia das senhas
- Axios: Utilizada para fazer as request da api de cotação
- Jsonwebtoken: Utilizada para geração dos tokens de autentiação
- Jest: Biblioteca para testes unitários
- Dotenv: Utilizada para leitura de variavéis de ambiente