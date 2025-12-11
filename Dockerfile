FROM node:24-alpine

ARG NEXT_PUBLIC_ICP_NUMBER
ENV NEXT_PUBLIC_ICP_NUMBER=${NEXT_PUBLIC_ICP_NUMBER}
ARG NEXT_PUBLIC_ICP_URL
ENV NEXT_PUBLIC_ICP_URL=${NEXT_PUBLIC_ICP_URL}



WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com
# RUN npm install
RUN npm install -g bun
RUN bun install
COPY . .
# RUN npm run build
RUN bun run build

USER root
EXPOSE 8080
ENV PORT 8080

CMD ["bun", "run", "start"]