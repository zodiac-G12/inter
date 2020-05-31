var formId = 0;
var resId = 0;
var tail = 0;
var show = false;
var index = null;

const help = "Please read this. <a href='https://github.com/zodiac-G12/inter/blob/master/README.md'>https://github.com/zodiac-G12/inter/blob/master/README.md</a>";
const history = "history";

function showHistory() {
    return JSON.parse(localStorage.getItem('inter-log')).map((item)=>{return item.value});
}

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
    // 上:38
    // 下:40    
    const b = JSON.parse(localStorage.getItem('inter-log'));
    if ([38, 40].includes(event.keyCode)) {
        if(event.keyCode==38) {
            show = true;
            if (index>0&&index!=null) index -= 1;
            if (index==null) index = b.length-1;
            document.getElementById(`form${formId}`).value = b[index]["value"];
        } else if (event.keyCode==40 && show) {
            if (index==b.length-1) {
                document.getElementById(`form${formId}`).value = "";
                show = false;
                index = null;
            } else {
                index += 1;
                document.getElementById(`form${formId}`).value = b[index]["value"];
            }
        }
        return;
    }
    if (event.keyCode != 13) return;

    show = false;
    index = null;

    const value = document.getElementById(`form${formId}`).value;

    if (!b) {
        data = [{"value": `${value}`}];
    } else {
        b[b.length] = {"value": `${value}`};
        data = b;
    }
    localStorage.setItem('inter-log', JSON.stringify(data));

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

        document.getElementById(`result${resId}`).innerHTML = result=="history" ? showHistory() : result;

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
