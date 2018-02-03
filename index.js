module.exports = class Awaitor {
    constructor() {
        this._tasks = {};
        this._callbacks = {};        
    }

    declare(task) {
        if(this._tasks[task]) throw new Error(`cannot re-declare a task: ${task}`);
        this._tasks[task] = new Promise((resolve, reject) => {
            this._callbacks[task] = (resolved, data) => {
                if(resolved) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            };
        });
    }

    wait(task) {
        return this._tasks[task];
    }

    resolve(task, data) {
        if(this._callbacks[task]) this._callbacks[task](true, data);
        else throw new Error(`task ${task} is not defined.`);
    }

    reject(task, data) {
        if(this._callbacks[task]) this._callbacks[task](false, data);
        else throw new Error(`task ${task} is not defined.`);
    }

}

