var PLAYERS = [
  {
    name: "Yanny Castrillon",
    score: 35
  },
  {
    name: "Alejandra Castrillon",
    score: 30
  },
  {
    name: "Julian Castrillon",
    score: 42
  },
  {
    name: "Luis Castrillon",
    score: 28
  },
];

// Define type of properies the component Applicaton.
Application.propTypes = {
  title: React.PropTypes.string, //isRequired, // title must be a string. Must be required
  players: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
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

// Define properties of component Player.
Counter.propTypes = {
  score: React.PropTypes.number,
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

function Counter(props){
  return(
    <div className="counter">
      <button className="counter-action decrement"> - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment"> + </button>
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

function Application(props){
  return(
    <div className="scoreboard">
      <Header title={props.title} />
      <div className="players">
        <Player name="Yanny Castrillon" score={31}/>
      </div>
      <div className="players">
        <Player name="Alejandra Castrillon" score={34}/>
      </div>
    </div>
  );
}



ReactDOM.render(<Application/>, document.getElementById('container'));
