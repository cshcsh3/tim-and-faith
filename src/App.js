import React from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { generatePuzzle } from './GeneratePuzzle'
import { message } from './Secret'


const Welcome = (props) => (
  <div className="Welcome">
    <h1>Hi <span className="groom">Tim</span>! 🤖</h1>
    <p>The objective of the game is to obtain the key to <span className="bride">Faith</span>'s room</p>
    <p>Here are the instructions:</p>
    <p>1. Answer 3 questions</p>
    <p>2. The correct answers will unlock clues for the puzzle</p>
    <p>3. Solve the puzzle, it'll tell you the key's location</p>
    <p>Failure to solve the puzzle: You will face the <span className="bride">bride</span>'s penalty!</p>
    <Button onClick={props.onReady}>I'm Ready</Button>
  </div>
)

const Quiz1 = (props) => (
  <div className="Quiz">
    <h1 className="main">Question 1</h1>
    <p>Where do we both work?</p>
    <div className="Quiz-input">
      <input type="text" maxLength="10" value={props.field} onChange={(e) => props.onFieldChange(e)} onKeyPress={(e) => props.onEnter(e)} autoFocus/>
    </div>
    <Button onClick={props.onSubmit}>Submit</Button>
  </div>
)

const Quiz2 = (props) => (
  <div className="Quiz">
    <h1 className="main">Question 2</h1>
    <p>Who confessed first?</p>
    <Form>
      {['radio'].map(type => (
      <div key={`quiz2-${type}`} className="mb-3">
        <Form.Check inline label="Tim" className="Quiz-radio" type={type} id={`quiz2-${type}-1`} name={`quiz2-${type}`} value="tim" 
            onChange={(e) => props.onRadioChange1(e)}
            checked={props.selectedRadio1 === "tim"}/>

        <Form.Check inline label="Faith" className="Quiz-radio" type={type} id={`quiz2-${type}-2`} name={`quiz2-${type}`} value="faith" 
            onChange={(e) => props.onRadioChange1(e)}
            checked={props.selectedRadio1 === "faith"}/>
      </div>
      ))}
    </Form>
    <Button onClick={props.onSubmit} autoFocus>Submit</Button>
  </div>
)

const Quiz3 = (props) => (
  <div className="Quiz">
    <h1 className="main">Question 3</h1>
    <p>Who always give in during a fight?</p>
    <Form>
      {['radio'].map(type => (
      <div key={`quiz3-${type}`} className="mb-3">
        <Form.Check inline label="Tim" className="Quiz-radio" type={type} id={`quiz3-${type}-1`} name={`quiz3-${type}`} value="tim"
            onChange={(e) => props.onRadioChange2(e)}
            checked={props.selectedRadio2 === "tim"}/>

        <Form.Check inline label="Faith" className="Quiz-radio" type={type} id={`quiz3-${type}-2`} name={`quiz3-${type}`} value="faith"
            onChange={(e) => props.onRadioChange2(e)}
            checked={props.selectedRadio2 === "faith"}/>
      </div>
      ))}
    </Form>
    <Button onClick={props.onSubmit} autoFocus>Submit</Button>
  </div>
)

const Puzzle = (props) => (
<div className="Puzzle">
  <small className="sub">You got {(props.clues.length === 3) ? 'all' : (props.clues.length === 2) ? '2' : (props.clues.length === 1) ? '1' : 'none' } correct</small>
  <h1>Now solve the puzzle</h1>
  <small className="sub">If you are stuck, you can choose to do forfeits to unlock letters</small>
  <div className="Puzzle-message">
    {generatePuzzle(props.clues).map((item, index) => (
      (item.tag === 0) ? <br/>
      : (!item.first)
        ? <input type="text" key={index} className={(props.message[index] === item.name) ? "reveal" : "default"} maxLength="1" placeholder={item.tag} onChange={(e) => props.onInputChange(index, e)} value={props.message[index]}/>
        : <input type="text" key={index} className={(props.message[index] === item.name) ? "reveal" : "first"} maxLength="1" placeholder={item.tag} onChange={(e) => props.onInputChange(index, e)} value={props.message[index]} />
    ))}
  </div>
</div>
)

class App extends React.Component {
  constructor(props) {
    super(props)

    const size = message.replace(/\s/g, "").length
    /*
    stage 0 - welcome and instructions
    stage 1 - quiz 1: input text field
    stage 2 - quiz 2: option tim or faith
    stage 3 - quiz 3: option tim or faith
    stage 4 - puzzle time
    */
    this.state = {
      stage: 0,
      field: "",
      selectedRadio1: "tim",
      selectedRadio2: "tim",
      clues: [],
      message: new Array(size)
    }
  }

  onReady = () => {
    this.setState({stage: 1})
  }

  onFieldChange (e) {
    this.setState({field: e.target.value})
  }

  onRadioChange1 (e) {
    this.setState({selectedRadio1: e.target.value})
  }

  onRadioChange2 (e) {
    this.setState({selectedRadio2: e.target.value})
  }

  onEnter (e) {
    if (e.key === 'Enter') {
      this.onSubmit()
    }
  }

  onSubmit = () => {
    const stage = this.state.stage
    const field = this.state.field.toLowerCase()
    const selectedRadio1 = this.state.selectedRadio1
    const selectedRadio2 = this.state.selectedRadio2

    if (stage === 1) {
      const accept = [
        "sap",
        "sap southeast asia",
        "sap sea",
        "sap sg",
        "sap singapore"
      ]

      if (accept.includes(field)) {
        this.setState({
          clues: [...this.state.clues, '1']
        })
      }

      this.setState({
        stage: 2
      })
    }

    if (stage === 2) {
      if (selectedRadio1 === "tim") {
        this.setState({
          clues: [...this.state.clues, '2']
        })
      }

      this.setState({stage: 3})
    }

    if (stage === 3) {
      if (selectedRadio2 === "faith") {
        this.setState({
          clues: [...this.state.clues, '3']
        }, () => {
          this.loadPuzzle()
          return
        })
      }
      this.loadPuzzle()
    }
  }

  loadPuzzle() {
    const current = [...this.state.message]
    generatePuzzle(this.state.clues).map((item, index) => {
      if (item.reveal) {
        current[index] = item.name
      }
    })
    this.setState({
      message: current
    }, () => {
      this.setState({stage: 4})
    })
  }

  onInputChange(index, e) {
    const current = [...this.state.message]
    current[index] = e.target.value

    this.setState({
      message: current
    })
  }

  render() {
    const stage = this.state.stage

    if (stage === 1) {
      return(
        <div className="App">
          <Quiz1 field={this.state.field} onFieldChange={this.onFieldChange.bind(this)} onEnter={this.onEnter.bind(this)} onSubmit={this.onSubmit}/>
        </div>
      )
    }

    if (stage === 2) {
      return(
        <div className="App">
          <Quiz2 onRadioChange1={this.onRadioChange1.bind(this)} selectedRadio1={this.state.selectedRadio1} onSubmit={this.onSubmit}/>
        </div>
      )
    }

    if (stage === 3) {
      return(
        <div className="App">
          <Quiz3 onRadioChange2={this.onRadioChange2.bind(this)} selectedRadio2={this.state.selectedRadio2} onSubmit={this.onSubmit} />
        </div>
      )
    }

    if (stage === 4) {
      return(
        <div className="App">
          <Puzzle clues={this.state.clues} onInputChange={this.onInputChange.bind(this)} message={this.state.message}  />
        </div>
      )
    }

    // default, stage 0
    return(
      <div className="App">
        <Welcome onReady={this.onReady} />
      </div>
    )
  }
}

export default App
