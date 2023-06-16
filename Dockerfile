#Baixa a versao do node
FROM node:19

#Cria diretorio do app
WORKDIR /usr/src/app

#Copia package.json e package-lock.json serao copiados
COPY package*.json ./

#Instala as dependencias
RUN npm install

#Agrupa codigo fonte dentro da imagem
COPY . .

#Mapeamento da porta
EXPOSE 3000

#Gera a doc do swagger e inicia a app
CMD npm run swagger-autogen && npm start