import React from 'react';

export default function Alert(props){
    return(
        <div className={props.className} style={props.show}>
            <p style={{padding:'20px'}}>{props.text}</p>
            <section className="btns">
                <button onClick={props.closeAlert}>Ok</button>
                <div style={{clear:'both'}}></div>
            </section>
        </div>
    )
}