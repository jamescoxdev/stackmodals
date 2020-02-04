import React from 'react';

export default function Sheet(props){
    return(
        <div className={props.className} style={props.show}>
            {props.text}
            <section className="btns">
                <button onClick={props.closeSheet}>Ok</button>
                <div className="clear"></div>
            </section>
        </div>
    )
}