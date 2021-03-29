/**
 * @source: https://github.com/jfriend00/docReady
 * compatible to declared by author:
 IE6 and up
 Firefox 3.6 and up
 Chrome 14 and up
 Safari 5.1 and up
 Opera 11.6 and up
 Multiple iOS devices
 Multiple Android devices
 */
window.IE11_EOL_CONFIG = {
    template: '<style> .ie-11-eol-overlay-banner-link-to-browser{transition: none; } .ie-11-eol-overlay-banner-link-to-browser:hover{ color:green; } .ie-11-eol-overlay { z-index: 2147483644; /* max value is: 2147483647*/ position: absolute; top: 0; left: 0; right: 0; bottom: 0; text-align: center; /* for IE */ background: #f2f2f2; } .ie-11-eol-overlay-banner-link-to-browser { width: 100%; background: #18bfef; font-size: 70px; } .ie-11-eol-overlay-headline { font-size: 40px; } .ie-11-eol-more-information { background: #f2f2f2; padding-top: 70px; padding-bottom: 70px; } .ie-11-eol-overlay-legal-notes { background: #f2f2f2; position: absolute; bottom: 0; } .ie-11-eol-overlay-inner { position: relative; height: 100%; width: 100%; } </style> <div class="ie-11-eol-overlay"> <div class="ie-11-eol-overlay-inner"> <div id="ie-11-eol-overlay-main"> <div class="ie-11-eol-overlay-headline">Leider Microsoft hat die Unterstützung vom Internet Explorer eingestellt</div> <div class="ie-11-eol-overlay-banner-text"> <div>Damit du weiterhin im Internet aktiv sein kannst, brauchst du bei uns nur auf weiter zu klicken</div> <div><b>Es öffnet sich der neue Browser von Microsoft</b></div> </div> <a id="ie-11-eol-move-to-edge-link" href="microsoft-edge:https://yoursite.com"> <div class="ie-11-eol-overlay-banner-link-to-browser">Klicke hier um die Seite neuzuladen mit Mircosoft Edge</div> </a> <div class="ie-11-eol-more-information"> <a href="https://techcommunity.microsoft.com/t5/microsoft-365-blog/microsoft-365-apps-say-farewell-to-internet-explorer-11-and/ba-p/1591666"> [Englisch] Weitere Informationen von Microsoft </a> </div> </div> <div class="ie-11-eol-overlay-legal-notes"> <a id="ie-11-eol-overlay-impress" href="">Impressum</a> <a id="ie-11-eol-overlay-privacy" href="">Datenschutz</a> </div> </div> </div> ',
};

(function(funcName, baseObj) {
    "use strict";
    // The public function name defaults to window.docReady
    // but you can modify the last line of this function to pass in a different object or method name
    // if you want to put them in a different namespace and those will be used instead of
    // window.docReady(...)
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }

    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }

    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function(callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        // IE only safe when readyState is "complete", others safe when readyState is "interactive"
        if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("docReady", window);
function msieversion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
        return true;
    }
    return false;
}

docReady(function() {
        var IE_BANNER = window.document.createElement('div');
        IE_BANNER.style.position = "absolute";
        IE_BANNER.style.top = "0";
        IE_BANNER.style.left = "0";
        IE_BANNER.style.right = "0";
        IE_BANNER.style.bottom = "0";
        IE_BANNER.style.zIndex = "2147483644";
        IE_BANNER.style.height = "100%";
        IE_BANNER.style.width = "100%";
        IE_BANNER.style.background = "white";
        IE_BANNER.innerHTML = IE11_EOL_CONFIG.template;

        document.body.appendChild(IE_BANNER);//.appendChild(IE11_EOL_CONFIG)

});
