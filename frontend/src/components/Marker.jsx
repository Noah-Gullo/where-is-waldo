function Marker({x, y, isValid}){
    return(
        <div
            style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: `3px solid ${isValid ? 'green' : 'red'}`,
                backgroundColor: isValid ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)',
            }}
            />
    )
}

export default Marker;