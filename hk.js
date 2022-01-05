const puppeteer = require("puppeteer")
const codeObject = require('./code')
const loginLink = 'https://www.hackerrank.com/auth/login'
const email = "puranbareth62@gmail.com";
const password = "Puran8875@"

let browserOpen = puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],

    defaultViewport: null
})
let page

browserOpen.then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage()
    return browserOpenPromise;
}).then(function (newTab) {
    page = newTab
    let hackerrankOpenPromise = newTab.goto(loginLink);
    return hackerrankOpenPromise;
}).then(function () {
    let emailIsEntered = page.type("input[id='input-1']", email, { delay: 50 })
    return emailIsEntered
}).then(function () {
    let passwordIsEntered = page.type("input[type='password']", password, { delay: 50 })
    return passwordIsEntered
}).then(function () {
    let loginButtonClicked = page.click('button[data-analytics="LoginPassword"]', { delay: 50 })
    return loginButtonClicked
}).then(function () {
    let clickOnAlgopromise = waitAndClick('li [class="topic-link"]', page)
    return clickOnAlgopromise
}).then(function(){
    let getToWarmUp = waitAndClick('input[value="warmup"]', page)
    return getToWarmUp
}).then(function(){
    let waitFor3sec = page.waitFor(3000)
    return waitFor3sec

}).then(function(){
    let allChallengesPromise = page.$$('.challenge-submit-btn', {delay:50});
    return allChallengesPromise
}).then(function(questionArr){
    // console.log(" no of questions", questionArr.length);
    let questionWillSolved = questionSolver(page,questionArr[1],codeObject.answers[0])
    
})







function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModelpromise = cPage.waitForSelector(selector)
        waitForModelpromise.then(function(){
            let clickModal = cPage.click(selector)
            return clickModal
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })

    })

}

function questionSolver(page,question, answer ){
    return new Promise(function(resolve,reject){
        let questionWillBeClicked = question.click()
        questionWillBeClicked.then(function(){
            let editorPromise = waitAndClick('.monaco-editor.no-user-select.vs',page)
            return editorPromise
        }) .then(function(){
            return waitAndClick('.checkbox-input',page)
        }).then(function(){
            return page.waitForSelector('.input.text-area.custominput.auto-width',page)
         }).then(function(){
             return page.type('.input.text-area.custominput.auto-width',answer,{delay:30})
         }).then(function(){
             let ctrlIsPressed = page.keyboard.down('Control')
             return ctrlIsPressed
         }).then(function(){
             let aIsPressed =  page.keyboard.down('A',{delay:50})
             return aIsPressed
         }).then(function(){
             let xIsPressed = page.keyboard.down('X',{delay:20})
             return xIsPressed
         }).then(function(){
             let ctrlIsUnPressed = page.keyboard.up('Control')
             return ctrlIsUnPressed
         }).then(function(){
             let mainEditor = waitAndClick('.monaco-editor.no-user-select.vs',page)
             return mainEditor
         }).then(function(){

         }).then(function(){
             let ctrlIsPressed = page.keyboard.down('Control')
             return ctrlIsPressed
         }).then(function(){
            let aIsPressed =  page.keyboard.down('A',{delay:50})
            return aIsPressed
        }).then(function(){
            let vIsPressed =  page.keyboard.down('V',{delay:50})
            return vIsPressed
        }).then(function(){
            let ctrlIsUnPressed = page.keyboard.up('Control')
            return ctrlIsUnPressed
        }).then(function(){
            let runCodeButtonIsClicked = page.click('.hr-monaco__run-code.ui-btn-styled',{delay:10})
            return runCodeButtonIsClicked
        })
    })
} 