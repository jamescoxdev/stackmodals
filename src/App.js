import React, { Component } from 'react';
import './App.css';
import Modals from './components/stackModals';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            stack: null,
            backgroundColor: '#fff'
        }
    }

    alertMe = () => {
        let stack = {
            id: '1',
            type: 'alert',
            text: 'You have been Alerted!'
        }
        this.setState({stack});
    }

    openSheet = () => {
        let stack = {
            id: '2',
            type: 'sheet',
            htmlText: <div style={{padding:'20px'}}><h1 style={{fontWeight:100}}>Some Terms & Conditions</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris iaculis, lectus non feugiat scelerisque, nulla lorem sodales ipsum, sit amet luctus purus urna in tortor. Aenean tincidunt quam eros, ac consequat eros porttitor gravida. Maecenas aliquet mauris vel varius congue. Vivamus aliquam, diam ut sagittis ullamcorper, odio libero ornare elit, id ullamcorper leo ex vel elit. Phasellus dictum elementum nisl. Nullam leo arcu, hendrerit id nibh eu, porta ultricies odio. Aliquam eu interdum nunc. Curabitur maximus sit amet nibh sit amet pretium. Phasellus rhoncus posuere sagittis. Suspendisse in fermentum diam. Phasellus efficitur quam non mi vehicula, vitae fermentum nisi vehicula.</p><p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed non suscipit tellus. Sed molestie nunc ut porta lacinia. Maecenas malesuada urna vitae finibus sollicitudin. Nullam ullamcorper nisl eu est pretium eleifend. Fusce pharetra lorem eget hendrerit dignissim. Cras lectus sem, vehicula vitae nisi a, aliquet ullamcorper tortor. Aenean ex ligula, consectetur eu ante at, feugiat efficitur mi. Aliquam erat volutpat. Nulla a ante id leo facilisis semper nec sed purus. Donec et mi mauris. Vivamus eget posuere quam.</p><p>Sed lobortis pretium est, in euismod est euismod a. Curabitur tempor tellus a eros varius, non dapibus ex euismod. Donec eu massa vitae magna fermentum gravida eget ornare magna. Donec vel egestas mauris. Nunc nec vestibulum erat, sed dictum felis. Sed vel odio quis lacus tincidunt pulvinar non ut elit. Proin sollicitudin dui ut tincidunt ullamcorper. Nulla velit augue, maximus at finibus vitae, tristique eget lorem. Praesent consequat egestas volutpat. In et enim ultricies, tempus tellus sed, rutrum mi. Nunc ullamcorper congue interdum. Morbi at porttitor est, id porttitor nulla. Suspendisse ac ex erat. Ut eget turpis tortor. Nulla tincidunt non nibh in faucibus. Maecenas nec sapien nunc.</p></div>    
        }
        this.setState({stack});
    }

    confirm = () => {
        let stack = {
            id: '3',
            type: 'confirm',
            htmlText: <div style={{padding:'20px'}}><h1 style={{fontWeight:100,margin:'0px'}}>Please Confirm</h1><p>Are you sure you want to confirm...?</p></div>,
            confirmBtnName: 'Do it!',
            confirmFunction: (props) => {
                alert('you did it!');
            }
        }
        this.setState({stack});
    }

    prompt = () => {
        let stack = {
            id: '4',
            type: 'prompt',
            promptOptions: [
                {
                    id: '1',
                    question: 'User Name',
                    fieldType: 'text',
                    value: ''
                },
                {
                    id: '2',
                    question: 'Password',
                    fieldType: 'password',
                    value: ''
                }
            ],
            promptBtns: [
                {
                    name: 'Cancel',
                    fn: (props) => {
                        props.closePrompt();
                    }
                },
                {
                    name: 'System Alert',
                    fn: (props) => {
                        let opts = props.promptOptions;
                        this.systemAlert(opts[0].value,opts[1].value)
                    }
                },
                {
                    name: 'Stack Alert!',
                    fn: (props) => {
                        let addToStack = props.addToStack;
                        let newAlert = {
                            id: '5',
                            type: 'alert',
                            text: 'This alert has been added to the modal stack'
                        }
                        addToStack(newAlert);
                    }
                }
            ]
        }
        this.setState({stack});
    }

    action = () => {
        let stack = {
            id: '6',
            type: 'action',
            text: 'What do you want to do?',
            actionBtns: [
                {
                    name: 'Cancel',
                    fn: (props) => {
                        props.closeAction();
                    }
                },
                {
                    name: 'Call a System Alert',
                    fn: () => {
                        alert('System Alert Called')
                    }
                },
                {
                    name: 'Call a Stack Alert!',
                    fn: (props) => {
                        let addToStack = props.addToStack;
                        let newAlert = {
                            id: '7',
                            type: 'alert',
                            text: 'This alert has been added to the modal stack'
                        }
                        addToStack(newAlert);
                    }
                }
            ]
        }
        this.setState({stack});
    }

    systemAlert = (u,p) => {
        let alerting = (u,p) => {
            alert('Username: ' + u + ', Password: ' + p);
        };
        alerting(u,p);
        let color = this.state.backgroundColor === '#fff' ? '#f00' : '#fff';
        this.setState({backgroundColor:color});
    }

    clearStack = () => {
        this.setState({stack: null});
    }

    render(){
        return (
            <div className="App" style={{backgroundColor:this.state.backgroundColor}}>
                <Modals stackObject={this.state.stack} clearStack={this.clearStack} />
                <button onClick={this.alertMe}>Alert Me</button>
                <button onClick={this.openSheet}>Open Sheet</button>
                <button onClick={this.confirm}>Confrim</button>
                <button onClick={this.prompt}>Prompt Me</button>
                <button onClick={this.action}>Require Action</button>
            </div>
        );
    }
}

export default App;