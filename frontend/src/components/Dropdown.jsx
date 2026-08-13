function Dropdown({x, y, names}){
    return (
        <>
            <div id="dropdown" style={{
                position: 'absolute',
                left: `${x}px`, 
                top: `${y}px`,
            }}>
                <select>
                    <option value="" selected disabled>Select a character</option>
                    {names.map((name) => (
                        <option value={name}>{name}</option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default Dropdown