import React, { Component } from 'react';
import './App.css';
import Counter from './components/Counter'
import counter from './reducers'
import { createStore } from 'redux'

const store = createStore(counter)

class App extends Component {
    constructor() {
        super()
        this.state = {
            state: 0
        }
        // 类绑定事件函数的方法一
        this.changeState = this.changeState.bind(this);
    }

    changeState(value) {
        this.setState({
            state: value
        })
    }

    render() {
        store.subscribe(() => {
            this.changeState(store.getState())
        })
        return (
            <div className="App">
                <Counter
                    value={this.state.state}
                    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
                    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
                />
            </div>
        )
    }
}

export default App;
