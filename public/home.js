const Home = () => {
  const [text, setText] = React.useState("");
  return (
    <React.Fragment>
      <div className="mainContainer">
        <img src="/logo.png" />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="learn-more">Send to Mirror</button>
      </div>
      <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="buttonContainer">
        <button className="learn-more small">In a meeting</button>
        <button className="learn-more small">Free to chat</button>
        <button className="learn-more small">Focus time</button>
      </div>
    </React.Fragment>
  );
};

const domContainer = document.querySelector("#root");
ReactDOM.render(<Home />, domContainer);
