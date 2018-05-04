const oktInitText = "おっきてるたまんね";
const oktInitColor = "#80c0a0";

run();

async function run() {
    const tweetButton = document.querySelector("button.js-send-button");//jqueryオブジェクトにするとobserve出来ない
    if (tweetButton === null) {
        setTimeout(run, 1500);
        return;
    }

    const tweetButtonContainer = $(".js-send-button-container");
    const oktButton = $("<button></button>", {
        "id": "okt-button",
        "class": "js-send-button js-spinner-button js-show-tip btn btn-positive btn-extra-height",
        "text": oktInitText,
        "data-original-title": "おっきてるたまんね (alt+n)"
    });
    tweetButtonContainer.append(oktButton);
    $(document).keydown(function (e) {
        if (e.keyCode === 78 && e.altKey) {//alt+nキー
            doOkt();
        }
    });
    oktButton.on("click", function () {
        doOkt();
    });
/*     const tweetButtonObserver = new MutationObserver(function () {
        if (tweetButton.classList.contains("is-disabled")) {
            oktButton.addClass("is-disabled");
            oktButton.text(oktInitText);
        } else {
            oktButton.removeClass("is-disabled");
        }
        oktButton.css({"background-color": oktInitColor});
    }); */
    tweetButtonObserver.observe(tweetButton, {
        'attributes': true,
        "attributeFilter": ["class"]
    });

    const tweetTextArea = document.querySelector("textarea.js-compose-text");//jqueryオブジェクトにするとobserve出来ない
    const tweetObserver = new MutationObserver(function () {
        if (tweetTextArea.disabled) {
            oktButton.text("");
        }
        else {
            oktButton.css({"background-color": okiInitColor});
            oktButton.text(okiInitText);
        }
    });
    tweetObserver.observe(tweetTextArea, {
        "attributes": true,
        "attributeFilter": ["disabled"]
    });

    requestList(function () {
        const json = JSON.parse(this.responseText);
        $($('textarea.js-compose-text')[0]).highlightWithinTextarea({
            highlight: json.response
        });
    });
}

function doOkt() {
    const tweetTextArea = $('textarea.js-compose-text')[0];
    const inputText = selectOkt() + "(" + String(Math.floor(Math.random()*100000) + ")" + " #sakugaokt")
    tweetTextArea.value = inputText
    tweetTextArea.dispatchEvent(new Event('change'))
    $(".js-send-button").click()
}

function selectOkt() {
    let lottery = Math.floor(Math.random() * 100)
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