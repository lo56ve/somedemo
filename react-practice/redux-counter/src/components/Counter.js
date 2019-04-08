import React, { Component } from 'react'
import Proptypes from 'prop-types'

class Counter extends Component {
    constructor(props) {
        super(props)
    }

    // 类绑定事件函数的方法二
    onIncrementOdd() {
        if (this.props.value %2 !== 0) {
            this.props.onIncrement()
        }
    }

    // 类绑定事件函数的方法三
    onIncrementasy = () => {
        setTimeout(() => {
            this.props.onIncrement()
        }, 1000)
    }

    render() {
        return (
            <div>
                <div>点击了：{this.props.value}次</div>
                <button onClick={this.props.onIncrement}>+</button>
                <button onClick={this.props.onDecrement}>-</button>
                <button onClick={() => {this.onIncrementOdd()}}>奇数加一</button>
                <button onClick={this.onIncrementasy}>延时加一</button>
            </div>
        )
    }
}

Counter.Proptypes = {
    value: Proptypes.number.isRequired
}

export default Counter