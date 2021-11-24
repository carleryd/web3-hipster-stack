FROM node:17-alpine
RUN apk add --no-cache python3 g++ make
WORKDIR /web3-hipster-stack
ENV PATH /web3-hipster-stack/node_modules/.bin:$PATH
COPY . .
RUN yarn
# CMD yarn client-install && yarn client-build && yarn build && yarn start
