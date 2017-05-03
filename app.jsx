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


// Define type of properies the component Header.
Header.propTypes = {
  title: React.PropTypes.string.isRequired // title must be a string. Must be required
};

// Define properties of component Player.
Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number
}







Counter.propTypes = {
  score: React.PropTypes.number.isRequired
};

function Counter (props){
  return(
    <div className="counter">
      <button className="counter-action decrement"> - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment"> + </button>
    </div>
  );
}

function Header(props){
  return(
    <div className="header">
      <h1>{props.title}</h1>
    </div>
  );
}

function Player(props){
  return(
    <div className="player">
      <div className="player-name">
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score}/>
      </div>
    </div>
  );
}


const Application = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    // shape describe the attributes of the object property.
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

  render: function(){
    return(
      <div className="scoreboard">
        <Header title={this.props.title} />
        <div className="players">
          {this.state.players.map(function(player){
            return <Player key={player.id} name={player.name} score={player.score} />
          })}
        </div>
      </div>
    );
  }
})

ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));
