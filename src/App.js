import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import io from "socket.io-client"
import * as btnAction from "./actions/btnAction"

class App extends Component {
  constructor (props) {
    super(props)
    this.socket = io.connect("http://127.0.0.1:3000")
  }
  componentWillMount () {
    this.socket.on("msg", (sT) => {
      this.props.btnAction.btnPushAction(sT)})
}
    render() {
      const bS = !this.props.btnS
      return <div>
               <button onClick= {() => {
                this.socket.emit("msg", bS)
                this.props.btnAction.btnPushAction(bS)
              }}
              >
               {this.props.btnS ? "Pushed" : "Released"}</button>
             </div>
  }
}

function mapStateToProps(state) {
  return {
    ...state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    btnAction: bindActionCreators(btnAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)