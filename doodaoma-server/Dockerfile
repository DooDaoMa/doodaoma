FROM node:18-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm install --ignore-scripts
RUN npm run build

EXPOSE 8080
CMD [ "npm", "run", "start" ]
