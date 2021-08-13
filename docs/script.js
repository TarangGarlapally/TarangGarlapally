var sideBarFlag = false;


function toggleSideBar(){
	if(sideBarFlag === false){
		document.getElementById("sideBarRight").style.visibility = "visible"; 
		sideBarFlag = true;
	}
	else {
		document.getElementById("sideBarRight").style.visibility = "hidden"; 
		sideBarFlag = false;
	}
}