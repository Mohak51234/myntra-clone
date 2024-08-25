const express = require('express');
const bodyParser = require('body-parser');

const { getStoredItems, storeItems } = require('./data/items');

const app = express();

app.use(bodyParser.json());

// CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers to control how resources on a web server can be requested from another domain outside the domain from which the resource originated. It’s a way to allow or restrict resources (like APIs) to be requested from different origins.

// Why CORS is Needed
// By default, web browsers implement the same-origin policy, which restricts how resources on a web page can be requested from another domain. This is important for security reasons to prevent unauthorized access to resources and sensitive data.

// CORS headers allow web servers to specify who can access the resources and how they can be accessed, thus providing a way to relax the same-origin policy.

// Setting CORS Headers
// In the provided code, CORS headers are set in the Express app to handle cross-origin requests. Here’s the middleware responsible for setting CORS headers:

// javascript
// Copy code
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });
// Explanation of Each Header
// Access-Control-Allow-Origin

// javascript
// Copy code
// res.setHeader('Access-Control-Allow-Origin', '*');
// This header specifies which origins are allowed to access the resource.
// '*' allows all origins to access the resource.
// For stricter security, you can specify a particular origin, like http://example.com, instead of '*'.
// Access-Control-Allow-Methods

// javascript
// Copy code
// res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
// This header specifies which HTTP methods are allowed when accessing the resource.
// In this case, only GET and POST requests are allowed.
// You can add more methods if needed, such as PUT, DELETE, OPTIONS, etc.
// Access-Control-Allow-Headers

// javascript
// Copy code
// res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
// This header specifies which HTTP headers can be used during the actual request.
// Content-Type is specified here, which is commonly needed for requests that send JSON data.
// Additional headers can be specified as needed, such as Authorization, X-Requested-With, etc.
// CORS Preflight Requests
// For certain types of requests (like those using methods other than GET/POST, or custom headers), browsers perform a "preflight" request using the OPTIONS method to check if the actual request is safe to send.

// Handling Preflight Requests
// To handle preflight requests in Express, you would need to add a route for OPTIONS:

// javascript
// Copy code
// app.options('*', (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.send();
// });
// Conclusion
// Setting CORS headers allows you to control which origins and methods can access your resources, enabling cross-origin requests while maintaining security. In the example provided, the middleware sets headers to allow any origin to access the resources using GET and POST methods, and to use the Content-Type header.

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/items', async (req, res) => {
  const storedItems = await getStoredItems();
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
  res.json({ items: storedItems });
});

app.get('/items/:id', async (req, res) => {
  const storedItems = await getStoredItems();
  const item = storedItems.find((item) => item.id === req.params.id);
  res.json({ item });
});

app.post('/items', async (req, res) => {
  const existingItems = await getStoredItems();
  const itemData = req.body;
  const newItem = {
    ...itemData,
    id: Math.random().toString(),
  };
  const updatedItems = [newItem, ...existingItems];
  await storeItems(updatedItems);
  res.status(201).json({ message: 'Stored new item.', item: newItem });
});

app.listen(8080);
