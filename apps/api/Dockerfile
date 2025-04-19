FROM node:20-bullseye as builder
WORKDIR /app
RUN yarn global add turbo 
COPY . .
RUN turbo prune --scope=snipscribe-api --docker


# Add lockfile and package.json's of isolated subworkspace
FROM node:20-bullseye AS installer
WORKDIR /app
RUN yarn global add prisma turbo

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install
# COPY apps/api/prisma_templates ./prisma_templates
# RUN mkdir prisma
# RUN cat ./prisma_templates/tables.prisma > ./prisma/schema.prisma && cat ./prisma_templates/views.prisma >> ./prisma/schema.prisma
# RUN prisma generate

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
ENV DEFAULT_IP_RANGE=198.18.0.0/15
ENV ALLOWED_INACTIVE_MINUTES=3
ENV JWT_ACCESS_TOKEN_SECRET=secretkey
ENV JWT_REFRESH_TOKEN_SECRET=secretkey
ENV DATABASE_URL=mysql://placeholder:placeholder@placeholder:3306/development-db?schema=public
RUN turbo run build --filter=snipscribe-api

FROM node:20-bullseye
USER root
RUN apt update
RUN apt install -y libjemalloc-dev netcat
RUN echo "/usr/lib/x86_64-linux-gnu/libjemalloc.so" >> /etc/ld.so.preload
WORKDIR /app
RUN npm install pm2 prisma -g

COPY --from=installer /app .
EXPOSE 3306

RUN chmod +x /app/apps/api/start.sh
RUN chmod +x /app/apps/api/wait-for-it.sh
WORKDIR /app/apps/api
CMD ["./start.sh"]
