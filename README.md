# Awaitor

await task among several async functions.

# Usage
```js
const Awaitor = require('awaitor');
const sleep = ms => new Promise(r => setTimeout(r, ms));

let question1 = 'who is your favorite singer?';
let question2 = 'why?';
let question3 = 'how old are you?';
let question4 = 'where are you come from?';

let awaitor = new Awaitor();

(async () => {
    let answer1 = await awaitor.wait(question1);
    console.log(question1, answer1);
    let answer2 = await awaitor.wait(question2);
    console.log(question2, answer2);
    await sleep(800);
    let answer3 = await awaitor.wait(question3).catch(err => console.log(`caught an error: ${err}`));
})()
.catch(console.error);


(async () => {
    await sleep(200);
    awaitor.resolve(question1, 'pg lost');
    await sleep(200);
    awaitor.resolve(question2, 'I like post-rock');
    awaitor.reject(question3, 'I dont want to tell you');

    // re-resolving or re-rejecting an task will be ignored
    awaitor.resolve(question3, 'I am kiding');

    // resovling/rejecting a question that no one is waiting for it now.
    // It will just go silent, and take effect immediately as soon as someone wait for it.
    awaitor.reject(question4, 'I dont want to tell you');
})()
.catch(console.error);
```