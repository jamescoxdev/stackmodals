import React from 'react';

export default function Confirm(props){
    return(
        <div className={props.className} style={props.show}>
            {props.text}
            <section className="btns">
                <button onClick={props.closeConfirm}>Cancel</button>
                <button onClick={() => { props.confirmFunction(); props.closeConfirm() }}>{props.confirmBtnName}</button>
                <div className="clear"></div>
            </section>
        </div>
    )
}