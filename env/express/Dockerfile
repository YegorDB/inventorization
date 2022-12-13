FROM node:19.2

RUN ["npm", "install", "-g", "npm-check-updates"]

WORKDIR /app

EXPOSE 3000

COPY ./entrypoint.sh /usr/local/bin/
ENTRYPOINT ["entrypoint.sh"]
