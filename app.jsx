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

// Define type of properies the component Applicaton.
/*
* Application takes a title, which is a string and no required.
* Application also takes a Players property which is an array of objects with shape of:
* name: Which is a string and required. score: Which is a number and required.
*/
Application.propTypes = {
  title: React.PropTypes.string,
  // shape describe the attributes of the object property.
  players: React.PropTypes.arrayOf(React.PropTypes.shape({
    name:  React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    id:    React.PropTypes.number.isRequired,
  })).isRequired,
};

// Define type of properies the component Header.
Header.propTypes = {
  title: React.PropTypes.string.isRequired // title must be a string. Must be required
};

// Define properties of component Player.
Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number
}




// Define all default values properties of the application component.
Application.defaultProps = {
  title: "My Scoreboard",
  score: 0
};



function Header(props){
  return(
    <div className="header">
      <h1>{props.title}</h1>
    </div>
  );
}
const Counter = React.createClass({
  // Define properties of component Player.
  propTypes: {
    initialScore : React.PropTypes.number.isRequired
  },

  getInitialState: function(){
    return {
      score: this.props.initialScore,
    }
  },

  incrementScore: function(e){
    this.setState({
      score: (this.state.score+1),
    })
  },

  decrementScore: function(e){
    this.setState({
      score: (this.state.score-1),
    })
  },

  // Return a virtual DOM
  render: function(){
    return(
      <div className="counter">
        <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
        <div className="counter-score"> {this.state.score} </div>
        <button className="counter-action increment" onClick={this.incrementScore}> + </button>
      </div>
    );
  }
})

function Player(props){
  return(
    <div className="player">
      <div className="player-name">
        {props.name}
      </div>
      <div className="player-score">
        <Counter initialScore={props.score}/>
      </div>
    </div>
  );
}

function Application(props){
  return(
    <div className="scoreboard">
      <Header title={props.title} />
      <div className="players">
        {props.players.map(function(player){
          return <Player key={player.id} name={player.name} score={player.score} />
        })}
      </div>
    </div>
  );
}



ReactDOM.render(<Application players={PLAYERS}/>, document.getElementById('container'));
