# Certificate-Generator
Frontend/Backend app that generates a certificate with correspondent hours filled the right codes, name and e-mail.
![Frontend printscreen](https://i.imgur.com/MLbmVde.png)
![Sample certificate printscreen](https://i.imgur.com/40kZJWl.png)
## Run instructions
### 1. Serve Frontend
```
cd frontend/
npm install
npm run serve
```

### 2. Serve Backend
```
cd backend/
npm install
npm run serve
```

### 3. Fill inputs
Codes are available at `/backend/server.js` variable `VALID_CODES`:
```
const VALID_CODES = {
    1: '1cx8J0',
    2: '2c91j7',
    3: '3c42km',
    4: '4cKv54',
    5: '5cj4xX',
}
```
Fill inputs with equivalent some `VALID_CODES` and name/e-mail.

A certificate will be generated at `backend/`

## Todo improvements:
### Sanitize code 
### Implement a download button
Currently the app is generating a certificate under `backend/` folder. It's still necessary to transform certificate into a blob and response it to frontend. 

### Add event logo and signature images samples

### Host website in netlify/heroku

## Improvements Implemented
### Sanitize name and mail
Fields are now sanitized in backend using `joi` library. 
