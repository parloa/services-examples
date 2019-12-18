# Service Boilerplate
This boilerplate provides a way to quickly setup a rest server which follows the interface of a parloa service.

## Start the server locally
While development it can be handy to run the server locally. It updates automatically on code changes. The following commands starts it:
> npm run start:local

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
Parloa needs access to your local machine. You can create a public url by running this command: 
> npm run tunnel

The script is predefined to be available under `https://skill-service-generator.localtunnel.me` so the checkAvailability Service can be reached under `https://skill-service-generator.localtunnel.me/checkAvailability`. The domain can be changed in `package.json`.

## Create a new service
To create a new service run
> npm run create-service

You get prompted for the name of the service. A new folder with a dummy service is created under `src/services/NAME_OF_NEW_SERVICE`. The service boilerplate consists of these files:
- `index.ts` - The functionality you want to provide to Parloa with the service.
- `index.test.ts` - A test for the service.
- `interfaces.ts` - The interface of the services as it is defined in parloa needs to be entered as typescript
- `interfaces-generated.ts` - This files does not need to be modified. The contained interaces wrap the interaces from `interfaces.ts` to provide a two simple ones.

## Renaming project
When this project is renamed it needs to be ensured, that the references for authentication are still correclty connect. To change the name of the project there is a script to ensure this:
> npm run rename-project