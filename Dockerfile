FROM node:lts-alpine

WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm install --production

COPY . .

RUN chmod +x docker.entrypoint.sh
ENTRYPOINT [ "./docker.entrypoint.sh" ]