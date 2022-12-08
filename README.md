### This repository contains code of the completed ecommerce application built using React, Scss and Strapi.

* For the client side you have to add a .env file to store all the tokens and secret keys.
```
REACT_APP_API_URL = http://localhost:1337/api 
REACT_APP_API_TOKEN = your strapi api token
REACT_APP_UPLOAD_URL = http://localhost:1337
REACT_APP_STRIPE_PROMISE = your stripe public key
```

* For the api side you will have a .env file when you will create strapi project and then in that you can add:
```
STRIPE_KEY= your stripe secret key
CLIENT_URL= your redirect route
```

* To see the frontend design: #### [Checkout the website](https://magnifacio.netlify.app) ####
