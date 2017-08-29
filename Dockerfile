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
ENV MONGO_URL=mongodb://leonardoespinosa:Leonardo2503@deviurest-shard-00-00-pgydc.mongodb.net:27017,deviurest-shard-00-01-pgydc.mongodb.net:27017,deviurest-shard-00-02-pgydc.mongodb.net:27017/meteor?ssl=true&replicaSet=deviurest-shard-0&authSource=admin
ENV ROOT_URL=http://localhost
ENV MAIL_URL=smtp://postmaster%40sandbox27b33ec12d63427d90c6433a1de0822a.mailgun.org:4df64d833753bfdb106f31aa7438dfd6@smtp.mailgun.org:587
ENV PORT=8080
# Ejecutar el comando node main.js
CMD node /app/main.js
