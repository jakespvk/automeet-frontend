"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const Pricing = () => {
  const defaultColumnsNumber = 5;
  const maxColumns = 26;
  const defaultRowsNumber = 50;
  const maxRows = 260;
  const rowStep = 10;
  const defaultPollFrequency = false;
  const [columns, setColumns] = useState([defaultColumnsNumber]);
  const [rows, setRows] = useState([defaultRowsNumber]);
  const [pollFrequency, setPollFrequency] = useState(defaultPollFrequency);
  const PRICE = calculatePrice(columns[0], rows[0], pollFrequency);

  function calculatePrice(columns: number, rows: number, pollFrequency: boolean) {
    if ((pollFrequency === defaultPollFrequency) && columns <= 5 && rows <= 50) {
      return "Free";
    }
    else if (columns === maxColumns || rows === maxRows) {
      return "Enterprise";
    } else {
      const factor = Math.pow(10, 2);
      let price = ((columns - defaultColumnsNumber) * 0.5) + ((rows - defaultRowsNumber) / rowStep * 0.25);
      if ((pollFrequency !== defaultPollFrequency)) {
        price += 7.99;
      }
      return "$" + (Math.round(price * factor) / factor) + "/month";
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
    setPollFrequency(false);
  }

  return (
    <div>
      <div className="max-w-fit h-24 [@media(min-height:950px)]:hidden"></div>
      <div className="pb-10 [@media(min-height:950px)]:pb-0 [@media(min-height:950px)]:h-dvh flex justify-center items-center">
        <div className="md:glass-card mx-8">
          <div className="md:glass-card-contents">
            <h2 className="md:text-center text-xl mb-3 text-pretty md:mx-auto">Scaled to your use case, only pay for what you use</h2>
            <div className="md:w-96 md:mx-auto w-56 min-w-fit text-pretty">
              <br></br>
              <label>Number of columns holding descriptive data</label>
              <Slider className="my-4" value={columns} onValueChange={setColumns} defaultValue={columns} max={maxColumns} step={1} />
              {(columns[0] === 26) ? <p>Enterprise</p> : <p>{columns[0]}</p>}
              <br></br>
              <label>Number of rows you'd like analyzed</label>
              <Slider className="my-4" value={rows} onValueChange={setRows} defaultValue={rows} max={maxRows} step={rowStep} />
              {(rows[0] === 260) ? <p>Enterprise</p> : <p>{rows[0]}</p>}
              <br></br>
              <label>Frequency of polling</label>
              <div className="flex items-center justify-center space-x-2 my-4">
                <Label htmlFor="airplane-mode">Weekly</Label>
                <Switch checked={pollFrequency} onCheckedChange={setPollFrequency} id="airplane-mode" />
                <Label htmlFor="airplane-mode">Daily</Label>
              </div>
              {/* <Slider className="my-4" value={pollFrequency} onValueChange={setPollFrequency} defaultValue={pollFrequency} max={2} step={1} /> */}
              {/* {(pollFrequency[0] === 3) ? <p>Enterprise</p> : <p>{translatePollFrequency(pollFrequency[0])}</p>} */}
              <div className="flex mt-7">
                <strong>Your price:&nbsp;</strong>
                {calculatePrice(columns[0], rows[0], pollFrequency)}
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
