function talksAbout(node, string) {
    if (node.nodeType == document.ELEMENT_NODE) {
        for (var i = 0; i < node.childNodes.length; i++) {
            if (talksAbout(node.childNodes[i], string)) {
                return true;
            }
        }
        return false;
    } else if (node.nodeType == document.TEXT_NODE) {
        return -1 < node.nodeValue.indexOf(string);
    }
}

function highlighter(codeSegment, keywords) {

    var hlCode = document.createElement("pre");
    var code = codeSegment[0].childNodes[0].nodeValue;

    while (true) {
        if (keywords.test(code)) {
            /*COLOCAMOS UNA SECCION DE TEXTO QUE
             NO TENGA PALABRAS RESERVADAS*/
            var kword = keywords.exec(code);
            hlCode.appendChild(document.createTextNode(
                code.slice(0, kword.index)));
            /*creamos un nodo que resalte las palabras RESERVADAS*/
            var kwordElem = document.createElement("strong");
            kwordElem.appendChild(document.createTextNode(kword[0]));
            /*colocamos ese nodo en el elemento que queremos
                sobreescribir*/
            hlCode.appendChild(kwordElem);
            code = code.slice(kword.index + kword[0].length, code.length);
        } else {
            hlCode.appendChild(document.createTextNode(code));
            codeSegment[0].parentNode.replaceChild(hlCode, codeSegment[0]);
            break;
        }
    }
}

function barrelRoll() {
    var node = document.body.getElementsByTagName("pre");

    var curTime = new Date().getMilliseconds();
    node[0].style.top = Math.sin(curTime / 999 * Math.PI * 2) * 110 + "px";
    node[0].style.left = Math.cos(curTime / 999 * Math.PI * 2) * 110 + "px";
    window.requestAnimationFrame(barrelRoll);
}

function buildTable(objArray) {
    var table = document.createElement("table");

    var tableRow = document.createElement("tr");
    for (var name in objArray[0]) {
        var tableHeader = document.createElement("th");
        tableHeader.appendChild(document.createTextNode(name));
        tableRow.appendChild(tableHeader);
    }
    table.appendChild(tableRow);
    for (var i = 0; i < objArray.length; i++) {
        var tableRow = document.createElement("tr");

        var tableData = document.createElement("td");
        tableData.appendChild(document.createTextNode(objArray[i].name));
        tableRow.appendChild(tableData);

        var tableData = document.createElement("td");
        tableData.appendChild(document.createTextNode(objArray[i].height));
        tableRow.appendChild(tableData);

        var tableData = document.createElement("td");
        tableData.appendChild(document.createTextNode(objArray[i].country));
        tableRow.appendChild(tableData);

        table.appendChild(tableRow);
    }
    return table;
}

function byTagName(node, tagName) {
    arr = [];
    for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeType != 3) {
            arr = arr.concat(byTagName(node.childNodes[i], tagName));
        }
    }
    /*HOJAS*/
    if (node.tagName == tagName.toUpperCase()) {
        return node;
    }
    return arr;
}
/*
console.log(talksAbout(document.body, "ApoloBir"));
console.log(talksAbout(document.body, "Albert"));
*/

var oldNode = document.body.getElementsByTagName("h1")[0];
var newNode = document.createTextNode(
    "si no te gusta como pienso MERWEBO");
oldNode.parentNode.replaceChild(newNode, oldNode);

document.body.appendChild(document.createElement("p"));
document.body.getElementsByTagName("p")[0].setAttribute("id", "1234");

document.body.appendChild(document.body.getElementsByTagName("pre")[0]);

highlighter(document.body.getElementsByTagName("pre"),
    /\b(int|float|return|if|else)\b/);

var pis = document.body.getElementsByTagName("p");

var pre = document.body.getElementsByTagName("pre");
pre[0].style.position = "relative";

pre[0].style.top = pre[0].style.top + 30 + "px";
pre[0].style.left = pre[0].style.left + 100 + "px";
pis[0].style.color = "grey";

var MOUNTAINS = [
    { name: "Kilimanjaro", height: 5895, country: "Tanzania" },
    { name: "Everest", height: 8848, country: "Nepal" },
    { name: "Mount Fuji", height: 3776, country: "Japan" },
    { name: "Mont Blanc", height: 4808, country: "Italy/France" },
    { name: "Vaalserberg", height: 323, country: "Netherlands" },
    { name: "Denali", height: 6168, country: "United States" },
    { name: "Popocatepetl", height: 5465, country: "Mexico" }
];

