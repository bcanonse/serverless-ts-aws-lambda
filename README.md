# Serverless framework con Typescript.

## Instalacion.

A continuacion, se describen los pasos a seguir para configurar un ambiente de *Nodejs* usando *Typescript*, *Eslint*, *Prettier* y librerías de *Serverless framework* para uso de Iac orientado al proveedor de servicios en la nube *AWS*

1. Inicializamos proyecto con npm `npm init`
2. Instalar dependencia de *Typescript* en modo desarrollo `npm i typescript --save-dev`
3. Configuramos el proyecto con Typescript `npx tsc --init`.
4. Inicializar *eslint* con `npm init @eslint/config`
4. Instalar dependencia de *prettier*.
5. Instalar dependencias de *serverless framework* para poder ejecutar funciones y servicios en local. ```npm install serverless-offline serverless-dynamodb  serverless-esbuild aws-sdk --save-dev```
6. Instalar dependencias para tipado de servicios aws `npm i @types/aws-sdk @types/node @types/aws-lambda --save-dev`



## Funcionalidad.

Como buen ingeniero de software hay que probar todo lo que se desarrollo, pero como probar funciones Lambda de AWS sin tener que desplegar cada servicio y en ambientes corporativos puedan ser costos para la empresa.

Es posible utilizar y testear los servicios en modo local.

Para ello es necesario utilizar serverles en modo offline.

La configuración se puede encontrar en el archivo `serverless.yml`

De igual forma, hay scripts en `npm` para poder ejecutar en modo local de una manera fácil.

Para poder desplegar el servicio en *AWS*, solo es necesario ejecutar el script de `npm deploy:dev` y esto realizara el despliegue de todos los servicios necesarios para crear una Lambda en AWS gracias a la herramienta de *Cloudformation* que usa *IaC* para optimizar y reducir el tiempo de crear la infraestructura necesaria servicios en la nube.

Para el final tener como resultado una URL como esta:

`https://nogixx5t5j.execute-api.us-east-1.amazonaws.com/dev/hello-world`

Listo con nuestro servicios *AWS Lambda*

Ahora si queremos eliminar todos los recursos creados en AWS para poder desplegar nuestro servicio de Lambda, solo basta con ejecutar el siguiente comando `npm run remove:deploy:dev`



### Utilizar DynamoDB.

Es necesario probar en local nuestros llamados hacia la base de datos de *DynamoDB*, y esto es posible gracias a `serverless-dynamodb`. Pero antes es necesario instalar la base de datos de forma local.

Solo basta con ejecutar el siguiente comando `npm run dynamodb:install` y colocar el plugin de *serverless-dynamodb* en el archivo .yml


