FROM node:16-alpine

WORKDIR /app

ENV PORT=3000
EXPOSE 5000

COPY .  .

RUN npm i
RUN npm i --prefix frontend
RUN npm run build

CMD [ "npm","start" ]
