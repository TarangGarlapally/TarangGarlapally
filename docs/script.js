var sideBarFlag = false;


function toggleSideBar(companyName){
	if(sideBarFlag === false){
		document.getElementById("sideBarRight" + companyName).style.visibility = "visible"; 
		sideBarFlag = true;
	}
	else {
		document.getElementById("sideBarRight" + companyName).style.visibility = "hidden"; 
		sideBarFlag = false;
	}
}