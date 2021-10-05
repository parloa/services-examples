const createTrigger = function (service) {
  const run = async function (context, req) {
    const { choice, output } = await service.run(req.body, context);

    context.res = {
      status: 200,
      body: {
        choice,
        output,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  };

  return run;
};

module.exports = createTrigger;
