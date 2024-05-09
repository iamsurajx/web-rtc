folder structure
```bash

controller
    |---userController.js
public
  |---css
        |--style.css
  |----js
        |---script.js
routes
    |---userRoute.js
views
    |---index.ejs
index.js
package.json
```

#### package.json
```json
{
  "name": "web-rtc",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.20.2",
    "ejs": "^3.1.10",
    "express": "^4.19.2",
    "socket.io": "^4.7.5"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

#### Styling & views
```bash
public
  |---css
        |--style.css
  |----js
        |---script.js
```
#### style.css
```css

body {
  background-color: black;
  font-family: "Helvetica";
}

h2 {
  font-size: 18px;
  padding: 10px 20px;
  color: #ffffff;
}

#video-chat-form {
  text-align: center;
  max-width: 600px;
  background-color: #555;
  margin: 30px auto;
}

#chat-window {
  height: 400px;
  overflow: auto;
  background: #f9f9f9;
}

#output p {
  padding: 14px 0px;
  margin: 0 20px;
  border-bottom: 1px solid #e9e9e9;
  color: #555;
}

#feedback p {
  color: #aaa;
  padding: 14px 0px;
  margin: 0 20px;
}

#output strong {
  color: #574d4d;
}

label {
  box-sizing: border-box;
  display: block;
  padding: 10px 20px;
}

input {
  padding: 20px;
  box-sizing: border-box;
  background: #eee;
  display: block;
  width: 100%;
  background: rgb(255, 253, 253);
  font-family: Nunito;
  font-size: 16px;
}

button {
  background: #302e2e23;
  color: #fff;
  font-size: 18px;
  padding: 12px 0;
  width: 100%;
}

```

#### index.ejs
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Video Chat App</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.js"></script>
        <link href="css/style.css" rel="stylesheet" />
    </head>
    <body>

        <div id="video-chat-form">
            <h2 class="text">Video Chat App</h2>
            <input id="roomName" type="text" placeholder="Room Name" />
            <button id="join">Join</button>
        </div>
        <div id="video-chat-rooms">
            <video id="user-video"></video>
            <video id="peer-video"></video>
        </div>

    </body>
    <script src="https://cdn.socket.io/socket.io-3.0.1.min.js"></script>
    <script src="js/script.js"></script>
</html>
```

#### index.js
```javascript
const express = require('express');
const app = express();


app.listen(4040, () => {
  console.log(`SERVER : http://localhost:4040`);
})

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setting view middleware
app.set('view engine', 'ejs');
app.set('views', './views');

//public folder ko static bana diya 
app.use(express.static('public'));

const userRoute = require('./routes/userRoute');
app.use('/', userRoute);

```

### userRoute.js
```javascript
const express = require('express');
const router = express();

const userController = require('../controllers/userController')

router.get('/', userController.loadIndex);

module.exports = router;

```

### userController.js
```javascript
const loadIndex = async (req, res, next) => {
  try {
    // apna views ko render karna hai
    res.render('index');
  } catch (error) {
    console.log(error.message);
  }

  next();
}


module.exports = {
  loadIndex
}
```