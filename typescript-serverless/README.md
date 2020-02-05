# Service Boilerplate
This boilerplate provides a way to quickly setup a rest server which follows the interface of a parloa service.

## Start the server locally
While development it can be handy to run the server locally. It updates automatically on code changes. The following commands starts it:
> npm run start

The service can be tried by
> curl -X POST \
  http://localhost:3000/mirror \
  -d '{
    "input": {
        "key1": "hi",
        "branch": "there"
    }
}'

## Make Service accessible from ther internet
To use the service with Parloa it has to be made available beforehand.
Make sure that the service is running locally by executing
> npm run start

To publicly expose the service run
> npm run ngrok

The service can now be used through a link similar to <em>`http://YOUR-HASH.ngrok.io`</em> and the services are accessable through
> `http://YOUR-HASH.ngrok.io/checkAvailability`

> `http://YOUR-HASH.ngrok.io/mirror`

## Create a new service
To create a new service run
> npm run create-service

You get prompted for the name of the service. A new folder with a dummy service is created under `src/services/MyNewServiceName`.
The sevices name is expected to be PascalCase-formatted.

The service boilerplate consists of these files:
- `index.ts` - The functionality you want to provide to Parloa with the service.
- `index.test.ts` - A test for the service.
- `interfaces.ts` - The interface of the services as it is defined in parloa needs to be entered as typescript
- `interfaces-generated.ts` - This files does not need to be modified. The contained interaces wrap the interaces from `interfaces.ts` to provide a two simple ones.

The new service will be made accessible by adding it to `routes.ts` automatically.


## Renaming project
When this project is renamed it needs to be ensured, that the references for authentication are still correclty connect. To change the name of the project there is a script to ensure this:
> npm run rename-project