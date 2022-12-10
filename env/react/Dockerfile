FROM node:19.2

RUN ["npm", "install", "-g", "create-react-app"]
RUN ["npm", "i", "-g", "serve"]

COPY ./entrypoint.sh /usr/local/bin/

WORKDIR /app/

ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000
