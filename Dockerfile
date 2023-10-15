FROM node:18

LABEL version="1.0"
LABEL description="Base Docker image for the React client app of the City Science demo."
LABEL maintainer = ["kdoykov99@gmail.com"] 

WORKDIR /usr/app
COPY ./ /usr/app

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]