#Usage
Make your config
```javascript
config.mongoose = {
  url: 'mongodb://localhost/db_name',
  options: {}, // will be passed to mongoose.makeConnection
};
```

Put your schemas under `{app_root}/app/schema/` folder
```javascript
// Example 'User.js'
'use strict';

const mongoose = require('mongoose');

module.exports = app => {
  const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
  });
  return UserSchema;
};
```

Then use is with `app.model('User')` to get mongoose model.

#Events
Implement you callbacks in following methods:
```javascript
app.onMongooseDisconnected();
app.onMongooseConnected();
app.onMongooseConnecting();
app.onMongooseDisconnecting();
```

#Notice
You can ignore options about reconnect, it will make another connection for you when previous one is disconnected. As a result, we set `bufferCommands` as `false` default.