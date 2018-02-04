const Awaitor = require('./index');
const sleep = ms => new Promise(r => setTimeout(r, ms));

let question1 = 'who is your favorite singer?';
let question2 = 'why?';
let question3 = 'how old are you?';
let question4 = 'where are you come from?';
let question5 = 'where are you going?';

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
    // re-resolving & re-rejecting an task will be ignore
    awaitor.resolve(question2, 'I am kiding');
    // rejecting a task will throw an error while waiting it,
    // if no one is waiting for it, it will just go silence.
    console.log('prerejecting some question that no one is waiting for them now.');
    awaitor.reject(question3, 'I dont want to tell you');
    awaitor.reject('none existing question', 'I dont want to tell you');
})()
.catch(console.error);