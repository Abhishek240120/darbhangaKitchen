import './styles.css'
import {Link} from 'react-router-dom';
import {useState} from 'react';
export function NewsLetter(){
	const [mail,setMail]=useState("");
	const [message,setMessage]=useState("Suscribe");
	function suscribe(event){
		console.log(mail);
		if(verifyMail(mail)==false)
			alert("please enter a valid mail address");
		else{
			document.getElementById("my-btn").disabled = true;
			alert("An otp has been sent to your Email : "+mail);
			var otp=prompt("Enter your otp : ");
			console.log(otp);
			setMessage("Processing");
			try{
				verifyOtp(otp).then((res)=>{
					if(res==="true")setMessage("Suscribed..");
					else{
						setMessage("Suscribe");
						alert("Failed to verify otp...try again")
						document.getElementById("my-btn").disabled = false;
						
					}
				});
				
			}catch(err){
				console.log(err);
			}
			
		}
	}
	function verifyOtp(otp){
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{resolve("false");},2000);
		});
		
	}
	const changeHandler=(event)=>{
		let p=event.target.value;
		setMail(p);

	}
	const verifyMail=(mail)=>{
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(filter.test(mail))
		return true;

		return false;
	}

	return(
		<div id='newsletter-box'>
			<div id='newsletter-head'>Suscribe to our NewsLetter</div>
			<div id='newsletter-phone'>
				Enter your Email: <input type="text" length="30" onChange={(event)=>{changeHandler(event)}}/>
			</div>
			<div id='newsletter-button'>
				<button id="my-btn" className="btn btn-primary" onClick={(event)=>{suscribe(event)}}>{message}</button>
			</div>
		</div>
	);
}