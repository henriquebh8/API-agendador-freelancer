## Api ##

Api feita em typescript, usando o gerenciador de pacotes pnpm, banco de dados mysql e para manipular o banco de dados foi escolhido o typeorm.

## Foram utilizada as seguintes versões

pnpm versão: 7.1.2

node versão: 14.19.3

mysql  Ver 8.0.29-0ubuntu0.22.04.2 for Linux on x86_64 ((Ubuntu))

ferramenta para manipupar o banco de dados foi o dbeaver

video do projeto funcionando: https://drive.google.com/drive/folders/1NElqcBZwBS0Yb17rD0b9LCXJYgcH1JQ9?usp=sharing


para iniciar o projeto
1- instale as dependencias usando o comando pnpm install.
2- descomente  o arquivo index.ts das linhas 20 a 28 para criar automaticamente as interfaces de usuario client e consume.
3- pnpm start para iniciar o projeto e criar o banco de dados
4- parar o serviço e comentar o arquivo index.ts das linhas 20 a 28 para criar previnir de criar novamente as interfaces.
5- pnpm start para iniciar a utilização.

O projeto esta como default a porta 3000 e as url são:
http://localhost:3000/ **todos em minusculo -USER/-SERVICE/ -HOUR/ -SCHEDULE/
                        
Ordem de criação dos acessos USUARIO>SERVICE>HOUR>SCHEDULE

modelos json da interface de criação dos acessos:

USUARIO: 
{
    "firstName": "usuario2",
    "lastName": "user",
    "email": "user2@gmail.com",
    "nickname": "user2",
    "password": "111111111111",
    "userTypes":"2"
}

SERVICE:
{
    "serviceName": "service1",
    "description": "sadada1u1",
    "user_id": 1,
    "serviceHour":1

}

HOUR:
{
    "initialTime":"2022-05-30 11:00:00",
     "finalTime":"2022-05-30 12:00:00",
    "service_id":1,
    "id":2


}

SCHEDULE:
{
    "user_id":"2",
    "hour_id":"2",
    "serviceName":"service1"

}
