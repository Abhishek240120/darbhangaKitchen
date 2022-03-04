import "./styles.css"

import {useState,useRef} from 'react';
export default function TrackOrder(){
	const [tropt,setTropt]=useState("ord");
	const [orders,setOrders]=useState([]);
	const [searching,setSearching]=useState(0);
	return(
		<div class="container">
		
		<div class="TrackOrderMain">
			<TrackOptions changeTropt={setTropt}/>
			<SearchButton tropt={tropt} listOrder={setOrders} changeSearching={setSearching}/>
		</div>
		<div class="TrackOrderList">
			<ShowOrders orders={orders} searching={searching}/>
		</div>
		</div>
	);
}
function findOrder(trackId,trackType){
	var orders=[
	{
		"order no":"ordlhs0000001",
		"address":"Bangali Tola colon no.3,Laherisarai",
		"mobile":"7488083254",
		"date":"27/07/2021 10:34",
		"summary":[["Butter Panner",2],["Butter Panner",2]],
		"amount":"300",
		"payment status":"paid",
		"status":"preparing"
	},
	{
		"order no":"ordlhs0000002",
		"address":"Bangali Tola colon no.3,Laherisarai",
		"mobile":"7488083254",
		"date":"27/07/2021 10:34",
		"summary":[["Butter Panner",2],["Butter Panner",2]],
		"amount":"300",
		"payment status":"paid",
		"status":"preparing"
	},
	{
		"order no":"ordlhs0000003",
		"address":"Bangali Tola colon no.3,Laherisarai",
		"mobile":"7488083254",
		"date":"27/07/2021 10:34",
		"summary":[["Butter Panner",2],["Butter Panner",2]],
		"amount":"300",
		"payment status":"paid",
		"status":"preparing"
	}
	]

	if(trackType=="ord")trackType="order no";
	else if(trackType=="phn")trackType="mobile";

	var res=orders.filter((elem)=>{
		if(elem[trackType]==trackId) return true;
		return false;

	});
	return res;
}
function find(trackId,trackType,listOrder,changeSearching){
	changeSearching(1);
	setTimeout(()=>{
	changeSearching(0);
	},5000);
	listOrder(findOrder(trackId,trackType));
}

function TrackOptions({changeTropt}){
	return (
	<div>
		<select name="toptions" id="toptions" onChange={(e)=>{changeTropt(e.target.value)}}>
		  <option value="ord">Track By OrderNo.</option>
		  <option value="phn">Track By PhoneNo.</option>
		</select>
	</div>
	);
}
function SearchButton({tropt,listOrder,changeSearching}){
	var value="";
	let plhold="Enter "
	if(tropt=="ord") plhold+="Order No.";
	else if(tropt=="phn") plhold+="Phone No."
	return (
	<div>
		<div class="d-flex">
        <input onChange={(e)=>{value=e.target.value}} class="form-control me-2" type="search" placeholder={plhold} aria-label="Search"/>
        <button class="btn btn-outline-success"  onClick={()=>{find(value,tropt,listOrder,changeSearching)}}>Search</button>
      	</div>
	</div>
	);
}
function ShowOrders({orders,searching}){
	if(searching==1){
		return <div id="spinner">
		<div class="spinner-border" role="status">
		  <span class="visually-hidden">Loading...</span>
		</div>
		</div>
	}
	if(orders.length==0)
		return(
	<div>
	    <div id="message-of-no-order">No such order here.........</div>
	</div>
	);
	return(
	<div>
	{
		orders.map((order)=>{
			return <div>
		<h1>Order No : <span style={{"color":"red"}}>{order["order no"]}</span></h1>
		<h3>Date : <span style={{"color":"red"}}>{order.date}</span></h3>
		<h3>Address : <span style={{"color":"red"}}>{order.address}</span></h3>
		<h3>Mobile : <span style={{"color":"red"}}>{order.mobile}</span></h3>
		<h3 style={{"display":"grid","grid-template-columns":"15% 70%"}}><div>Summary :</div> <span style={{"color":"red"}}>
						<table>
						<tr> 
							<td>{order.summary[0][0]}</td>
							<td>{order.summary[0][1]}</td>
						</tr>
						<tr> 
							<td>{order.summary[1][0]}</td>
							<td>{order.summary[1][1]}</td>
						</tr>
						</table>
					  </span></h3>
		<h3>Amount : <span style={{"color":"red"}}>{order.amount}</span></h3>
		<h3>Payment status : <span style={{"color":"red"}}>{order["payment status"]}</span></h3>
		<h3>Status : <span style={{"color":"green"}}>{order.status}...</span></h3>
		<hr/>
		</div>
		})
		
	}
	</div>
	);
}
