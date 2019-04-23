import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)

   this.state = { 
     time: 60,
     started: false,
     numbers: [],
     cards: [],
     solution: [],
     cardsAdded: []
    }

   this.onGameEnd = this.onGameEnd.bind(this)
   this.generateCards = this.generateCards.bind(this)
   this.addToSolution = this.addToSolution.bind(this)
   this.checkResult = this.checkResult.bind(this)
  }

  componentDidMount(){
    setInterval(() => {
      if(this.state.time > 0 && this.state.started===true) this.setState({time: this.state.time-1})
    }, 1000)
    
  }

  onGameEnd() {

  }

  //avoid generating two same cards
  generateCards() {
    let cards = []
    let numbers = []
    let sign = ['C', 'D', 'H', 'S']
    for (let i=0; i<4; i++) {
      let ranNumber = Math.floor(Math.random()*13)+1
      let ranSign = Math.floor(Math.random()*4)
      numbers.push(ranNumber)
      cards.push(String(ranNumber)+sign[ranSign])
    }

    this.setState({cards, numbers})
 
    console.log(cards)
  }

  addToSolution(number) {
    if(!this.state.cardsAdded.includes(this.state.cards[number])){
      let solution = this.state.solution
      let cardsAdded = this.state.cardsAdded
      solution.push(String(this.state.numbers[number]))
      cardsAdded.push(this.state.cards[number])

      console.log(solution)
      this.setState({solution})
    }
    
  }

  checkResult() {
    try {
      alert(eval("("+this.state.solution.join('')+")"))
    } catch (e) {
      if (e instanceof SyntaxError) {
        alert("Invalid Equation!");
      }
    }
  }

  render() {

    if(this.state.time === 0){
      this.onGameEnd()      
    }

    return (
      <div className="App">
        <div className="App-header">
        {this.state.started ?
          <div>
            <p>Time left: {this.state.time}</p>
            <img onClick={() => this.addToSolution(0)} style={{cursor: 'pointer', width:138, height:212}} src={'./img/'+this.state.cards[0]+'.png'} />
            <img onClick={() => this.addToSolution(1)} style={{cursor: 'pointer', width:138, height:212}} src={'./img/'+this.state.cards[1]+'.png'} />
            <img onClick={() => this.addToSolution(2)} style={{cursor: 'pointer', width:138, height:212}} src={'./img/'+this.state.cards[2]+'.png'} />
            <img onClick={() => this.addToSolution(3)} style={{cursor: 'pointer', width:138, height:212}} src={'./img/'+this.state.cards[3]+'.png'} />
          
            <div>
              <span onClick={() => { let solution = this.state.solution; solution.push('+'); this.setState({solution});}} style={{cursor: 'pointer', margin: 10, fontSize: 54}}>+</span>
              <span onClick={() => { let solution = this.state.solution; solution.push('-'); this.setState({solution});}} style={{cursor: 'pointer', margin: 10, fontSize: 54}}>-</span>
              <span onClick={() => { let solution = this.state.solution; solution.push('*'); this.setState({solution});}} style={{cursor: 'pointer', margin: 10, fontSize: 54}}>×</span>
              <span onClick={() => { let solution = this.state.solution; solution.push('/'); this.setState({solution});}} style={{cursor: 'pointer', margin: 10, fontSize: 54}}>÷</span>
              <span onClick={() => { let solution = this.state.solution; solution.push('('); this.setState({solution});}} style={{cursor: 'pointer', margin: 10, fontSize: 54}}>(</span>
              <span onClick={() => { let solution = this.state.solution; solution.push(')'); this.setState({solution});}} style={{cursor: 'pointer', margin: 10, fontSize: 54}}>)</span>
              <span onClick={() => { let cardsAdded = this.state.cardsAdded; if (this.state.solution[this.state.solution.length-1].match(/\d/)) cardsAdded.pop(); this.setState({cardsAdded}); let solution = this.state.solution; solution.pop(); this.setState({solution});}} style={{cursor: 'pointer', margin: 10, fontSize: 54}}>Del</span>
            </div>

            <div>
              <p>Solution:</p>
              <p>{this.state.solution.join(' ')}</p>
            </div>

            <div>
              <button onClick={this.checkResult}>Check</button>
            </div>
          </div>
          :
          <div>
            <button onClick={() => {this.setState({started: true}); this.generateCards()}}>Play</button>
          </div>
        }
        </div>
      </div>
    );
  }
}

export default App;
