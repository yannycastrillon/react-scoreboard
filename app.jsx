var PLAYERS = [
  {
    name: "Yanny Castrillon",
    score: 35,
    id:1
  },
  {
    name: "Alejandra Castrillon",
    score: 30,
    id:2
  },
  {
    name: "Julian Castrillon",
    score: 42,
    id:3
  },
  {
    name: "Luis Castrillon",
    score: 28,
    id:4
  },
];

const Stopwatch = React.createClass({

  getInitialState: function() {
    return {
      running: false,
      elapseTime: 0,
      previousTime: 0,
    }
  },

  /*
   * It will be call as soon as the component is mount on the page.
   * It is useful when DATA Fetching or Timers.
  */
  componentDidMount: function () {
    this.interval = setInterval(this.onTick,100);
  },

  componentWillUnmount: function () {
    clearInterval(this.interval);
  },

  onTick: function () {
    if (this.state.running) {
      let now = Date.now()
      this.setState({
        previousTime: now,
        // To calculate elapseTime
        elapseTime: this.state.elapseTime + (now - this.state.previousTime),
      })
    }
  },

  onStart: function() {
    this.setState({
      running: true,
      previousTime: Date.now(),
    });
  },

  onStop: function(){
    this.setState({running: false});
  },


  onReset: function() {
    this.setState({
      elapseTime: 0,
      previousTime: Date.now(),
    })
  },

  render: function() {
    let seconds = Math.floor(this.state.elapseTime / 1000);
    return(
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">{seconds}</div>
        { this.state.running ? <button onClick={this.onStop}>Stop</button> : <button onClick={this.onStart}>Start</button> }
        <button onClick={this.onReset}>Reset</button>
      </div>
    )
  }
})


// Component in charge of adding a new component.
const AddPlayerForm = React.createClass({
  getInitialState:function() {
    return{
      name: "",
    }
  },

  // When inputfield changes the name
  onNameChange: function(e) {
    console.log('onNameChange',e.target.value);
    // sets and re-renders the variable name setState.
    this.setState({name:e.target.value});
  },

  onSubmit: function(e) {
    e.preventDefault();
    // When submiting the form, must pass the state "name"
    this.props.onAdd(this.state.name);
    // Clear out the variable "name".
    this.setState({name:""})
  },

  // "value" of the inputfield must be seen as the state.
  render: function() {
    return(
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.name} onChange={this.onNameChange}></input>
          <input type="submit" value="Add Player" onSubmit={this.onSubmit}></input>
        </form>
      </div>
    )
  }
});

// Define type of properies the component Header.
Header.propTypes = {
  title: React.PropTypes.string.isRequired, // title must be a string. Must be required
  players: React.PropTypes.array.isRequired
};
function Header(props){
  return(
    <div className="header">
      <Stats players={props.players}/>
      <h1>{props.title}</h1>
      <Stopwatch>0</Stopwatch>
    </div>
  );
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
};
function Counter (props){
  return(
    <div className="counter">
      <button className="counter-action decrement" onClick={function(){props.onChange(-1);}}> - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment" onClick={function(){props.onChange(+1);}}> + </button>
    </div>
  );
}

// Define properties of component Player.
Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
}
function Player(props){
  return(
    <div className="player">
      <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>x</a>
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} onChange={props.onScoreChange}/>
      </div>
    </div>
  );
}


Stats.propTypes = {
  players: React.PropTypes.array.isRequired,
}
function Stats(props) {
  let totalPlayers = props.players.length
  let totalPoints = props.players.reduce(function(total, player) {
    return total + player.score
  }, 0)
  return(
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )
}

// Define type of properies the component Applicaton.
/*
* Application takes a title, which is a string and no required.
* Application also takes a Players property which is an array of objects with shape of:
* name: Which is a string and required. score: Which is a number and required.
*/
const Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    // shape describe the attributes of the object.
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name:  React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id:    React.PropTypes.number.isRequired,
    })).isRequired,
  },

  getDefaultProps: function(){
    // Define all default values properties of the application component.
    return {
      title: "My Scoreboard",
      score: 0
    };
  },

  getInitialState: function(){
    return {
      players: this.props.initialPlayers,
    };
  },

  onScoreChange: function(index,delta){
    console.log('onScoreChange ',index,delta)
    this.state.players[index].score += delta
    this.setState(this.state)
  },

  onPlayerAdd: function(name) {
      console.log('Player added', name);
      this.state.players.push({
        name: name,
        score:0,
        id: this.state.players[this.state.players.length-1].id + 1
      });
      this.setState(this.state)
  },

  onRemovePlayer: function(index) {
    // Removes element from an array
    this.state.players.splice(index, 1);
    this.setState(this.state);
  },

  render: function(){
    return(
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players}/>
        <div className="players">
          {this.state.players.map(function(player,index){
            return (
              <Player
                onRemove={function(){this.onRemovePlayer(index)}.bind(this)}
                onScoreChange={function(delta){this.onScoreChange(index,delta)}.bind(this)}
                key={player.id}
                name={player.name}
                score={player.score}/>
            );
          }.bind(this))}
        </div>
        <AddPlayerForm onAdd={this.onPlayerAdd}/>
      </div>
    );
  }
})

ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));
