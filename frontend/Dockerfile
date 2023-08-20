# Usa a imagem base do Node.js
FROM node:14

# Define o diretório de trabalho
WORKDIR /app/frontend

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do frontend
RUN npm install

# Copia o código-fonte do frontend para o diretório de trabalho
COPY . .

# Expõe a porta que o servidor do frontend usará
EXPOSE 3000

# Inicializa o servidor do frontend
CMD ["npm", "start"]
