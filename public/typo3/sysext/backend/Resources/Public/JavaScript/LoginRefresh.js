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
define(["require","exports","jquery","TYPO3/CMS/Backend/Notification"],function(o,e,i,t){"use strict";var s;!function(o){o.loginrefresh="t3js-modal-loginrefresh",o.lockedModal="t3js-modal-backendlocked",o.loginFormModal="t3js-modal-backendloginform"}(s||(s={}));class n{constructor(){this.options={modalConfig:{backdrop:"static"}},this.webNotification=null,this.intervalTime=60,this.intervalId=null,this.backendIsLocked=!1,this.isTimingOut=!1,this.$timeoutModal=null,this.$backendLockedModal=null,this.$loginForm=null,this.loginFramesetUrl="",this.logoutUrl="",this.submitForm=(o=>{o.preventDefault();const e=this.$loginForm.find("form"),s=e.find("input[name=p_field]"),n=e.find("input[name=userident]"),a=s.val();if(""===a&&""===n.val())return t.error(TYPO3.lang["mess.refresh_login_failed"],TYPO3.lang["mess.refresh_login_emptyPassword"]),void s.focus();a&&(n.val(a),s.val(""));const l={login_status:"login"};i.each(e.serializeArray(),function(o,e){l[e.name]=e.value}),i.ajax({url:e.attr("action"),method:"POST",data:l,success:o=>{o.login.success?this.hideLoginForm():(t.error(TYPO3.lang["mess.refresh_login_failed"],TYPO3.lang["mess.refresh_login_failed_message"]),s.focus())}})}),this.checkActiveSession=(()=>{i.getJSON(TYPO3.settings.ajaxUrls.login_timedout,[],o=>{o.login.locked?this.backendIsLocked||(this.backendIsLocked=!0,this.showBackendLockedModal()):this.backendIsLocked&&(this.backendIsLocked=!1,this.hideBackendLockedModal()),this.backendIsLocked||(o.login.timed_out||o.login.will_time_out)&&(o.login.timed_out?this.showLoginForm():this.showTimeoutModal())})})}initialize(){this.initializeTimeoutModal(),this.initializeBackendLockedModal(),this.initializeLoginForm(),this.startTask(),"https:"===document.location.protocol&&"undefined"!=typeof Notification&&"granted"!==Notification.permission&&Notification.requestPermission()}startTask(){if(null!==this.intervalId)return;let o=1e3*this.intervalTime;this.intervalId=setInterval(this.checkActiveSession,o)}stopTask(){clearInterval(this.intervalId),this.intervalId=null}setIntervalTime(o){this.intervalTime=Math.min(o,86400)}setLogoutUrl(o){this.logoutUrl=o}setLoginFramesetUrl(o){this.loginFramesetUrl=o}showTimeoutModal(){this.isTimingOut=!0,this.$timeoutModal.modal(this.options.modalConfig),this.fillProgressbar(this.$timeoutModal),"https:"===document.location.protocol&&"undefined"!=typeof Notification&&"granted"===Notification.permission&&document.hidden&&(this.webNotification=new Notification(TYPO3.lang["mess.login_about_to_expire_title"],{body:TYPO3.lang["mess.login_about_to_expire"],icon:"/typo3/sysext/backend/Resources/Public/Images/Logo.png"}),this.webNotification.onclick=(()=>{window.focus()}))}hideTimeoutModal(){this.isTimingOut=!1,this.$timeoutModal.modal("hide"),"undefined"!=typeof Notification&&null!==this.webNotification&&this.webNotification.close()}showBackendLockedModal(){this.$backendLockedModal.modal(this.options.modalConfig)}hideBackendLockedModal(){this.$backendLockedModal.modal("hide")}showLoginForm(){i.ajax({url:TYPO3.settings.ajaxUrls.logout,method:"GET",success:()=>{TYPO3.configuration.showRefreshLoginPopup?this.showLoginPopup():this.$loginForm.modal(this.options.modalConfig)}})}showLoginPopup(){const o=window.open(this.loginFramesetUrl,"relogin_"+Math.random().toString(16).slice(2),"height=450,width=700,status=0,menubar=0,location=1");o&&o.focus()}hideLoginForm(){this.$loginForm.modal("hide")}initializeBackendLockedModal(){this.$backendLockedModal=this.generateModal(s.lockedModal),this.$backendLockedModal.find(".modal-header h4").text(TYPO3.lang["mess.please_wait"]),this.$backendLockedModal.find(".modal-body").append(i("<p />").text(TYPO3.lang["mess.be_locked"])),this.$backendLockedModal.find(".modal-footer").remove(),i("body").append(this.$backendLockedModal)}initializeTimeoutModal(){this.$timeoutModal=this.generateModal(s.loginrefresh),this.$timeoutModal.addClass("modal-severity-notice"),this.$timeoutModal.find(".modal-header h4").text(TYPO3.lang["mess.login_about_to_expire_title"]),this.$timeoutModal.find(".modal-body").append(i("<p />").text(TYPO3.lang["mess.login_about_to_expire"]),i("<div />",{class:"progress"}).append(i("<div />",{class:"progress-bar progress-bar-warning progress-bar-striped active",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100"}).append(i("<span />",{class:"sr-only"})))),this.$timeoutModal.find(".modal-footer").append(i("<button />",{class:"btn btn-default","data-action":"logout"}).text(TYPO3.lang["mess.refresh_login_logout_button"]).on("click",()=>{top.location.href=this.logoutUrl}),i("<button />",{class:"btn btn-primary t3js-active","data-action":"refreshSession"}).text(TYPO3.lang["mess.refresh_login_refresh_button"]).on("click",()=>{i.ajax({url:TYPO3.settings.ajaxUrls.login_timedout,method:"GET",success:()=>{this.hideTimeoutModal()}})})),this.registerDefaultModalEvents(this.$timeoutModal),i("body").append(this.$timeoutModal)}initializeLoginForm(){if(TYPO3.configuration.showRefreshLoginPopup)return;this.$loginForm=this.generateModal(s.loginFormModal),this.$loginForm.addClass("modal-notice");let e=String(TYPO3.lang["mess.refresh_login_title"]).replace("%s",TYPO3.configuration.username);this.$loginForm.find(".modal-header h4").text(e),this.$loginForm.find(".modal-body").append(i("<p />").text(TYPO3.lang["mess.login_expired"]),i("<form />",{id:"beLoginRefresh",method:"POST",action:TYPO3.settings.ajaxUrls.login}).append(i("<div />",{class:"form-group"}).append(i("<input />",{type:"password",name:"p_field",autofocus:"autofocus",class:"form-control",placeholder:TYPO3.lang["mess.refresh_login_password"],"data-rsa-encryption":"t3-loginrefres-userident"})),i("<input />",{type:"hidden",name:"username",value:TYPO3.configuration.username}),i("<input />",{type:"hidden",name:"userident",id:"t3-loginrefres-userident"}))),this.$loginForm.find(".modal-footer").append(i("<a />",{href:this.logoutUrl,class:"btn btn-default"}).text(TYPO3.lang["mess.refresh_exit_button"]),i("<button />",{type:"button",class:"btn btn-primary","data-action":"refreshSession"}).text(TYPO3.lang["mess.refresh_login_button"]).on("click",()=>{this.$loginForm.find("form").submit()})),this.registerDefaultModalEvents(this.$loginForm).on("submit",this.submitForm),i("body").append(this.$loginForm),o.specified("TYPO3/CMS/Rsaauth/RsaEncryptionModule")&&o(["TYPO3/CMS/Rsaauth/RsaEncryptionModule"],function(o){o.registerForm(i("#beLoginRefresh").get(0))})}generateModal(o){return i("<div />",{id:o,class:"t3js-modal "+o+" modal modal-type-default modal-severity-notice modal-style-light modal-size-small fade"}).append(i("<div />",{class:"modal-dialog"}).append(i("<div />",{class:"modal-content"}).append(i("<div />",{class:"modal-header"}).append(i("<h4 />",{class:"modal-title"})),i("<div />",{class:"modal-body"}),i("<div />",{class:"modal-footer"}))))}fillProgressbar(o){if(!this.isTimingOut)return;let e=0;const i=o.find(".progress-bar"),t=i.children(".sr-only"),s=setInterval(()=>{const o=e>=100;!this.isTimingOut||o?(clearInterval(s),o&&(this.hideTimeoutModal(),this.showLoginForm()),e=0):e+=1;const n=e+"%";i.css("width",n),t.text(n)},300)}registerDefaultModalEvents(o){return o.on("hidden.bs.modal",()=>{this.startTask()}).on("shown.bs.modal",()=>{this.stopTask(),this.$timeoutModal.find(".modal-footer .t3js-active").first().focus()}),o}}let a;try{window.opener&&window.opener.TYPO3&&window.opener.TYPO3.LoginRefresh&&(a=window.opener.TYPO3.LoginRefresh),parent&&parent.window.TYPO3&&parent.window.TYPO3.LoginRefresh&&(a=parent.window.TYPO3.LoginRefresh),top&&top.TYPO3&&top.TYPO3.LoginRefresh&&(a=top.TYPO3.LoginRefresh)}catch(o){}return a||(a=new n,"undefined"!=typeof TYPO3&&(TYPO3.LoginRefresh=a)),a});