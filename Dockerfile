FROM node:10-stretch

RUN apt-get update
RUN apt-get install -y mdbtools htop

WORKDIR /app
ADD . /app

RUN npm i
RUN npm i -g nodemon

# Environment Vars
ENV PORT 3000

# Ports
EXPOSE 3000

# Start command
CMD ["nodemon", "-L", "index.js"]
