FROM node:16.6.2-stretch

ARG folder_name
ARG api_port
WORKDIR /src
COPY ./modules ./modules/
RUN mkdir -p app/api
COPY ./services/${folder_name}/package*.json ./app/api/
RUN cd ./app/api && npm install --no-optional
COPY ./services/${folder_name} ./app/api/

WORKDIR /src/app/api
RUN adduser --disabled-login service_worker 
RUN chown -R service_worker ./

USER service_worker

CMD ["npm", "run", "start:prod"]

EXPOSE ${api_port}