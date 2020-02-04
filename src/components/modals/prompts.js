import React from 'react';

export default function Prompts(props){
    let questions = props.promptOptions.map((v,i) => {
        return <div key={i}><label htmlFor={v.question} className="question">{v.question}</label><input name={v.question} type={v.fieldType} value={v.value} onChange={(e) => {
            props.updateValue(e,v.id);
        }} className="txtInputSmall" /></div>
    });
    let buttons = props.promptBtns.map((o,i) => {
        return <button key={i} onClick={() => {
            o.fn(props)
        }}>{o.name}</button>
    });
    return(
        <div className={props.className} style={props.show}>
            <div style={{padding:'20px 20px 0px'}}>
                {questions}
            </div>
            <section className="btns">
                {buttons}
                <div className="clear"></div>
            </section>
        </div>
    )
}