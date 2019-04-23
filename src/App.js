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
     solution: '',
    }

   this.onGameEnd = this.onGameEnd.bind(this)
   this.generateCards = this.generateCards.bind(this)
  }

  componentDidMount(){
    setInterval(() => {
      if(this.state.time > 0 && this.state.started===true) this.setState({time: this.state.time-1})
    }, 1000)
    
  }

  onGameEnd() {

  }

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
            <img onClick={()=>this.setState({solution:this.state.numbers[0]})} style={{cursor: 'pointer', width:138, height:212}} src={'./img/'+this.state.cards[0]+'.png'} />
            <img onClick={()=>this.setState({solution:this.state.numbers[1]})} style={{cursor: 'pointer', width:138, height:212}} src={'./img/'+this.state.cards[1]+'.png'} />
            <img onClick={()=>this.setState({solution:this.state.numbers[2]})} style={{cursor: 'pointer', width:138, height:212}} src={'./img/'+this.state.cards[2]+'.png'} />
            <img onClick={()=>this.setState({solution:this.state.numbers[3]})} style={{cursor: 'pointer', width:138, height:212}} src={'./img/'+this.state.cards[3]+'.png'} />
          
            <div>
              <span style={{cursor: 'pointer', margin: 10, fontSize: 54}}>+</span>
              <span style={{cursor: 'pointer', margin: 10, fontSize: 54}}>-</span>
              <span style={{cursor: 'pointer', margin: 10, fontSize: 54}}>×</span>
              <span style={{cursor: 'pointer', margin: 10, fontSize: 54}}>÷</span>
              <span style={{cursor: 'pointer', margin: 10, fontSize: 54}}>(</span>
              <span style={{cursor: 'pointer', margin: 10, fontSize: 54}}>)</span>
            </div>

            <div>
              <p>Solution:</p>
              <p>{this.state.solution}</p>
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
