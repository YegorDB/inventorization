FROM node:16.14

RUN ["npm", "i", "-g", "npm-check-updates"]

WORKDIR /app

COPY ./entrypoint.sh /usr/local/bin/
ENTRYPOINT ["entrypoint.sh"]
