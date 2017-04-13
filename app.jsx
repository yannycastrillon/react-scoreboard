function Application(props){
  return(
    <div className="scoreboard">
      <div className="header">
        <h1>{props.title}</h1>
      </div>
      <div className="players">
        <div className="player">
          <div className="player-name">
            Yanny Castrillon
          </div>
          <div className="player-score">
            <div className="counter">
              <button className="counter-action decrement"> - </button>
              <div className="counter-score"> 31 </div>
              <button className="counter-action increment"> + </button>
            </div>
          </div>
        </div> 
      </div>
      <div className="players">
        <div className="player">
          <div className="player-name">
            Alejandra Castrillon
          </div>
          <div className="player-score">
            <div className="counter">
              <button className="counter-action decrement"> - </button>
              <div className="counter-score"> 34 </div>
              <button className="counter-action increment"> + </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Define type of properies that component applicaton has.
Application.propTypes = {
  title: React.PropTypes.string, //isRequired, // title must be a string. Must be required
};

// Define all default values properties of the application component.
Application.defaultProps = {
  title: "My Scoreboard",
};

ReactDOM.render(<Application/>, document.getElementById('container'));
