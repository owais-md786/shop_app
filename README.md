🛍️ Shopping App — Full-Stack E-Commerce Application

A full-stack e-commerce web application built with Node.js, Express.js, MongoDB, and EJS, designed to demonstrate practical backend development, secure authentication, RESTful API development, database management, and real-time communication.

Node Shop brings together the essential features of an online shopping platform in one application — from user authentication and product browsing to shopping cart management, order processing, and administrative product control.

«Built to learn, build, and apply real-world full-stack web development concepts.»

---

✨ Highlights

- 🔐 Session-Based Authentication — Manage authenticated user sessions using server-side session management.
- ⚡ Real-Time Communication — Integrate WebSocket-based communication using Socket.IO.
- 🔄 RESTful APIs — Handle application operations through structured HTTP endpoints.
- 🛒 Shopping Cart Management — Add products, update quantities, and remove items from the cart.
- 📦 Order Management — Manage customer orders and track order-related information.
- 🛠️ Admin Dashboard — Support administrative product management.
- 🔑 Password Reset Workflow — Implement a token-based password recovery process.
- 🛡️ Security Measures — Use CSRF protection and secure session-cookie settings.
- 🗄️ Database Integration — Store and manage application data using MongoDB and Mongoose.
- 📱 Responsive User Interface — Build server-rendered pages with EJS and enhance interactions using client-side JavaScript.

---

🧰 Tech Stack

Technology| Purpose
Node.js| JavaScript runtime for backend development
Express.js| Server, routing, and middleware
MongoDB| NoSQL database
Mongoose| Data models, schemas, and database operations
EJS| Server-side rendering and dynamic templates
JavaScript| Client-side interactions and application logic
REST APIs| HTTP-based communication and resource operations
Socket.IO| Real-time, event-based communication
Express Session| Session-based authentication
CSRF Protection| Protection against cross-site request forgery
Git & GitHub| Version control and source-code management

---

🚀 Features

🔐 Authentication and Account Management

- User signup and login.
- Session-based authentication.
- Protected routes for authenticated users.
- Role-based access for administrative functionality, where configured.
- Password reset using a time-limited token.
- Session-cookie configuration and CSRF protection.

🛍️ Product Browsing

- Browse products and view product information.
- Render dynamic product pages using EJS.
- Support product management through administrative routes.

🛒 Shopping Cart

- Add products to the shopping cart.
- Increase or decrease product quantities.
- Remove products from the cart.
- Synchronize cart operations with the backend and database.
- Update parts of the interface using JavaScript and fetch requests without requiring a full-page reload for supported actions.

📦 Order Management

- Process order-related operations.
- Associate orders with users.
- Display order information to authenticated users.
- Support order-status management where implemented.

🛠️ Administrative Product Management

- Add new products.
- Edit existing product information.
- Delete products.
- Manage product data through protected administrative routes.

⚡ Real-Time Communication

- Integrate Socket.IO with the Express HTTP server.
- Support event-based communication between connected clients and the server.
- Provide a foundation for real-time application features.

🔄 RESTful API Development

- Handle requests using HTTP methods such as "GET", "POST", "PUT", and "DELETE".
- Exchange data between client-side JavaScript and backend endpoints.
- Return structured responses for supported API operations.
- Test endpoints and inspect responses using Postman.

---

🏗️ Application Architecture

Node Shop follows a server-rendered web application architecture with additional client-side API interactions.

                  ┌─────────────────────┐
                  │     Web Browser     │
                  │ EJS Pages + JavaScript│
                  └──────────┬──────────┘
                             │ HTTP / Fetch
                             ▼
                  ┌─────────────────────┐
                  │   Express.js Server │
                  │ Routes & Middleware │
                  └──────────┬──────────┘
                             │
                ┌────────────┼────────────┐
                ▼            ▼            ▼
          ┌──────────┐ ┌───────────┐ ┌───────────┐
          │Controllers│ │ Sessions  │ │ Socket.IO │
          │ & Logic   │ │ & Security│ │ Real-time │
          └─────┬────┘ └───────────┘ └───────────┘
                │
                ▼
          ┌───────────────┐
          │ MongoDB       │
          │ via Mongoose  │
          └───────────────┘

Request flow

