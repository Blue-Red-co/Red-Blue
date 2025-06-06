// Import all necessary items from node_helper in a single require statement.
const {
  initializeGlobalErrorHandler,
  ApplicationError,
  VW_Environment,
  Implementation_Manager,
} = require('node_helper');
initializeGlobalErrorHandler();

const routes = require('./routedefinitions');


const initServer = async () => {
  try {
    await VW_Environment.setEnvironment();
    await Implementation_Manager.initializeImplementation();
    Implementation_Manager.initializeHttpAndStartServer(routes);

  } catch (err) {
    // Ensure all errors go through the structured error handler.
    throw err instanceof ApplicationError
      ? err
      : new ApplicationError({ message: err.message, errorObject: err });
  }
};

// Start the server.
initServer();
