## Quick Start

Create a `.env` file in `server` directory and put the following details inside that.
```
MONGO_URI=''
MONGO_DB_NAME=''
PORT=5000
JWT_SECRET=''

```

```bash
# Install dependencies for server
npm run server-install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```
# Features Under Development which will be added soon
- Upload Files to any CND
- Homepage list of user files endpoint
- Standalone shared file page UI and endpoint
- Delete owned file
