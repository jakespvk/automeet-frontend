"use client";

import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import BgImg from "@/public/background-image.jpg";
const Pricing = (props: {}) => {
    const [columns, setColumns] = useState(5);
    const [rows, setRows] = useState(50);


    return (
        <div>
            <div className="w-full h-svh flex justify-center items-center">
                <div className="w-full h-svh flex justify-center items-center">
                    <div className="glass-card">
                        <div className="mx-7 my-7">
                            <h2 className="text-center text-xl">Scaled to your use case,</h2>
                            <h2 className="text-center text-xl">only pay for what you use</h2>
                            <br></br>
                            <Slider defaultValue={[40]} variant="outline" />
                            <br></br>
                            <Slider defaultValue={[40]} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Pricing;
