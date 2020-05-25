# base image
FROM node:12.2.0-alpine

# set working directory
COPY . /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN yarn install
RUN yarn build
RUN yarn global add serve

# start app
CMD ["serve", "build"]