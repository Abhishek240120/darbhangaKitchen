import Menu from "../Menu.js";
import NewOrder from "../order.js";
import "./styles.css";
import {useState} from 'react';

export default function OrderSummary(){
	const [bill,setBill]=useState({});
	var orderedList={
		id:[],
		items:[],
		quantity:[],
		cost:[],
		total:0,
		date:new Date()
	};	
	var total=0;
	var arr=[];
	var index=0;
	for(var dish in Menu){
		let id=Menu[dish].id;
		//console.log(id);
		for(var i in NewOrder.order){
			if(i==id && NewOrder.order[i]>0){
				arr.push(index);
				index++;
				orderedList.id.push(i);
				orderedList.items.push(Menu[dish].name);
				orderedList.quantity.push(NewOrder.order[i]);
				orderedList.cost.push(Menu[dish].cost);
				total=total+(Menu[dish].cost)*(NewOrder.order[i]);
				break;
			}
		}
	}
	orderedList.total=total;
	
	
	console.log(arr);
	return(
		<div className="container orderSummary">
			<div><h1>Order Summary</h1>
			<div id="order-table">
				<table style={{"width":"100%"}}>
					<tr>
					    <th>Item</th>
					    <th>Quantity</th>
					    <th>Cost</th>
					    <th>Amount</th>
					</tr>
					 {
					 		arr.map((i)=>{
						    	return (<tr>
					    			<td>{orderedList.items[i]}</td>
					    			<td>{orderedList.quantity[i]}</td>
					    			<td>{orderedList.cost[i]}</td>
					    			<td>{orderedList.cost[i]*orderedList.quantity[i]}</td>
								</tr>);
					 		})
					 }
					 <tr>
					    <th>Total</th>
					    <th></th>
					    <th></th>
					    <th>{total}</th>
					</tr>
				</table>
			</div>
		</div>
		<div className="contact">
			<div className="contact-items"><label>Phone No.</label><input type="number" name="pnum"/></div>
			<div className="contact-items"><label>Address  </label><textarea  name="add"/></div>
			<div className="contact-items"><label>Suggestions </label><textarea type="textarea" name="sugg"/></div>
		</div>
		<div id="orderNowButton"><button className="btn btn-primary">Order Now</button></div>
		</div>
	);
}