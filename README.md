# process-manager
Gerenciador de processos

## Como executar
Primeiro, clone o projeto em sua máquina.

## Backend
Para executar o backend, vá até a pasta `process-manager-backend` e execute o comando
```
docker build -t process-manager-backend .
```
para fazer o build da imagem a partir do dockerfile, e em seguida o comando
```
docker run -p 8080:8080 process-manager-backend
```
para executar o backend em um container docker.
Após realizado o processo, a aplicação do backend estará disponível no endereço `localhost:8080/`.
Para testá-la, importe o arquivo `process_manager.postman_collection.json` (que se encontra na raiz deste repositório) no software postman.

## Frontend
Para executar o frontend, vá até a pasta `process-manager-frontend` e execute o comando
```
docker build -t process-manager-frontend .
```
para fazer o build da imagem a partir do dockerfile, e em seguida o comando
```
docker run -v ${PWD}:/app -v /app/node_modules -p 3000:3000 process-manager-frontend
```
para executar o frontend em um container docker.
Após realizado o processo, a aplicação do frontend estará disponível no endereço `localhost:3000/`.
