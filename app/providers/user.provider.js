const path = require('path');
const fs = require('fs');

class UserProvider {
    constructor() {
        this._cache = null;
        this._path = path.join(__dirname, 'db', 'users.json');
    }

    async getUsers() {
        if (this._cache) return this._cache;

        try {
            fs.accessSync(this._path);
        } catch {
            this._cache = [];
            return this._cache;
        }

        const file$ = fs.createReadStream(this._path, { encoding: 'utf-8' });

        const data = await new Promise((resolve, reject) => {
            let result = '';

            file$
                .on('data', (data) => result += data)
                .on('end', () => resolve(result))
                .on('error', reject);
        });

        this._cache = JSON.parse(data);

        return this._cache;
    }

    async getUserByEmail(user_email) {
        if (!this._cache) {
            this._cache = await this.getUsers();
        }

        return this._cache.find(({ email }) => email === user_email);
    }

    async getUserById(user_id) {
        if (!this._cache) {
            this._cache = await this.getUsers();
        }

        return this._cache.find(({ id }) => id === +user_id);
    }

    async createUser(data) {
        if (!this._cache) {
            this._cache = await this.getUsers();
        }

        if (data.id) {
            const user = this._cache.find(({ id }) => id === data.id);
            Object.assign(user, data);
        } else {
            data = {
                ...data,
                id: Date.now()
            }
        }

        this._cache.push(data);

        const file$ = fs.createWriteStream(this._path, { encoding: 'utf-8' });
        file$.end(JSON.stringify(this._cache));

        return data;
    }
}

module.exports = new UserProvider();