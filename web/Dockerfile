FROM bitnami/node:16 AS build
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .
RUN yarn run build

FROM bitnami/node:16-prod AS prod
WORKDIR /app

COPY --from=build /app/dist dist
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/package.json .
COPY --from=build /app/server.ts .

EXPOSE 02090

CMD ["yarn", "run", "serve"]