# Awaitor

await task among several async functions.

# Usage
```js
const awaitor = require('awaitor');
const sleep = ms => new Promise(r => setTimeout(r, ms));

let question1 = 'who is your favorite singer?';
let question2 = 'why?';

awaitor.declare(question1);
awaitor.declare(question2);

(async () => {
    let answer1 = await awaitor.wait(question1);
    console.log(question1, answer1);

    let answer2 = await awaitor.wait(question2);
    console.log(question2, answer2);
})()
.catch(console.error);


(async () => {
    await sleep(400);
    awaitor.resolve(question1, 'pg lost');
    await sleep(600);
    awaitor.resolve(question2, 'I like post-rock');
})()
.catch(console.error);
```