FROM node:alpine

WORKDIR /opt/app
RUN npm install -g typescript ts-node
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
ENTRYPOINT ["npm", "start"]