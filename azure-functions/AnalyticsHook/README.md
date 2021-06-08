# Example Analytics Endpoint for Parloa

This is an example of an Analytics Endpoint for Parloa that can be deployed to Azure Functions.

The function transforms the transaction logs it receives from Parloa into transaction events and sends it to a CosmosDB output binding.

To adjust the CosmosDB output binding, adjust the `eventStorage` binding inside `function.json`, or via the Azure Functions UI.
If you change the binding name, make sure to adjust the code line `context.bindings.eventStorage = messages;` as well.

