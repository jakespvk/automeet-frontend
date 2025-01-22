"use client";

import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const Pricing = (props: {}) => {
	const [columns, setColumns] = useState([5]);
	const [rows, setRows] = useState([50]);
	const PRICE = calculatePrice(columns[0], rows[0]);

	function calculatePrice(columns: number, rows: number) {
		const factor = Math.pow(10, 2);
		const base_price = (Math.pow(2, columns * 0.1) * 0.1177) * ((columns) + (rows * 0.5));
		const rounded_price = Math.round(base_price * factor) / factor;
		return rounded_price;
	}

	function handlePurchase() {
		alert("Purchased ... jk, wip");
	}

	function reset() {
		setColumns([5]);
		setRows([50]);
	}



	return (
		<div>
			<div className="w-full h-svh flex justify-center items-center">
				<div className="glass-card">
					<div className="glass-card-contents">
						<h2 className="text-center text-xl mb-3">Scaled to your use case, only pay for what you use</h2>
						<div className="mx-auto w-96">
							<br></br>
							<label>Number of columns holding descriptive data</label>
							<Slider className="my-4" value={columns} onValueChange={setColumns} defaultValue={columns} max={26} step={1} />
							{(columns[0] === 26) ? <p>Enterprise</p> : <p>{columns[0]}</p>}
							<br></br>
							<label>Number of rows you'd like analyzed</label>
							<Slider className="my-4" value={rows} onValueChange={setRows} defaultValue={rows} max={260} step={10} />
							{(rows[0] === 260) ? <p>Enterprise</p> : <p>{rows[0]}</p>}
							<div className="flex mt-7">
								<strong>Your price:&nbsp;</strong>
								{(columns[0] === 26 || rows[0] === 260) ? <p>Enterprise</p> : <p>${PRICE}/month</p>}
							</div>
							<div className="mt-7 mx-12 flex justify-around items-center">
								<Button variant="outline" className="w-32 hover:bg-gray-200/10" onClick={reset}>Reset</Button>
								<Button className="w-32 bg-blue-600 hover:bg-blue-700" onClick={handlePurchase}>Let's do it</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >
	)
}

export default Pricing;