//document.body.appendChild(buildTable(MOUNTAINS));
pre = document.querySelector("pre");
body = document.querySelector("body");
p = document.querySelector("p");

pre.addEventListener("click", function once(e) {
    if (e.which == 1) {
        console.log("leftButton");
        e.stopPropagation();
    } else if (e.which == 2)
        console.log("middleButton");
    else if (e.which == 3)
        console.log("rightButton");
});
/*
addEventListener("click", function(e) {
    var dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = (e.pageX - 4) + "px";
    dot.style.top = (e.pageY - 4) + "px";
    document.body.appendChild(dot);
});
*/
/*
var lastX; // tracks the last observed mouse X positiom
var rect = document.querySelector("div");

rect.addEventListener("mousedown", function(e) {
    if (e.which == 1) { //only leftClick
        lastX = e.pageX;
        addEventListener("mousemove", moved);
        e.preventDefault();
    }
});
*/
function buttonPressed(e) {
    //ALO? RECORDAR
    if (e.buttons == null)
        return e.which != 0;
    else
        return e.buttons != 0;
}

function moved(e) {
    if (!buttonPressed(e)) {
        removeEventListener("mousemove", moved);
    } else {
        var dist = e.pageX - lastX;
        var newWidth = Math.max(10, rect.offsetWidth + dist);
        rect.style.width = newWidth + "px";
        lastX = e.pageX;
    }
}

function isInside(node, target) {
    for (; node != null; node = node.parentNode)
        if (node == target) return true;
}

p.addEventListener("mouseover", function(e) {
    if (!isInside(event.relatedTarget, p))
        p.style.color = "red";
});
p.addEventListener("mouseout", function(e) {
    if (!isInside(event.relatedTarget, p))
        p.style.color = "";
});

var bar = document.querySelector(".progress div");
addEventListener("scroll", function() {
    var max = document.body.scrollHeight - innerHeight;
    var percent = (pageYOffset / max) * 100;
    bar.style.width = percent + "%";
});

var help = document.querySelector("#help");
var fields = document.querySelectorAll("input");
for (var i = 0; i < fields.length; i++) {
    fields[i].addEventListener("focus", function(event) {
        var text = event.target.getAttribute("data-help");
        help.textContent = text;
    });
    fields[i].addEventListener("blur", function(event) {
        help.textContent = "";
    });
}
var cosito = document.querySelector("div.cosito");
var este = document.querySelector("p#este");

cosito.addEventListener("focus", function(e) {
    este.textContent = "Estas posandote sobre este cosito";
});
cosito.addEventListener("blur", function(e) {
    este.textContent = "";
});

var canvas = document.querySelector("canvas").getContext("2d");
/*
var img = document.createElement("img");

img.src = "images/mario_sprites.png";

img.addEventListener("load", function() {
    var offSetConst = 30;
    var actOffSet = 0;
    canvas.translate(300, 0);
    canvas.scale(-1, 1);
    canvas.drawImage(img, 205, 0, 30, 20, 10, 30, 300, 300);
    setInterval(function() {
        if (375 - 60 < actOffSet + 205)
            actOffSet = 0;
        canvas.clearRect(0, 0, 300, 300);
        canvas.drawImage(img, 205 + actOffSet, 0, 30, 20, 10, 30, 300, 300);

        actOffSet = actOffSet + offSetConst;
    }, 150);
});
*/
function drawTrapezoid(canvas, x, y, upperBase, lowerBase, height) {
    canvas.beginPath();
    //upperBase drawing
    canvas.moveTo(x - upperBase / 2, y - height / 2);
    canvas.lineTo(x + upperBase / 2, y - height / 2);
    canvas.lineTo(x + lowerBase / 2, y + height / 2);
    canvas.lineTo(x - lowerBase / 2, y + height / 2);
    canvas.lineTo(x - upperBase / 2, y - height / 2);
    canvas.stroke();
    canvas.save();
}

canvas.rotate(45 * Math.PI / 180);
drawTrapezoid(canvas, 150, 150, 100, 80, 40);

canvas.rotate(45 * Math.PI / 180);
canvas.strokeRect(50, 50, 50, 50);


function backgroundReadFile(url, callback){
    var req = new XMLHttpRequest();
    req.open("GET", URL, true);
    req.addEventListener("load", function(){
        if(req.status < 400)
            callback(req.responseText);
    });
    req.send(null);
}
