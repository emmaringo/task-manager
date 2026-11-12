# Imagen base - Usar Debian en lugar de Alpine para mejor compatibilidad con Prisma
FROM node:20-slim AS base

# Instalar OpenSSL (requerido por Prisma)
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

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

# Crear usuario no-root para seguridad
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 expressjs

# Copiar archivos necesarios
COPY --from=builder --chown=expressjs:nodejs /app/dist ./dist
COPY --from=builder --chown=expressjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=expressjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=expressjs:nodejs /app/prisma ./prisma

# Cambiar a usuario no-root
USER expressjs

# Exponer puerto
EXPOSE 3001

# Comando de inicio
CMD ["node", "dist/index.js"]
