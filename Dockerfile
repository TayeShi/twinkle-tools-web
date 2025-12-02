FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com
# RUN npm install
RUN npm install -g pnpm
RUN pnpm install
COPY . .
# RUN npm run build
RUN pnpm run build

USER root
EXPOSE 80
ENV PORT 80

CMD ["npm", "run", "start"]