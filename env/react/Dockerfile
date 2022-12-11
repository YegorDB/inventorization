FROM node:19.2

RUN ["npm", "update", "-g", "npm"]
RUN ["npm", "install", "-g", "create-react-app"]
# RUN ["npm", "install", "-g", "serve"]

COPY ./entrypoint.sh /usr/local/bin/

WORKDIR /app/

ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000
