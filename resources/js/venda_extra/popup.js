//From http://www.accessify.com/features/tutorials/the-perfect-popup/
var newWindow = null;
function closeWin(){
	if (newWindow != null){ if(!newWindow.closed) {newWindow.close();}}
}
function popUpWin(url, type, strWidth, strHeight){
	closeWin();
	type = type.toLowerCase();
	if (type == "fullscreen"){
		strWidth = screen.availWidth;
		strHeight = screen.availHeight;
	}
	var tools="";
	if (type == "standard") { 
		tools = "resizable,toolbar=yes,location=yes,scrollbars=yes,menubar=yes,width="+strWidth+",height="+strHeight+",top=0,left=0";
	}
	if (type == "console" || type == "fullscreen") {
		tools = "resizable,toolbar=no,location=no,scrollbars=yes,width="+strWidth+",height="+strHeight+",left=0,top=0";
	}
	newWindow = window.open(url, 'newWin', tools);
	newWindow.focus();
}
function doPopUp(e) {
//set defaults - if nothing in rel attrib, these will be used
var t = "standard";
var w = "780";
var h = "580";
//look for parameters
attribs = this.rel.split(" ");
if (attribs[1]!=null) {t = attribs[1];}
if (attribs[2]!=null) {w = attribs[2];}
if (attribs[3]!=null) {h = attribs[3];}
//call the popup script
popUpWin(this.href,t,w,h);
//cancel the default link action if pop-up activated
if (window.event) {
	window.event.returnValue = false;
	window.event.cancelBubble = true;
	} 
else if (e) {
	e.stopPropagation();
	e.preventDefault();
	}
}
function findPopUps() {
var popups = document.getElementsByTagName("a");
for (i=0;i<popups.length;i++) {
	if (popups[i].rel.indexOf("popup")!=-1) {
		// attach popup behaviour
		popups[i].onclick = doPopUp;
		}
	}
}
//addEvent function is in sitewide.js
addEvent(window, 'load', findPopUps, false);