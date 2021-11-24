FROM node:16-alpine
RUN apk add --no-cache python3 g++ make
WORKDIR /web3-hipster-stack/client
COPY . .
RUN yarn
