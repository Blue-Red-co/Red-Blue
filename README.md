
# ✨ Project Preview

Welcome to the repository of an evolving project crafted with passion and a custom-built Node.js module tailored from the ground up. This isn't just another app—it's a glimpse into something unique.

## 🚧 Development in Progress

This project is currently in **active development** and powered by a **custom Node.js module** authored exclusively by me. Since this module is not yet production-ready or released publicly, the project cannot be run locally at this time.

## 🛠️ Tech Stack

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="60" alt="React" title="React" />
  &nbsp;&nbsp;
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="60" alt="Node.js" title="Node.js" />
  &nbsp;&nbsp;
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" width="60" alt="Express" title="Express" />
  &nbsp;&nbsp;
  <img src="https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg" width="60" alt="MySQL" title="MySQL" />
</p>

- **Frontend:** React  
- **Backend:** Node.js, Express  
- **Database:** MySQL  
- **Custom Core Module:** Privately developed Node.js module (not yet released)

## 🌐 Live Demo

While local setup isn’t available, you can **experience the live output right here**:  
👉 [http://login.sherin.fun](http://login.sherin.fun)

🔄 _As the project grows, I will ensure that the latest build is always deployed and accessible at the above URL._

## ⚙️ Configuration Sample

Here's a sample of the local configuration structure used by the project. Note: **Sensitive values have been masked** for security and privacy reasons.

```jsonc
{
  "Local": {
    // Configuration keys for vio_node_helpers
    "MULTI_TENANT_DEPLOYMENT": "no",

    // Database connection details
    "DB_TYPE": ["mysql"],

    // MySql DB Connection parameters
    "MYSQLDB_HOST": "xxx.xxx.xxx.xxx",
    "MYSQLDB_NAME": "your_database_name",
    "MYSQLDB_USER": "your_username",
    "MYSQLDB_PASSWORD": "your_password",

    // HTTP server configuration
    "APPLICATION_PORT_NUMBER": 3010,
    "SSL_CONNECTION": "no",

    // JWT settings
    "JWT_TOKEN": "no",
    "JWT_SECRET": "your_jwt_secret",
    "NO_TOKEN_APIS": ["login"],
    "REQUST_PARAMS_FROM_TOKEN": ["userid"],
    "TOKEN_EXPIRY": {
      "W": 20,
      "M": 20,
      "T": 20,
      "S": 20
    },

    // Custom project configuration
    "DIST_FOLDER_NAME": "build"
  }
}
```

> 🔐 _This configuration example is for reference only. The real config file contains private details and is not published._

## 📌 Note

Thanks for stopping by! I’m actively working to make this project and its underlying tech more accessible. Stay tuned for updates and future releases.
