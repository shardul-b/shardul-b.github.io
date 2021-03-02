//Declare characters,special symbols and numbers
let characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!\"$%&/()=?@~`\\.\';:+=^*_-0123456789';
//Please don't insert < symbol as it created issues with output when I tried 
let user=document.getElementById('user_inp');

//Checks user input everytime he enters something in input box 
function checker(){
	if(user.value>=8 && user.value<=16){
		//Enable the button if true
		document.getElementById('but').disabled=false;
	}else{
		//Disabled by default
		document.getElementById('but').disabled=true;
	}
}
//This function generates random value
function randomGen(value){
	return Math.floor(Math.random()*value);
}
function copyText(){
	let input=document.createElement('input');
	input.type='text';
	let text=document.getElementById('password').innerHTML;
    	input.value=text;
	document.body.appendChild(input);
	input.select();
	document.execCommand('copy');
	document.body.removeChild(input);
	alert('Text Copied:'+text);
}
function calc(){
	//No need of array now as we can simply concatenate letters/nums/special chars
	let str='';
	//Concat letters/numbers/special characters
	for(let i=0;i<user.value;i++){
		let random=randomGen(characters.length);
		str+=characters.charAt(random);
	}
	document.getElementById('password').innerHTML=str;
}
