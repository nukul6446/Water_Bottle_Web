jambooneer-
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx         # Main page component (all sections)
│   │   ├── main.jsx        # Entry point
│   │   ├── index.css       # Global styles + Tailwind
│   │   └── assets/         # Images (logo, bottles, etc.)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
│
├── server/                 # Express backend
│   ├── models/
│   │   └── Contact.js      # Mongoose schema
│   ├── routes/
│   │   └── contact.js      # API routes (POST / GET / PATCH)
│   ├── server.js           # Entry point
│   ├── package.json
│   └── .env.example
│
└── README.md               # You are here








backend setup -

npm init -y
installation - npm i cors express express-validator mongoose

 
