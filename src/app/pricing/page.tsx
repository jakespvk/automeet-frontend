"use client";

import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const Pricing = () => {
    const [columns, setColumns] = useState([5]);
    const [rows, setRows] = useState([50]);
    const [pollFrequency, setPollFrequency] = useState([1]);
    const PRICE = calculatePrice(columns[0], rows[0], pollFrequency[0]);

    function calculatePrice(columns: number, rows: number, pollFrequency: number) {
        if (pollFrequency === 0 && columns <= 15 && rows <= 150) {
            return "Free";
        }
        else if (pollFrequency === 3 || columns > 25 || rows > 250) {
            return "Enterprise";
        } else {
            const factor = Math.pow(10, 2);
            let price = (Math.pow(2, columns * 0.1) * 0.1177) * ((columns) + (rows * 0.5));
            if (pollFrequency === 2) {
                price += 20;
            }
            if (pollFrequency === 0) {
                price /= 6.34;
            }
            return "$" + (Math.round(price * factor) / factor) + "/month";
        }
    }

    function translatePollFrequency(pollFrequency: number) {
        switch (pollFrequency) {
            case 2:
                return "Daily";
            case 1:
                return "Weekly";
            case 0:
                return "Monthly";
        }
    }

    function handlePurchase() {
        alert("Purchased ... jk, wip");
    }

    function handleContactForEnterprise() {
        alert("Contacted ... jk, wip");
    }

    function reset() {
        setColumns([5]);
        setRows([50]);
        setPollFrequency([1]);
    }

    return (
        <div>
            <div className="max-w-fit h-20 [@media(min-height:950px)]:hidden"></div>
            <div className="[@media(min-height:950px)]:h-dvh flex justify-center items-center">
                <div className="md:glass-card mx-8">
                    <div className="md:glass-card-contents">
                        <h2 className="md:text-center text-xl mb-3 text-pretty md:mx-auto">Scaled to your use case, only pay for what you use</h2>
                        <div className="md:w-96 md:mx-auto w-56 min-w-fit text-pretty">
                            <br></br>
                            <label>Number of columns holding descriptive data</label>
                            <Slider className="my-4" value={columns} onValueChange={setColumns} defaultValue={columns} max={26} step={1} />
                            {(columns[0] === 26) ? <p>Enterprise</p> : <p>{columns[0]}</p>}
                            <br></br>
                            <label>Number of rows you'd like analyzed</label>
                            <Slider className="my-4" value={rows} onValueChange={setRows} defaultValue={rows} max={260} step={10} />
                            {(rows[0] === 260) ? <p>Enterprise</p> : <p>{rows[0]}</p>}
                            <br></br>
                            <label>Frequency of polling</label>
                            <Slider className="my-4" value={pollFrequency} onValueChange={setPollFrequency} defaultValue={pollFrequency} max={3} step={1} />
                            {(pollFrequency[0] === 3) ? <p>Enterprise</p> : <p>{translatePollFrequency(pollFrequency[0])}</p>}
                            <div className="flex mt-7">
                                <strong>Your price:&nbsp;</strong>
                                {calculatePrice(columns[0], rows[0], pollFrequency[0])}
                            </div>
                            <div className="mt-7 mb-8 md:mx-12 flex justify-evenly md:justify-around items-center">
                                <Button variant="outline" className="w-32 hover:bg-gray-200/10" onClick={reset}>Reset</Button>
                                {(PRICE === "Enterprise")
                                    ?
                                    <Button className="w-32 bg-blue-600 hover:bg-blue-700" onClick={handleContactForEnterprise}>Contact Me</Button>
                                    :
                                    <Button className="w-32 bg-blue-600 hover:bg-blue-700" onClick={handlePurchase}>Let's do it</Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Pricing;
