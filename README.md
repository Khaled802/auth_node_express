# Auth using passport

## functionalities
   1. sign-in
   2. login
   3. logout
   4. store the user data at mongodb
   5. hashing the passord and store it at db
      - using bcrybt
      - using salt for more security
   6. get data of user after login

## main dependencies
   - express
   - passport 
   - passport-local (it is local for local auth)
   - express-validator (to validate the request information at the body)
   - express-async-errors (to handle errors of async functions with middleware)
   - mongoose (to store the user info)
   - bcrypt (for hashing the password)

   