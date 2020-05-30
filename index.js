var formId = 0;
var resId = 0;
var tail = 0;

function init() {
    const oVh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--ovh', `${oVh}px`);
}

function contf(fid) {
    return `
        <a class="bfr-prompt">zodiac.github.io</a>
        <div class="bfr-dir"></div>         
        <a class="afr-prompt">~/js-run</a>
        <div class="afr-dir"></div>
        <input id="form${fid}" onkeydown="submit(event)" autofocus></input>        
    `;
}

function addHtml() {
    var div = document.createElement("div");
    div.setAttribute("id", `cmd${tail}`);
    div.setAttribute("class", "cmd-container");
    div.innerHTML = contf(formId);
    document.body.insertBefore(div, document.getElementById(`result${resId-1}`).nextSibling);

    var div = document.createElement("div");
    div.setAttribute("id", `result${resId}`);
    div.setAttribute("class", "res");
    document.body.insertBefore(div, document.getElementById(`cmd${tail}`).nextSibling);

    document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight;
}

function submit(event) {
    if (event.keyCode != 13) return;

    const value = document.getElementById(`form${formId}`).value;
    a(value);
}

function asyncEval (str) {
    return new Promise((resolve, reject) => {
        try {
            const result = eval(str);
            resolve(result);
        } catch (error) {
            console.error('Error occured at eval function');
            reject(error);
        }
    })  
}

function a(str){
    return asyncEval(str).then((res) => {
        result = res;

        document.getElementById(`form${formId}`).disabled = "disabled";

        document.getElementById(`result${resId}`).innerHTML = result;

        formId += 1;
        resId += 1;
        tail += 1;

        addHtml();
    }).catch((err) => {
        document.getElementById(`form${formId}`).disabled = "disabled";

        document.getElementById(`result${resId}`).innerHTML = err;

        formId += 1;
        resId += 1;
        tail += 1;

        addHtml();
    })
}
//
// aa = a('[1,w]')
// // console.log(aa)
//

window.addEventListener('DOMContentLoaded', init);
