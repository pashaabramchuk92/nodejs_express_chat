const config = require('config');
const app = require('./app');

const port = config.get('port');

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});