# Usa una imagen oficial de Node.js para build
FROM node:20 as build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Build de producción
RUN npm run build

# Imagen final, solo para servir estáticos
FROM node:20 as prod
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]