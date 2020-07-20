//Handles Id's
const ids=(val)=>{
	let value=document.getElementById(val);
	return value;
};
//Handles Classes
const classes=(val)=>{
	let values=document.getElementsByClassName(val);
	return values;
};
//Element Creation
const creator=(val)=>{
	let created=document.createElement(val);
	return created;
};

const chat_details={
	john:{
		image:'Images/john.jpg',
		online:true,
		name:'John Doe',
		message:'Hello,<br/>Myself John Doe...',
		time:'Sun'
	},
	alex:{
		image:'Images/alex.jpg',
		online:false,
		name:'Alex Johnson',
		message:'Great',
		time:'Fri'
	},
	nikhil:{
		image:'Images/nikhil.png',
		online:true,
		name:'Nikhil Shah',
		message:'Would like to join your Firm!',
		time:'Sat'
	},
	kendrick:{
		image:'Images/kendrick.jpg',
		online:false,
		name:'Kendrick Lamar',
		message:'Quote:So the next time you feel like the world’s about to end, I hope you studied, because he’s testing you ...',
		time:'Mon'
	},
	anirudh:{
		image:'Images/anirudh.png',
		online:false,
		name:'Anirudh Sharma',
		message:'Okay',
		time:'Sun'
	},
	robin:{
		image:'Images/robin.jpg',
		online:true,
		name:'Robin Sharma',
		message:'Glad you liked my book',
		time:'Tue'
	},
	elizabeth:{
		image:'Images/elizabeth.jpg',
		online:false,
		name:'Elizabeth Lawrence',
		message:'Great!',
		time:'Wed'
	},
	akshay:{
		image:'Images/akshay.png',
		online:false,
		name:'Akshay Patel',
		message:'Thank you',
		time:'Thu'
	},
	alexander:{
		image:'Images/alexander.jpg',
		online:false,
		name:'Alexander Shaw',
		message:'Hello, i needed your help',
		time:'Mon'
	},
	yash:{
		image:'Images/yash.png',
		online:true,
		name:'Yash Shah',
		message:'Need some tips on resume building',
		time:'Fri'
	},
	niles:{
		image:'Images/niles.jpg',
		online:true,
		name:'Niles Dhar',
		message:'Hello,<br/>Thank you for your interest in ...',
		time:'Sun'
	}
};

const chats_creator=()=>{
	for(let i in chat_details){
		const chat_container=creator('div');
		chat_container.classList.add('chat-container','flex');

		const image_container=creator('div');
		image_container.classList.add('image-container');
		
		//image
		const img=creator('img');
		img.classList.add('profile-img');
		img.setAttribute('src',chat_details[i]['image']);
		image_container.appendChild(img);
		if(chat_details[i]['online']){
			const online=creator('div');
			online.classList.add('online');
			image_container.appendChild(online);
		}
		chat_container.appendChild(image_container);

		//details
		const details=creator('div');
		details.classList.add('profile-details');
		//name and time
		const name_time=creator('div');
		name_time.classList.add('name-time','container','flex-space');
		//name
		const name=creator('div');
		name.classList.add('profile-name');
		name.innerHTML=chat_details[i]['name'];
		name_time.appendChild(name);
		//time
		const time=creator('div');
		time.classList.add('time');
		time.innerHTML=chat_details[i]['time'];
		name_time.appendChild(time);
		details.appendChild(name_time);
		//message
		const message=creator('div');
		message.classList.add('message','container');
		message.innerHTML=chat_details[i]['message'];
		details.appendChild(message);
		
		chat_container.appendChild(details);
		classes('messages-section')[0].appendChild(chat_container);	
	}
	
};
(()=>{
	chats_creator();
})();

classes('filter-icon')[0].addEventListener('click',()=>{
	classes('tags')[0].classList.toggle('visible');
});