function Dropdown({ x, y, names, handleSelectResult }) {
    const handleSelect = async (event) => {
        const name = event.target.value;
        const response = await fetch("http://localhost:3000/check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ x, y, name })
        });
        const data = await response.json();
        const isValid = data.valid;

        handleSelectResult({ x, y, isValid, name });
        event.target.value = "";
    }

    return (
        <div id="dropdownContainer" style={{
            position: 'absolute',
            left: `${x}px`, 
            top: `${y}px`,
        }}>
            <select id="dropdown" name="dropdown" defaultValue="" onChange={handleSelect}>
                <option value="" disabled hidden>Select a character</option>
                {names.map((name) => (
                    <option key={name} value={name}>{name}</option>
                ))}
            </select>
        </div>
    )
}

export default Dropdown;
