"use client";

import { Slider } from "@/components/ui/slider";
import { useState } from "react";
const Pricing = (props: {}) => {
    const [columns, setColumns] = useState(5);
    const [rows, setRows] = useState(50);


    return (
        <div>
            <div className="w-full h-svh flex justify-center items-center">
                <div className="glass-card">
                    <div className="mx-7 my-7">
                        <h2 className="text-center text-xl">Scaled to your use case, only pay for what you use</h2>
                        <div className="mx-auto w-96 my-7">
                            <br></br>
                            <Slider className="my-7" defaultValue={[40]} max={100} step={1} />
                            <br></br>
                            <Slider className="my-7" defaultValue={[40]} max={100} step={1} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing;
