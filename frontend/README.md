## Getting Started with Frontend
Follow these steps to set up and run the frontend of the project:

### Step 1: Clone the Repository

Clone the project repository to your local machine. Use the following command in your terminal:
```sh
 git clone https://github.com/Tushar-022/vcsHackon.git
```
### Step 2: Navigate to the Project Directory
 ```sh
   cd hackon
   ```
### Step 3: Install the Dependencies
 ```sh
   npm install
   ```
### Step 4: Create .env file

Create a .env file in the root directory of the frontend project and add the following environment variables:
```sh
REACT_APP_API_KEY=your-api-key
REACT_APP_AUTH_DOMAIN=your-auth-domain
REACT_APP_PROJECT_ID=your-project-id
REACT_APP_STORAGE_BUCKET=your-storage-bucket
REACT_APP_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_APP_ID=your-app-id
REACT_APP_MEASUREMENT_ID=your-measurement-id
REACT_APP_EMAIL_CONFIRMATION_REDIRECT=your-email-confirmation-redirect
FAST_REFRESH=true
```

### Step 5: Start the Development Server
Finally, start the development server by running:
```sh
   npm start
```
This command will start the application and open it in your default web browser at http://localhost:3000.
