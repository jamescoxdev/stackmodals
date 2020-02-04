import React, { Component } from 'react';
import Alerts from './modals/alerts';
import Confirm from './modals/confirm';
import Prompt from './modals/prompts';
import Sheet from './modals/sheet';
import Action from './modals/action';
import styles from './stackmodals.module.scss';

class StackModals extends Component{
    constructor(props){
        super(props);
        this.state = {
            stack: [],
            text: '',
            htmlText: '',
            confirmBtnName: 'Ok',
            confirmFunction: null,
            promptOptions: [],
            promptBtns: [],
            actionBtns: []
        }
    }

    static getDerivedStateFromProps(props, state){
        let stack = [...state.stack];
        let obj = props.stackObject;
        if(obj !== null){
            let types = [
                'alert',
                'confirm',
                'prompt',
                'sheet',
                'action'
            ];
            if(types.indexOf(obj.type) > -1 && stack.filter(items => (items.id === obj.id)) < 1){
                stack.push(obj);
                return {
                    stack,
                    text: obj.text || '',
                    htmlText: obj.htmlText || '',
                    confirmBtnName: obj.confirmBtnName || 'Ok',
                    confirmFunction: obj.confirmFunction || null,
                    promptOptions: obj.promptOptions || [],
                    promptBtns: obj.promptBtns || [],
                    actionBtns: obj.actionBtns || []
                };
            } else {
                return state;
            }
        } else {
            return state;
        }
    }

    close = () => {
        let newStack = [...this.state.stack];
        newStack.splice(-1,1);
        let newObj = newStack.length > 0 ? newStack[newStack.length - 1] :
        {
            text: '',
            htmlText: '',
            confirmBtnName: 'Ok',
            confirmFunction: null,
            promptOptions: [],
            promptBtns: [],
            actionBtns: []
        };
        this.setState({
            text: newObj.text || '',
            htmlText: newObj.htmlText || '',
            confirmBtnName: newObj.confirmBtnName || 'Ok',
            confirmFunction: newObj.confirmFunction || null,
            promptOptions: newObj.promptOptions || [],
            promptBtns: newObj.promptBtns || [],
            actionBtns: newObj.actionBtns || [],
            stack: newStack
        });
        if(newStack.length === 0){
            this.props.clearStack();
        }
    }

    updateVal = (e,id) => {
        let cloneState = {...this.state};
        let opts = cloneState.promptOptions;
        for(let i=0;i<opts.length;i++){
            if(opts[i].id === id){
                opts[i].value = e.target.value;
            }
        }
        this.setState({promptOptions:opts});
    }

    showModal = (type) => {
        if(this.state.stack.length){
            let current = this.state.stack[this.state.stack.length - 1];
            if(type === current.type){
                return {display:'block'};
            } else {
                return {display:'none'};
            }
        } else {
            return {display:'none'};
        }
    }

    addToStack = (item) => {
        let stack = [...this.state.stack];
        stack.push(item);
        this.setState({
            text: item.text || '',
            htmlText: item.htmlText || '',
            confirmBtnName: item.confirmBtnName || 'Ok',
            confirmFunction: item.confirmFunction || null,
            promptOptions: item.promptOptions || [],
            promptBtns: item.promptBtns || [],
            actionBtns: item.actionBtns || [],
            stack: stack
        });
    }

    render(){
        return(
            <div className={styles.modalContainer} style={this.state.stack.length ? {display:'block'} : {display:'none'}}>
                <Alerts className={styles.alert} text={this.state.text} closeAlert={this.close} show={this.showModal('alert')} />
                <Confirm className={styles.alert} text={this.state.htmlText} closeConfirm={this.close} confirmBtnName={this.state.confirmBtnName} confirmFunction={this.state.confirmFunction} show={this.showModal('confirm')} addToStack={(item) => { this.addToStack(item); }} />
                <Prompt className={styles.prompt} promptOptions={this.state.promptOptions} closePrompt={this.close} updateValue={(e,i) => { this.updateVal(e,i); }} promptBtns={this.state.promptBtns} show={this.showModal('prompt')} addToStack={(item) => { this.addToStack(item); }} />
                <Sheet className={styles.sheet} text={this.state.htmlText} closeSheet={this.close} show={this.showModal('sheet')} />
                <Action className={styles.alert} text={this.state.text} closeAction={this.close} actionBtns={this.state.actionBtns} show={this.showModal('action')} addToStack={(item) => { this.addToStack(item); }} />
            </div>
        )
    }
}

export default StackModals;