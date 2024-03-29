FROM node:16-alpine
WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . ./
EXPOSE 3000

CMD ["node","src/index.js"]