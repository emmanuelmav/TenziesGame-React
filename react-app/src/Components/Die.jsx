


const Die = (props) => {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#ffffff"
    };




    return (
        <div className="die-face" style={styles} onClick={() => props.handleClick(props.id)}>
            <h2 className="die-num">{props.value}</h2>
        </div >
    )
}




export default Die