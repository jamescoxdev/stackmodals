# Stack Modals

This is a react component designed to faciliate multiple modal options and stack them in a queue should multiple modals be called.

Eg: If you call a prompt modal with one of the action buttons calling an alert modal, the Alert will be placed on the top of the queue and shown in the UI, when the Alert modal is closed it is removed from the stack and the previous prompt modal is returned to the view.

---

# Usage

```javascript
import React, { Component } from 'react';
import Modals from './components/stackModals';

class MyApp extends Component{
    constructor(props){
        super(props);
        this.state = {
            stack: null
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
    
    clearStack = () => {
        this.setState({stack: null});
    }

    render(){
        return (
            <div>
                <Modals stackObject={this.state.stack} clearStack={this.clearStack} />
                <button onClick={this.alertMe}>Alert Me</button>
            </div>
        );
    }
}

export default MyApp;
```

---

# Modal Stack Props

|Property       |Type         |Description                                                                          |
|---------------|-------------|-------------------------------------------------------------------------------------|
|stackObject    |Object       |Required. The modal object to pass to the component                                  |
|clearStack     |Function     |Optional. Function for the component to call to clear any stack objects from parent  |

<br />

# Modal Types

### Alert

The Alert is the simplest modal to setup. Here is an example object and description:

```javascript
{
  id: '1',
  type: 'alert',
  text: 'Some text to alert'
}
```

|Property     |Type       |Description                                                |
|-------------|-----------|-----------------------------------------------------------|
|id           |string     |Required. A unique ID to be identified in the modal stack. |
|type         |string     |Required. Must be set to alert                             |
|text         |string     |Required. Any string you want to display in the alert      |
<br />

### Confirm

Here is an example object and description:

```javascript
{
    id: '1',
    type: 'confirm',
    htmlText: <div><h1 style={{fontWeight:100,margin:'0px'}}>Please Confirm</h1><p>Are you sure you want to confirm...?</p></div>,
    confirmBtnName: 'Do it!',
    confirmFunction: () => {
        alert('you did it!');
    }
}
```

|Property         |Type         |Description                                                            |
|-----------------|-------------|-----------------------------------------------------------------------|
|id               |string       |Required. A unique ID to be identified in the modal stack.             |
|type             |string       |Required. Must be set to confirm                                       |
|htmlText         |Text or JSX  |Required. Can be any Text or valid JSX you wish to present             |
|confirmFunction  |function     |Required. The function you wish to execute if confirm button clicked   |
|confirmBtnName   |string       |Optional. Any name you wish to label the confirm button. default is Ok |
<br />

### Prompt

Here is an example object and description:

```javascript
{
  id: '1',
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
              alert('Username: ' + opts[0].value + ', Password: ' + opts[1].value);
          }
      }
  ]
}
```

|Property         |Type         |Description                                                            |
|-----------------|-------------|-----------------------------------------------------------------------|
|id               |string       |Required. A unique ID to be identified in the modal stack.             |
|type             |string       |Required. Must be set to prompt                                        |
|promptOptions    |Array        |Required. An Array of questions and fields for prompting               |
|promptBtns       |Array        |Required. An Array of buttons for actioning the prompt                 |

#### promptOptions

Prompt Options object:

|Property         |Type         |Description                                    |
|-----------------|-------------|-----------------------------------------------|
|id               |string       |Required. A unique ID to identified the field  |
|question         |string       |Required. The question being asked             |
|fieldType        |string       |Optional. The input field type. Default text   |
|value            |string       |Optional. The value of the field. Default ''   |

#### promptBtns

Prompt Buttons object:

|Property         |Type         |Description                                      |
|-----------------|-------------|-------------------------------------------------|
|name             |string       |Required. The text name displayed on the button  |
|fn               |function     |Required. The function called on button press. Note: you may pass in props which will give you access to promptOptions which will allow you to access the field values in the prompt inputs.<br /><br />Eg: props.promptOptions[0].value<br /><br />Note: You must use props.closePrompt() to clear the prompt from the stack |
<br />

### Sheet

Here is an example object and description:

```javascript
{
    id: '1',
    type: 'sheet',
    htmlText: <div><h1 style={{fontWeight:100}}>Some Terms & Conditions</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris iaculis, lectus non feugiat scelerisque, nulla lorem sodales ipsum, sit amet luctus purus urna in tortor. Aenean tincidunt quam eros, ac consequat eros porttitor gravida. Maecenas aliquet mauris vel varius congue. Vivamus aliquam, diam ut sagittis ullamcorper, odio libero ornare elit, id ullamcorper leo ex vel elit. Phasellus dictum elementum nisl. Nullam leo arcu, hendrerit id nibh eu, porta ultricies odio. Aliquam eu interdum nunc. Curabitur maximus sit amet nibh sit amet pretium. Phasellus rhoncus posuere sagittis. Suspendisse in fermentum diam. Phasellus efficitur quam non mi vehicula, vitae fermentum nisi vehicula.</p></div>    
}
```

|Property         |Type         |Description                                                            |
|-----------------|-------------|-----------------------------------------------------------------------|
|id               |string       |Required. A unique ID to be identified in the modal stack.             |
|type             |string       |Required. Must be set to sheet                                         |
|htmlText         |Text or JSX  |Required. Can be any Text or valid JSX you wish to present             |
<br />

### Action

An action allows you to ask a single question and give multiple buttons for various responses. Here is an example object and description:

```javascript
{
  id: '1',
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
          name: 'Call an Alert',
          fn: () => {
              alert('Alert Called')
          }
      }
  ]
}
```

|Property         |Type         |Description                                                  |
|-----------------|-------------|-------------------------------------------------------------|
|id               |string       |Required. A unique ID to be identified in the modal stack.   |
|type             |string       |Required. Must be set to action                              |
|text             |string       |Required. Any string you want to display in the alert        |
|actionBtns       |array        |Required. An Array of buttons for actioning                  |

#### actionBtns

Action Buttons object:

|Property         |Type         |Description                                      |
|-----------------|-------------|-------------------------------------------------|
|name             |string       |Required. The text name displayed on the button  |
|fn               |function     |Required. The function called on button press. <br /><br />Note: You must pass in props and use props.closeAction() to clear the action from the stack |
<br />
