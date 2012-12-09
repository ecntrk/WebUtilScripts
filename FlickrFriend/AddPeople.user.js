// ==UserScript==
// @name        AddPeople
// @namespace   addpeople
// @description add peoples from your flickr contact mail box
// @include     http://www.flickr.com/mail/contact_notifications
// @include     http://www.flickr.com/mail/contact_notifications/*
// @include     http://www.flickr.com/people/*
// @exclude
// @version     1
// ==/UserScript==

/****************************
****************************/
/*		Free Software (Free, as they say, like Beer!)
**	Author: Debmalya Sinha
**  mail: debmalya.01@gmail.com
**	Flickr: http://www.flickr.com/photos/debmalya_sinha/

** Please, Feel free to use and change it in every way possible
** There's no Copyright .. it's CopyLeft :)
** Absolutely No rights reserved.

****************************
****************************/




var tl = document.getElementsByTagName("title")[0].text;
//var tl = 'asd';
//alert(tl);

//tl = document.title;
//alert(tl);
var listPage = "Flickr: Flickr Mail: Your Contact Notifications";
var mailPage = "Flickr: Message";
var conPage = "Flickr: Change a relationship";



if (tl == listPage){
		var asd = document.getElementsByClassName("subj");
		alert("Opening "+asd.length+" number of tabs.\nDon't worry i'll close them automagically");
		for (var i=0;i<asd.length;i++){
		var anchor = asd[i].childNodes[0];
		var link = anchor.getAttribute("href");
		if(link){
//			anchor.target = "_blank";
//			anchor.click();
window.open(link, '_blank');

// The reason behind opening tabs from this script is in Mozilla, it is not allowed to close a window from a script if it's not been created by one.
			}
		//	
		}
	}

else if (tl == mailPage){
		var asd = document.getElementsByClassName("ThinCase")[0];
		var a = asd.getElementsByTagName("p")[0].getElementsByTagName("a")[3];
		if(!a) //checking if it is a pending contact or not
			closePage();
		else
		a.click();
		
	}		
		

else if (tl == conPage){
//	alert("working");
	
		var alreadyFriend = document.getElementById("Main").getElementsByTagName("h1")[0].innerHTML;
//	alert("*"+alreadyFriend.split('\n')[1].split('\t')[3].split(' ')[0]+"*");
		alreadyFriend=alreadyFriend.split('\n')[1].split('\t')[3].split(' ')[0];	
		if (alreadyFriend=="Add"){
			var friend = document.getElementById("is_friend");
			friend.click();
			document.getElementsByClassName("ThinCase")[0].getElementsByTagName("input")[4].click();
		}
		else if (alreadyFriend=="Change"){
//		alert("Already a friend!");
		closePage();
		}
//		var family = document.getElementById("is_family");
//		alert(family.getAttribute("checked"));// + " " + family.getAttribute("name") );

}

else{
closePage();
}


function closePage(){
	//window.open(",'_self',");
	if (window.netscape)
		  netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserWrite");
	window.open('','_parent','');
	//window.top.opener=null;
	window.parent.close();
	//alert("woo");

}

/*
function openMail(){
alert(this.length);
window.open(this,'_blank');
}

var linkAdd = "success";
("href");
*/
