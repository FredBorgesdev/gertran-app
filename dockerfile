            FROM ubuntu:22.04
            WORKDIR /app
            RUN apt-get update && apt-get install -y \
                nodejs npm 


            COPY package.json /app

            COPY package-lock.json /app
            RUN npm install

            COPY . /app



            EXPOSE 4200

