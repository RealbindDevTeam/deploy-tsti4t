# Aplicacion basada en Node.js Version 4.4
FROM node:4.8.3
# Setea el directorio de trabajo a /app
WORKDIR /app
# Copiar el compilado del proyecto a /app
ADD /bundle /app
# Instala los modulos de npm
RUN (cd /app/programs/server && npm install)
# Expone el puerto 8080 para acceder a la aplicacion
EXPOSE 8080
# Variables de Entorno
ENV MONGO_URL=mongodb://leonardoespinosa: Leonardo2503@tstiurest-shard-00-00-pgydc.gcp.mongodb.net:27017,tstiurest-shard-00-01-pgydc.gcp.mongodb.net:27017,tstiurest-shard-00-02-pgydc.gcp.mongodb.net:27017/test?ssl=true&replicaSet=tstiurest-shard-0&authSource=admin
ENV ROOT_URL=http://localhost
ENV MAIL_URL=smtp://postmaster%40sandbox95e176686a5c4d7a9e057c9b830aa52b.mailgun.org:9e00683bdf7a01bc8061e7d28be6afd5@smtp.mailgun.org:587
ENV PORT=8080
# Ejecutar el comando node main.js
CMD node /app/main.js
