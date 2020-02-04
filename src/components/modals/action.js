import React from 'react';

export default function Action(props){
    let buttons = props.actionBtns.map((o,i) => {
        return <button key={i} onClick={() => {
            o.fn(props)
        }}>{o.name}</button>
    });
    return(
        <div className={props.className} style={props.show}>
            <p style={{padding:'20px'}}>{props.text}</p>
            <section className="btns">
                {buttons}
                <div style={{clear:'both'}}></div>
            </section>
        </div>
    )
}