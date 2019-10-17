!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror"),require("./matchesonscrollbar")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","./matchesonscrollbar"],t):t(CodeMirror)}(function(t){"use strict";var e={style:"matchhighlight",minChars:2,delay:100,wordsOnly:!1,annotateScrollbar:!1,showToken:!1,trim:!0};function o(t){for(var o in this.options={},e)this.options[o]=(t&&t.hasOwnProperty(o)?t:e)[o];this.overlay=this.timeout=null,this.matchesonscroll=null,this.active=!1}function i(t){var e=t.state.matchHighlighter;(e.active||t.hasFocus())&&r(t,e)}function n(t){var e=t.state.matchHighlighter;e.active||(e.active=!0,r(t,e))}function r(t,e){clearTimeout(e.timeout),e.timeout=setTimeout(function(){c(t)},e.options.delay)}function a(t,e,o,i){var n=t.state.matchHighlighter;if(t.addOverlay(n.overlay=function(t,e,o){return{token:function(i){if(i.match(t)&&(!e||function(t,e){return!(t.start&&e.test(t.string.charAt(t.start-1))||t.pos!=t.string.length&&e.test(t.string.charAt(t.pos)))}(i,e)))return o;i.next(),i.skipTo(t.charAt(0))||i.skipToEnd()}}}(e,o,i)),n.options.annotateScrollbar&&t.showMatchesOnScrollbar){var r=o?new RegExp("\\b"+e.replace(/[\\\[.+*?(){|^$]/g,"\\$&")+"\\b"):e;n.matchesonscroll=t.showMatchesOnScrollbar(r,!1,{className:"CodeMirror-selection-highlight-scrollbar"})}}function s(t){var e=t.state.matchHighlighter;e.overlay&&(t.removeOverlay(e.overlay),e.overlay=null,e.matchesonscroll&&(e.matchesonscroll.clear(),e.matchesonscroll=null))}function c(t){t.operation(function(){var e=t.state.matchHighlighter;if(s(t),t.somethingSelected()||!e.options.showToken){var o=t.getCursor("from"),i=t.getCursor("to");if(o.line==i.line&&(!e.options.wordsOnly||function(t,e,o){if(null!==t.getRange(e,o).match(/^\w+$/)){if(e.ch>0){var i={line:e.line,ch:e.ch-1},n=t.getRange(i,e);if(null===n.match(/\W/))return!1}if(o.ch<t.getLine(e.line).length){var i={line:o.line,ch:o.ch+1},n=t.getRange(o,i);if(null===n.match(/\W/))return!1}return!0}return!1}(t,o,i))){var n=t.getRange(o,i);e.options.trim&&(n=n.replace(/^\s+|\s+$/g,"")),n.length>=e.options.minChars&&a(t,n,!1,e.options.style)}}else{for(var r=!0===e.options.showToken?/[\w$]/:e.options.showToken,c=t.getCursor(),l=t.getLine(c.line),h=c.ch,u=h;h&&r.test(l.charAt(h-1));)--h;for(;u<l.length&&r.test(l.charAt(u));)++u;h<u&&a(t,l.slice(h,u),r,e.options.style)}})}t.defineOption("highlightSelectionMatches",!1,function(e,r,a){if(a&&a!=t.Init&&(s(e),clearTimeout(e.state.matchHighlighter.timeout),e.state.matchHighlighter=null,e.off("cursorActivity",i),e.off("focus",n)),r){var l=e.state.matchHighlighter=new o(r);e.hasFocus()?(l.active=!0,c(e)):e.on("focus",n),e.on("cursorActivity",i)}})});