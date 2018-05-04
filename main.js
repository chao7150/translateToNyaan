const oktInitText = "おっきてるたまんね";

run();

async function run() {
    const tweetButton = document.querySelector("button.js-send-button");//jqueryオブジェクトにするとobserve出来ない
    if (tweetButton === null) {
        setTimeout(run, 500);
        return;
    }

    const tweetButtonContainer = $(".js-send-button-container");
    const oktButton = $("<button></button>", {
        "id": "okt-button",
        "class": "js-send-button js-spinner-button js-show-tip btn btn-positive btn-extra-height",
        "text": oktInitText,
        "data-original-title": "おっきてるたまんね (alt+n)"
    });
    tweetButtonContainer.prepend(oktButton);
    $(document).keydown(function (e) {
        if (e.keyCode === 78 && e.altKey) {//alt+nキー
            doOkt();
        }
    });
    oktButton.on("click", function () {
        doOkt();
    });
}

function doOkt() {
    const tweetTextArea = $('textarea.js-compose-text')[0];
    const inputText = selectOkt() + " #s" + String(Math.floor(Math.random()*100000) + " #sakugaokt")
    tweetTextArea.value = inputText
    tweetTextArea.dispatchEvent(new Event('change'))
}

function selectOkt() {
    const lottery = Math.random() * 100
    if (lottery < 30) {
        return "おっ"
    } 
    else if (lottery < 60) {
        return "きてる"
    }
    else if (lottery < 90) {
        return "たまんね"
    }
    else return "びゅううううう"
}