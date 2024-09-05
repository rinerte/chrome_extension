window.onload = function(){
    //////////////////////VARIABLES

//get all input elements
const inputsExt2987038734832 = document.querySelectorAll('input');
const templateBreakerExt2987038734832 = '#*CtBR$';
const headerDataBreakerExt2987038734832 = '#0mDm3d12^';

let selectedItemExt2987038734832 = null;
let MyAssistantWindow2987038734832 = null;
let templatesDataExt2987038734832 = null;

//////////////////////STYLES
const setDefaultStyleExt2987038734832 = (item) => {
	item.style.background="white";
	item.style.marginBottom="0px";
	item.style.marginTop="0px";
	item.style.marginLeft="0px";
	item.style.marginLeft="0px";
	item.style.text = '#000000';
}
const setSizeExt2987038734832 = (item,width,height) => {
	item.style.width = width;
	item.style.height = height;
}
//////////////////////CRUD
const readDataExt2987038734832 = () => {
	let key = window.location.href;
	if(selectedItemExt2987038734832.id){
		key+=selectedItemExt2987038734832.id;
	} else if(selectedItemExt2987038734832.className) {
		key+=selectedItemExt2987038734832.className;
	}
	const read = localStorage.getItem(key);
	if(read===null) return;
	else{
		let templates = read.split(templateBreakerExt2987038734832);
		const arr = templates.map((item)=>{
			const splitted = item.split(headerDataBreakerExt2987038734832);
			return {
				header: splitted[0],
				data: splitted[1]
			}
		});
		templatesDataExt2987038734832 = arr;
	}
}
const writeDataExt2987038734832 = () => {
	if(templatesDataExt2987038734832==null){
		 alert("Не удалось сохранить");
		 return;
	}
	let key = window.location.href;
	if(selectedItemExt2987038734832.id){
		key+=selectedItemExt2987038734832.id;
	} else if(selectedItemExt2987038734832.className) {
		key+=selectedItemExt2987038734832.className;
	}
	
	let data = '';
	templatesDataExt2987038734832.forEach(item=>{
		data+=item.header+headerDataBreakerExt2987038734832+item.data+templateBreakerExt2987038734832;
	});
	localStorage.setItem(key,data);
	alert("Изменения сохранены");
}
const addItemToDataExt2987038734832 = (item) => {
	
	if(templatesDataExt2987038734832==null){
		templatesDataExt2987038734832 = [];
	} 
	templatesDataExt2987038734832.push(item);
	writeDataExt2987038734832();
	fillMyAssistantWindow2987038734832();
}
const removeDataExt2987038734832 = (index) => {
	templatesDataExt2987038734832.splice(index,1);
	writeDataExt2987038734832();
	fillMyAssistantWindow2987038734832();
}
//////////////////////RENDERING

const renderDivExt2987038734832 = () => {
	let div = document.createElement('div');
	div.style.position = "fixed";
	div.style.zIndex = '909090';
	setSizeExt2987038734832(div,'30%','100vh');
	
	div.style.left = '70%';
	div.style.top = '0px';
	setDefaultStyleExt2987038734832(div);
	div.style.overflow = 'auto';
	div.style.border = "1px solid black";
	let header = document.createElement('h1');
	header.style.marginBottom = '0px';
	header.style.marginTop = '0px';	
	return div;
}
const renderAddTemplateRowExt2987038734832 = (callback) =>{
	let container = document.createElement('div');
	setDefaultStyleExt2987038734832(container);
	container.style.display ='flex';

	container.style.flexDirection = 'row';
	container.style.gap = '5px';
	container.style.marginTop='30px';
	container.style.paddings = '5px';
	
	let inputHeader = document.createElement('textarea');
	inputHeader.placeholder = "Введите название шаблона";
	inputHeader.style.width = '30%';
	inputHeader.style.height = '60px';
	inputHeader.style.paddingLeft = '15px';
	setDefaultStyleExt2987038734832(inputHeader);
	
	let input = document.createElement('textarea');
	input.placeholder = "Введите текст шаблона";
	input.style.width = '50%';
	input.style.height = '60px';
	input.style.paddingLeft = '15px';
	setDefaultStyleExt2987038734832(input);
	
	let button = document.createElement('button');
	setDefaultStyleExt2987038734832(button);
	button.innerText = "Добавить";
	button.addEventListener('click',()=>{
		
		if(!inputHeader.value.trim().length || !input.value.trim().length) {
			alert('Заполните поля');
			return;
		}
		const newElement = {
			header: inputHeader.value,
			data: input.value
		};
		callback(newElement);
	});
	container.appendChild(inputHeader);
	container.appendChild(input);
	container.appendChild(button);
	
	return container;
	
}

const renderTemplateRowExt2987038734832 = (item,index) => {
	
	if(!item.header || !item.data) return;
	
	let row = document.createElement('div');
	setDefaultStyleExt2987038734832(row);
	row.style.display ='flex';
	row.style.flexDirection = 'row';
	row.style.marginLeft = '15px';
	row.style.marginTop = '5px';
	row.style.justifyContent = 'center';
	row.style.alignItems = 'center';
	
	let label = document.createElement('label');
	setDefaultStyleExt2987038734832(label);
	label.innerText = item.header;
	label.style.fontSize = '24px';
	
	let button = document.createElement('button');
	
	button.innerText = "Вставить";
	button.style.height = '20px';
	button.style.marginLeft = '15px';
	button.addEventListener('click',()=>{
		selectedItemExt2987038734832.value+= item.data;
	});
	
	let buttonDelete = document.createElement('button');
	
	buttonDelete.innerText = "Удалить";
	buttonDelete.style.height = '20px';
	buttonDelete.style.marginLeft = '15px';
	buttonDelete.addEventListener('click',()=>{
		removeDataExt2987038734832(index);
	});
	
	row.appendChild(label);
	row.appendChild(button);
	row.appendChild(buttonDelete);
	MyAssistantWindow2987038734832.appendChild(row)
}

const renderHeaderExt2987038734832 = () => {
	const header = document.createElement('h1');
	setDefaultStyleExt2987038734832(header);
	
	header.style.backgroundColor = '#99cc99';
	header.style.paddingLeft = '20px';
	
	if(selectedItemExt2987038734832===null || (selectedItemExt2987038734832.type!='text' && selectedItemExt2987038734832.type!='search' && selectedItemExt2987038734832.type!='tel' && selectedItemExt2987038734832.type!='url')) {
		
		header.textContent = "Выберите поле для вставки";
	} else {
		header.textContent = 'Нажмите кнопку "Вставить" для вставки сохраненного шаблона';
	}
	return header;
}
const fillMyAssistantWindow2987038734832 = () =>{
	if(MyAssistantWindow2987038734832===null) return;
	if(selectedItemExt2987038734832===null || (selectedItemExt2987038734832.type!='text' && selectedItemExt2987038734832.type!='search' && selectedItemExt2987038734832.type!='tel' && selectedItemExt2987038734832.type!='url')){
		MyAssistantWindow2987038734832.textContent = '';
		const header = renderHeaderExt2987038734832();
		MyAssistantWindow2987038734832.appendChild(header);
	} else
	{
		MyAssistantWindow2987038734832.textContent = '';
		const header = renderHeaderExt2987038734832();		
		MyAssistantWindow2987038734832.appendChild(header);
		
		readDataExt2987038734832(selectedItemExt2987038734832);
		let data = templatesDataExt2987038734832;
		if(data===null || data.length<=0){
			const row = renderAddTemplateRowExt2987038734832(addItemToDataExt2987038734832);
			MyAssistantWindow2987038734832.appendChild(row)
		} else {
			data.forEach((item,i)=>renderTemplateRowExt2987038734832(item,i));
			const row = renderAddTemplateRowExt2987038734832(addItemToDataExt2987038734832);
			MyAssistantWindow2987038734832.appendChild(row)
		}
	}
}

//////////////////////SET EVENTS

	const toggleWindowExt2987038734832 = () => {
		if(MyAssistantWindow2987038734832===null){
			MyAssistantWindow2987038734832 = renderDivExt2987038734832();
			document.body.appendChild(MyAssistantWindow2987038734832);
			
			
			
			if(selectedItemExt2987038734832!==null && selectedItemExt2987038734832.getBoundingClientRect().left>MyAssistantWindow2987038734832.getBoundingClientRect().left)
			{
				MyAssistantWindow2987038734832.style.left =0;
			}
				
			fillMyAssistantWindow2987038734832();
		} else {
			MyAssistantWindow2987038734832.remove();
			MyAssistantWindow2987038734832 = null;
		}
	}
	
	document.addEventListener('keydown', function (e) {
		if(e.ctrlKey && (e.keyCode == 32 || e.keyCode == 'SPACE')) {			
			e.preventDefault();
			toggleWindowExt2987038734832();			
		}
	});
			
const itemsClickExt2987038734832 = (item) => {
	selectedItemExt2987038734832 = item;
	fillMyAssistantWindow2987038734832();
}

inputsExt2987038734832.forEach((item,i)=>{
	item.style.background = '#dddddd';
	item.addEventListener('click',()=>itemsClickExt2987038734832(item))
});
};
  






	
	
	




