
let url = window.location.host + window.location.pathname;
let selectedInputId = -1;
chrome.storage.sync.set({'currentUrl':url});

const setSelectedInput = (input,index) =>{
	chrome.storage.sync.set({'selectedInput':index});
	chrome.storage.sync.set({'currentUrl':url});
	let defaultValue = null;
	
	chrome.storage.sync.get({[url]:[]},function(item)
			{
				let data = item[[url]];
				let caption = "";
				for(let i=0; i<data.length; i++){
					if(data[i].index == index && data[i].data.default){
						caption = data[i].data.text;
					}
				}
				input.value = caption;
				input.dispatchEvent(new Event('input', { bubbles: true }));
			});

	
}
window.onload = () => {
	let inputs = document.getElementsByTagName('input');
	for (let i = 0; i < inputs.length; i++) {
		if(inputs[i].type=="text"){
			(function(i){
				inputs[i].addEventListener('click', ()=>setSelectedInput(inputs[i],i), false);
			})(i);
		}
	}
}
