# Usa a imagem base do Node.js
FROM node:14

# Define o diretório de trabalho
WORKDIR /app/backend

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do backend
RUN npm install

# Copia o código-fonte do backend para o diretório de trabalho
COPY . .

# Expõe a porta que o servidor do backend usará
EXPOSE 5000

# Inicializa o servidor do backend
CMD ["npm", "start"]
