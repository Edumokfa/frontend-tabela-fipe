Link para download do Docker: https://www.docker.com/.

### 1. Construir a Imagem Docker

O comando a seguir construirá a imagem Docker com o nome "frontend":

```bash
docker build -t frontend .
```

Em seguida, deve-se executar o seguinte comando para que a aplicação inicie

```bash
docker run -p 3000:3000 -d frontend
```
então basta acessá-la na url: http://localhost:3000/
