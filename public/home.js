const Home = () => {
  const [text, setText] = React.useState("");
  const sendText = (custom) => {
    fetch("https://auth0-magic-mirror.herokuapp.com/v1/update-meeting", {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: custom || text })
    });
  };
  return (
    <React.Fragment>
      <div className="mainContainer">
        <img src="/logo.png" />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => sendText()} className="learn-more">
          Send to Mirror
        </button>
      </div>
      <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="buttonContainer">
        <button
          onClick={() => sendText("In a meeting")}
          className="learn-more small"
        >
          In a meeting
        </button>
        <button
          onClick={() => sendText("Free to chat")}
          className="learn-more small"
        >
          Free to chat
        </button>
        <button
          onClick={() => sendText("Focus time")}
          className="learn-more small"
        >
          Focus time
        </button>
      </div>
    </React.Fragment>
  );
};

const domContainer = document.querySelector("#root");
ReactDOM.render(<Home />, domContainer);
