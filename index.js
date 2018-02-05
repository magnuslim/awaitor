module.exports = class Awaitor {
    constructor() {
        this._tasks = {};
        this._callbacks = {};
        this._resolved = {};
        this._rejected = {};
    }

    unresolved() {
        return Object.keys(this._callbacks);
    }

    wait(task) {
        if(this._resolved[task]) {
            return new Promise(resolve => resolve(this._resolved[task]));
        }
        else if(this._rejected[task]) {
            return new Promise((_, reject) => reject(this._rejected[task]));
        }
        else {
            if(!this._tasks[task]) {
                this._tasks[task] = new Promise((resolve, reject) => {
                    this._callbacks[task] = (resolved, data) => {
                        resolved ? resolve(data) : reject(data);
                        delete this._callbacks[task];
                    };
                });
            }
            return this._tasks[task];
        }
    }

    resolve(task, data) {
        if(this._callbacks[task]) this._callbacks[task](true, data);
        if(!this._resolved[task] && !this._rejected[task]) this._resolved[task] = data;
    }

    reject(task, data) {
        if(this._callbacks[task]) this._callbacks[task](false, data);
        if(!this._resolved[task] && !this._rejected[task]) this._rejected[task] = data;
    }

}

