# FROM node:16.15.0-alpine AS frontend
FROM node:lts-alpine
RUN sed -i "s/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g" /etc/apk/repositories 
RUN apk update && \
    apk add --update git && \
    apk add --update openssh
RUN yarn config set registry https://registry.npm.taobao.org/

WORKDIR /frontend-build
RUN git clone https://github.com/sunzehui/vue3-examination.git ./
RUN yarn
RUN yarn build
RUN rm -rf ./node_modules

WORKDIR /backend-build
COPY . .
RUN yarn install --production
RUN yarn build
CMD yarn start:prod