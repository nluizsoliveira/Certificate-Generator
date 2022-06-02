# Certificate-Generator
https://www.when2meet.com/?15819960-8xIJw 
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


### Add event logo and signature images samples

### Host website in netlify/heroku

## return expiring token in / route so /download route can only be accessed if user has a valid token 

## implement frontend e-mail error as backend validation/sanitization is more restrict than HTMLs built-in 
ex: nelson@usp.usp is valid for html @mail input type but backend blocks
OR make validation more broader on backend so nelson@usp.usp is not blocked 

## Improvements Implemented
### 1 Sanitize name and mail
Fields are now sanitized in backend using `joi` library. 
### 2 Sanitize Codes
Codes are now sanitized as well
### 3 Download button working!
App now downlods the pdf generated
