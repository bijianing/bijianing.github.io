var fontList = [];

function resetLocalStorage() {
    var fontListInitValue = [ "OZ焦糖体",
    "仓耳与墨01",
    "仓耳与墨02",
    "仓耳与墨03",
    "仓耳与墨04",
    "仓耳与墨05",
    "仓耳周珂正大榜书",
    "仓耳舒圆体01",
    "仓耳舒圆体02",
    "仓耳舒圆体03",
    "仓耳舒圆体04",
    "仓耳舒圆体05",
    "仓耳非白01",
    "仓耳非白02",
    "仓耳非白03",
    "仓耳非白04",
    "仓耳非白05",
    "品如手写体",
    "庞门正道真贵楷体",
    "建刚草书字体",
    "悠哉字体0_85-Bold",
    "悠哉字体0_85-Light",
    "悠哉字体0_85-Medium",
    "悠哉字体0_85-Regular",
    "手书体",
    "方正楷体-大陆繁体.TTF",
    "方正楷体-简体",
    "智勇手书体",
    "智勇手书体2",
    "杨任东竹石体-Bold",
    "杨任东竹石体-Extralight",
    "杨任东竹石体-Heavy",
    "杨任东竹石体-Light",
    "杨任东竹石体-Medium",
    "杨任东竹石体-Regular",
    "杨任东竹石体-Semibold",
    "草书1_00",
    "草书1_002"
    ];

    localStorage.setItem("fontCount", fontListInitValue.length);
    for (var i = 0; i < fontListInitValue.length; i++) {
        localStorage.setItem("font" + i, fontListInitValue[i]);
    }
}

function initFromLocalStorage() {
    var fontCount = localStorage.getItem("fontCount");
    var font;
    if (!fontCount) {
        resetLocalStorage();
        fontCount = localStorage.getItem("fontCount");
        if (!fontCount) {
            window.alert("get font count failed: reset localstorage failed!");
            return;
        }
    }

    for (var i = 0; i < fontCount; i++) {
        font = localStorage.getItem("font" + i);
        if (!font) {
            window.alert("get font" + i + " failed: reset localstorage failed!");
            return;
        }
        fontList[i] = font;
    }
}

function getItemColor(i) {
    return "#eeeeee";
    // switch (i % 4) {
    //     case 0:
    //         return "#a0a0a0";
    //     case 1:
    //         return "#a8a8a8";
    //     case 2:
    //         return "#b0b0b0";
    //     case 3:
    //         return "#b8b8b8";
    //   }
}
function setFontIndex(i, font) {
    fontList[i] = font;
    localStorage.setItem("font" + i, font);
}

function moveItem_Swap(i, j) {
    var temp = fontList[i];
    setFontIndex(i, fontList[j]);
    setFontIndex(j, temp);
}

function moveItem_ToStart(i) {
    var temp = fontList[i];
    for (var j = i; j > 0; j--) {
        setFontIndex(j, fontList[j - 1]);
    }
    setFontIndex(0, temp);
}

function moveItem_ToEnd(i) {
    var temp = fontList[i];
    for (var j = i; j < fontList.length - 1; j++) {
        setFontIndex(j, fontList[j + 1]);
    }
    setFontIndex(j, temp);
}

function moveItem(i, dir) {
    console.log("move " + i + " to " + dir);

    if (dir == "Start") {
        if (i == 0) return;
        moveItem_ToStart(i);
    }
    else if (dir == "End") {
        if (i == fontList.length - 1) return;
        moveItem_ToEnd(i);
    }
    else if (dir == "Up") {
        if (i == 0) return;
        moveItem_Swap(i, i - 1);
    }
    else if (dir == "Down") {
        if (i == fontList.length - 1) return;
        moveItem_Swap(i, i + 1);
    }

    renderText();
}

function renderText() {
    var text = document.getElementById("textAreaForInput").value;
    var docStr = "";

    initFromLocalStorage();

    for (var i = 0; i < fontList.length; i++) {
        var font = fontList[i];
        // if (i % 4 == 0) {
        //     if (i > 0) {
        //         docStr += "</div>\n\n\n\n";
        //     }
    
        //     docStr += "<div class = \"row\">\n";
        // }

        docStr += "<div class=\"item\" style=\"background-color:" + getItemColor(i) + "; \">\n"
        docStr += "    <div class=\"text-content\">\n";
        docStr += "        <p class=\"title\">" + font + "</p>\n";
        docStr += "        <p class=\"" + font + "\">" + text + "</p>\n";
        docStr += "    </div>\n";
        docStr += "    <div class=\"updwon-btn-grp\">\n";
        docStr += "        <button onclick=\"moveItem(" + i + ", 'Start')\">Start</button>\n";
        docStr += "        <button onclick=\"moveItem(" + i + ", 'Up')\">Up</button>\n";
        docStr += "        <button onclick=\"moveItem(" + i + ", 'Down')\">Down</button>\n";
        docStr += "        <button onclick=\"moveItem(" + i + ", 'End')\">End</button>\n";
        docStr += "    </div>\n";
        docStr += "</div>\n\n";


    }
    // docStr += "</div>\n";
    // docStr = docStr.replaceAll("'", "\"");
    document.getElementById("outputArea").innerHTML = docStr;
//    console.log(docStr);
}
