// require('dotenv').config(); // Load env variables at top

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const adminRoutes = require('./routes/admin'); // Make sure this file exists

// const app = express();


// // View engine (EJS, optional if not used)
// app.set('view engine', 'ejs');

// // Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static('public')); // Serve static assets like CSS/images

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log("✅ MongoDB connected");
// }).catch(err => {
//   console.error("❌ MongoDB Connection Error:", err);
// });

// // Routes
// app.use('/admin', adminRoutes);

// // Home route
// app.get('/', (req, res) => {
//   res.send(`
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>Welcome</title>
//       <style>
//         body {
//           font-family: Arial, sans-serif;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           height: 100vh;
//           background-color: #f0f0f0;
//           margin: 0;
//         }
//         .button {
//           padding: 15px 30px;
//           font-size: 18px;
//           background-color: #3498db;
//           color: white;
//           border: none;
//           border-radius: 8px;
//           cursor: pointer;
//           text-decoration: none;
//         }
//         .button:hover {
//           background-color: #2980b9;
//         }
//       </style>
//     </head>
//     <body>
//       <a href="/admin" class="button">Go to Admin Panel</a>
//     </body>
//     </html>
//   `);
// });

// // Start server (Render requires dynamic port)
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });





require('dotenv').config(); // Load env variables at top

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin'); // Make sure this file exists
const cors = require('cors'); // ✅ Added for frontend access

const app = express();

// View engine (EJS, optional if not used)
app.set('view engine', 'ejs');

// Middleware
app.use(cors()); // ✅ Allow cross-origin requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // ✅ Allow JSON body parsing
app.use(express.static('public')); // Serve static assets like CSS/images

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB connected");
}).catch(err => {
  console.error("❌ MongoDB Connection Error:", err);
});

// Routes
app.use('/admin', adminRoutes);

// Home route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Welcome</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f0f0;
          margin: 0;
        }
        .button {
          padding: 15px 30px;
          font-size: 18px;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
        }
        .button:hover {
          background-color: #2980b9;
        }
      </style>
    </head>
    <body>
      <a href="/admin" class="button">Go to Admin Panel</a>
    </body>
    </html>
  `);
});

// Start server (Render requires dynamic port)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
