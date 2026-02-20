📄 Mystery Messages App – README
 ## Project Overview

Mystery Messages is a modern web application built using Next.js, React, Tailwind CSS, and Node.js APIs. It allows users to explore creative message suggestions, send messages to other users or developers, and login to access personalized dashboards. AI-powered suggestions help users get inspired with engaging conversation starters or prompts.


🧠 Features

✔ Beautiful homepage with animated carousel
✔ AI-powered message suggestions
✔ Popup message form
✔ Authentication (Login / Dashboard)
✔ Public message sending
✔ Responsive UI with Tailwind
✔ Gmail email (OTP) verification using Nodemailer


root/
├── app/
│   ├── api/
│   │   ├── user/
│   │   ├── suggest-messages/
│   │   ├── send-email/
│   │   └── public-messages/
│   ├── dashboard/
│   └── page.jsx
├── components/
├── lib/
│   └── nodemailer.js
├── public/
├── styles/
├── .env.local
├── next.config.js
├── package.json
└── README.md


npm install
# or
yarn


