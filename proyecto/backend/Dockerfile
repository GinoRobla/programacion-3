# Usa una imagen oficial de Node.js
FROM node:20

# Crea el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto de la API
EXPOSE 3001

# Comando para iniciar el backend
CMD ["npm", "run", "dev"]