
const {
  initializeGlobalErrorHandler,
  ApplicationError,
  VW_Environment,
  Implementation_Manager,
  Email_Helper  
} = require('node_helper');
initializeGlobalErrorHandler();

const routes = require('./routedefinitions');
const defaultEmailTemplates = require('./emailTemplate');


const initServer = async () => {
  try {
    await VW_Environment.setEnvironment();
    await Implementation_Manager.initializeImplementation();

    Email_Helper.setupEmailSender("test", { user: "apikey", senderEmailID: "admin@sherin.fun", pass: process.env.SMTP_APIKEY, senderName: "SherinV", host: process.env.SMTP_HOST, port: 587 })

    Email_Helper.setDefaultTemplates(defaultEmailTemplates["defaultEmailTemplates"]);
    Implementation_Manager.initializeHttpAndStartServer(routes);

  } catch (err) {
    // Ensure all errors go through the structured error handler.
    throw err instanceof ApplicationError
      ? err
      : new ApplicationError({ message: err.message, errorObject: err });
  }
};


initServer();
