let tasks = {};
let callbacks = {};

function declare(task) {
    if(tasks[task]) throw new Error(`cannot re-declare a task: ${task}`);
    tasks[task] = new Promise((resolve, reject) => {
        callbacks[task] = (resolved, data) => {
            if(resolved) {
                resolve(data);
            }
            else {
                reject(data);
            }
        };
    });
}

function wait(task) {
    return tasks[task];
}

function resolve(task, data) {
    if(callbacks[task]) callbacks[task](true, data);
    else throw new Error(`task ${task} is not defined.`);
}

function reject(task, data) {
    if(callbacks[task]) callbacks[task](false, data);
    else throw new Error(`task ${task} is not defined.`);
}

module.exports = {
    declare,
    wait,
    resolve,
    reject
}