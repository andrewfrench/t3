/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
define(["require","exports","./Enum/Severity","jquery","./Icons","./Modal","./Notification","./Viewport"],function(e,t,a,n,i,s,o,r){"use strict";var l;!function(e){e.hide=".t3js-record-hide",e.delete=".t3js-record-delete",e.icon=".t3js-icon"}(l||(l={}));class d{static refreshPageTree(){r.NavigationContainer&&r.NavigationContainer.PageTree&&r.NavigationContainer.PageTree.refreshTree()}constructor(){n(()=>{this.initialize()})}process(e){return this._call(e).done(e=>{e.hasErrors&&this.handleErrors(e)})}initialize(){n(document).on("click",l.hide,e=>{e.preventDefault();const t=n(e.currentTarget),a=t.find(l.icon),i=t.closest("tr[data-uid]"),s=t.data("params");this._showSpinnerIcon(a),this._call(s).done(e=>{e.hasErrors?this.handleErrors(e):this.toggleRow(i)})}),n(document).on("click",l.delete,e=>{e.preventDefault();const t=n(e.currentTarget);t.tooltip("hide"),s.confirm(t.data("title"),t.data("message"),a.SeverityEnum.warning,[{text:t.data("button-close-text")||TYPO3.lang["button.cancel"]||"Cancel",active:!0,btnClass:"btn-default",name:"cancel"},{text:t.data("button-ok-text")||TYPO3.lang["button.delete"]||"Delete",btnClass:"btn-warning",name:"delete"}]).on("button.clicked",e=>{"cancel"===e.target.getAttribute("name")?s.dismiss():"delete"===e.target.getAttribute("name")&&(s.dismiss(),this.deleteRecord(t))})})}toggleRow(e){const t=e.find(l.hide),a=t.closest("table[data-table]").data("table"),s=t.data("params");let o,r,c;"hidden"===t.data("state")?(r="visible",o=s.replace("=0","=1"),c="actions-edit-hide"):(r="hidden",o=s.replace("=1","=0"),c="actions-edit-unhide"),t.data("state",r).data("params",o),t.tooltip("hide").one("hidden.bs.tooltip",()=>{const e=t.data("toggleTitle");t.data("toggleTitle",t.attr("data-original-title")).attr("data-original-title",e)});const h=t.find(l.icon);i.getIcon(c,i.sizes.small).done(e=>{h.replaceWith(e)});const g=e.find(".col-icon "+l.icon);"hidden"===r?i.getIcon("miscellaneous-placeholder",i.sizes.small,"overlay-hidden").done(e=>{g.append(n(e).find(".icon-overlay"))}):g.find(".icon-overlay").remove(),e.fadeTo("fast",.4,()=>{e.fadeTo("fast",1)}),"pages"===a&&d.refreshPageTree()}deleteRecord(e){const t=e.data("params");let a=e.find(l.icon);this._showSpinnerIcon(a),this._call(t).done(t=>{if(i.getIcon("actions-edit-delete",i.sizes.small).done(t=>{(a=e.find(l.icon)).replaceWith(t)}),t.hasErrors)this.handleErrors(t);else{const t=e.closest("table[data-table]"),a=e.closest(".panel"),n=a.find(".panel-heading"),i=t.data("table");let s=e.closest("tr[data-uid]");const o=s.data("uid"),r=t.find("[data-l10nparent="+o+"]").closest("tr[data-uid]");if((s=s.add(r)).fadeTo("slow",.4,()=>{s.slideUp("slow",()=>{s.remove(),0===t.find("tbody tr").length&&a.slideUp("slow")})}),"0"===e.data("l10parent")||""===e.data("l10parent")){const e=Number(n.find(".t3js-table-total-items").html());n.find(".t3js-table-total-items").text(e-1)}"pages"===i&&d.refreshPageTree()}})}handleErrors(e){n.each(e.messages,(e,t)=>{o.error(t.title,t.message)})}_call(e){return n.getJSON(TYPO3.settings.ajaxUrls.record_process,e)}_showSpinnerIcon(e){i.getIcon("spinner-circle-dark",i.sizes.small).done(t=>{e.replaceWith(t)})}}return new d});