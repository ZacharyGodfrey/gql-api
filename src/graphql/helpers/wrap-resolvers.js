const logRequest = require('./log-request');

module.exports = (serverContext, resolvers) => {
  const wrapped = {};

  Object.entries(resolvers).forEach(([ name, resolver ]) => {
      wrapped[name] = async (args) => {
          let result = null;
          let error = null;
          const requestContext = {
              server: serverContext,
              now: new Date().toISOString()
          };

          try {
              result = await resolver(requestContext, args);
          } catch (e) {
              error = e;

              console.error(e);
          }

          logRequest(name, requestContext, args, error, result);

          if (error) {
              throw error;
          } else {
              return result;
          }
      };
  });

  return wrapped;
};