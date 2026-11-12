# Imagen base
FROM node:20-alpine AS base

# Etapa de dependencias
FROM base AS deps
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./
COPY prisma ./prisma

# Instalar dependencias
RUN npm ci

# Etapa de build
FROM base AS builder
WORKDIR /app

# Copiar dependencias y código fuente
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generar cliente Prisma y compilar TypeScript
RUN npx prisma generate
RUN npm run build

# Etapa de producción
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copiar archivos necesarios
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Exponer puerto
EXPOSE 3001

# Comando de inicio
CMD ["node", "dist/index.js"]