1. A user interacts with a page rendered by EJS.
2. Express middleware processes the incoming request.
3. Routes direct the request to the appropriate application logic.
4. Controllers validate input and perform the required operations.
5. Mongoose communicates with MongoDB when database access is needed.
6. The server returns an HTML page or an API response, depending on the endpoint.

For supported cart interactions, client-side JavaScript uses "fetch()" to communicate with the backend and update the interface without a full-page reload.

---

```📁 Project Structure

shop_app/
|-- controllers/
|-- models/
|-- routes/
|-- middleware/
|-- views/
|-- public/
|-- util/
|-- socketInitialize.js
|-- newExpress.js
|-- package.json
|-- .gitignore
`-- README.md
```

Note: This is a simplified representation of the project structure. Individual folders contain additional files as required.

---

🔒 Security Considerations

Security is an important part of the application's implementation.

- Session-based authentication: Maintain user authentication through server-managed sessions.
- CSRF protection: Protect applicable state-changing requests using CSRF tokens.
- HTTP-only cookies: Prevent client-side JavaScript from directly accessing session cookies.
- Secure production cookies: Configure cookies appropriately for HTTPS deployments.
- Environment variables: Keep secrets and deployment-specific configuration outside source code.
- Protected routes: Restrict access to authenticated users and administrative operations as appropriate.

«Security depends on correct configuration and validation across the application. These features should not be interpreted as a guarantee that the application is free of vulnerabilities.»

---

⚙️ Getting Started

Prerequisites

Make sure you have the following installed:

- "Node.js" (https://nodejs.org/)
- npm
- "MongoDB" (https://www.mongodb.com/) — local instance or a MongoDB Atlas database
- Git

1. Clone the repository

git clone https://github.com/owais-md786/shop_app.git
cd shop_app

2. Install dependencies

npm install

3. Configure environment variables

Create a ".env" file in the project root and add the configuration required by your application.

PORT=8080
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_long_random_session_secret

Add any additional variables required by your code, such as email-service credentials or other application settings.

Important: The variable names above are examples. Use the exact names referenced in your project code. Never commit real credentials, database passwords, private keys, or your ".env" file.

4. Start the application

Use the start command defined in your "package.json". If your application starts through "newExpress.js", for example:

node newExpress.js

Then open:

http://localhost:8080

Ensure MongoDB is accessible and the required environment variables are configured before starting the application.

---

🧪 API Testing

API endpoints can be tested with "Postman" (https://www.postman.com/).

A typical testing workflow includes:

1. Select the appropriate HTTP method.
2. Enter the endpoint URL.
3. Add request headers, query parameters, or a JSON body as required.
4. Send the request.
5. Inspect the response status, body, and headers.
6. Test validation, authentication, and error-handling behavior.

The actual endpoints, payloads, and authentication requirements depend on the application's route definitions.

---

🌐 Deployment

The application can be deployed to a Node.js-compatible hosting platform, with MongoDB hosted separately or through a managed database service.

Deployment checklist:

- Configure all required environment variables.
- Set the production database connection string.
- Ensure the server listens on the hosting platform's assigned port.
- Configure session cookies and trusted proxy settings appropriately for HTTPS deployments.
- Configure any required email service.
- Keep secrets and private keys out of the repository.
- Test login, cart operations, order workflows, administrative routes, and Socket.IO connections after deployment.

---

📚 What This Project Demonstrates

This project brings together several practical web-development concepts:

- Building a backend using Node.js and Express.js.
- Designing and consuming RESTful endpoints.
- Working with MongoDB and Mongoose.
- Implementing server-side session-based authentication.
- Managing middleware, cookies, and CSRF protection.
- Rendering dynamic pages using EJS.
- Connecting frontend interactions to backend APIs.
- Implementing event-driven communication with Socket.IO.
- Handling product, cart, and order-related workflows.
- Managing code changes with Git and GitHub.
- Configuring an application for deployment.

---

🤝 Contributions

Suggestions, bug reports, and improvements are welcome. If you want to contribute, fork the repository, create a feature branch, and submit a pull request.

1. Fork the repository.
2. Create a branch for your change.
3. Commit your changes with a clear message.
4. Open a pull request describing the improvement.

---

👨‍💻 Author

Owais

GitHub: "@owais-md786" (https://github.com/owais-md786)

---

⭐ If you find this project useful or interesting, consider giving the repository a star.

Built with Node.js, Express.js, MongoDB, and a continuous focus on learning practical full-stack development.