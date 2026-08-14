import { useState } from "react"
function Dropdown({x, y, names}){
    const [availableNames, setAvailableNames] = useState(names);

    const handleSelect = async(event) => {
        const name = event.target.value;
        const response = await fetch("http://localhost:3000/check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({x, y, name })
        });
        const data = await response.json();
        const isValid = data.valid;
        console.log(isValid + ". " + name + " at " + "(" + x + ", " + y + ")");
        if(isValid){
            setAvailableNames((prev) => prev.filter((n) => n!==name));
        }
    }

    return (
        <>
            <div id="dropdownContainer" style={{
                position: 'absolute',
                left: `${x}px`, 
                top: `${y}px`,
            }}>
                <select id="dropdown" name="dropdown" value="" onChange={handleSelect}>
                    <option value="" disabled hidden>Select a character</option>
                    {availableNames.map((name) => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default Dropdown