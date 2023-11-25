FROM node:18

WORKDIR /app

COPY package.json .

RUN npm i

RUN npm i @emotion/react @emotion/styled

COPY . .

EXPOSE 3000

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]
