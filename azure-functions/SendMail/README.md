# Email Service Endpoint for Azure Functions

This service function provides a sample implementation to send emails from the Parloa dialog through an SMTP server.

Since it uses the package `nodemailer`, it is built as a deployable Azure Function as the `node_modules` folder has to be deployed along with the compiled TypeScript files.

Please configure the connection to the SMTP server in `SendMailTs/config.ts`. Refer to the [Nodemailer documentation](https://nodemailer.com/) for additional details.

Before deploying the code, make sure to run `npm install` and `npm run build`.