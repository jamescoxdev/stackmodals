import React from 'react';

export default function Sheet(props){
    return(
        <div className={props.className} style={props.show}>
            <div style={{padding:'20px'}}>
                {props.text}
            </div>
            <section className="btns">
                <button onClick={props.closeSheet}>Ok</button>
                <div className="clear"></div>
            </section>
        </div>
    )
}
