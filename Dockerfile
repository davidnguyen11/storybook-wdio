FROM node:12-stretch

# Create app directory
WORKDIR /usr/src/app
COPY . .

# install node app
RUN npm install

# build storybook
RUN npm run build

# Command
CMD npm run storybook-production
