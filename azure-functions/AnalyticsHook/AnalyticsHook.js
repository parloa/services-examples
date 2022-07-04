
const messageExtractor = (response, platform) => {
  switch (platform) {
    case "phoneV2":
      return response.prompt.replace(/<\/?[^>]+(>|$)/g, "");
    default:
      return JSON.stringify(response);
  }
};

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query["parloa-health-check"]) {
        context.res = {
            status: 200
        };
        return context.done();
    }

    let responseMessage = "";
    if (Array.isArray(req.body)) {
        const transactions = req.body;

        const messages = transactions.reduce((messages, transaction) => {
            messages.push({
                type: "user",
                user_id: transaction.requesterId,
                timestamp: new Date(transaction.requestTimestamp).getTime(),
                platform: transaction.platform,
                intent: transaction.intent.name,
                intent_confidence: transaction.request.intent ? transaction.request.intent.confidence : null,
                message: transaction.request.text || transaction.request.event || "",
                not_handled: !transaction.intent.explicitlyHandled,
                session_id: transaction.userContextId,
                start_state: `${transaction.intent.initialState.dialogName}/${transaction.intent.initialState.name}`,
                next_state: `${transaction.intent.nextState.dialogName}/${transaction.intent.nextState.name}`,
                raw_input: JSON.stringify(transaction),
                variables: transaction.variables
            });
            messages.push({
                type: "agent",
                user_id: transaction.requesterId,
                timestamp: new Date(transaction.requestTimestamp).getTime() + transaction.responseTime,
                platform: transaction.platform,
                message: messageExtractor(transaction.response, transaction.platform),
                session_id: transaction.userContextId,
                start_state: `${transaction.intent.initialState.dialogName}/${transaction.intent.initialState.name}`,
                next_state: `${transaction.intent.nextState.dialogName}/${transaction.intent.nextState.name}`,
                raw_input: JSON.stringify(transaction),
                variables: transaction.variables
            });

            return messages;
        }, []);

        if (messages.length > 0) {
            context.log(messages);
            // responseMessage = JSON.stringify(messages);

            // TODO: Ensure consistent naming with binding in function.json!
            context.bindings.eventStorage = messages;
        }
    }


    context.res = {
        status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}