// import { Auth0Provider } from "@auth0/auth0-react";
// import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const [text, setText] = React.useState("");
  const sendText = (custom) => {
    axios({
      method: "post",
      url: "https://auth0-magic-mirror.herokuapp.com/v1/update-meeting",
      data: { status: custom || text }
    });
  };
  // const {
  //   isLoading,
  //   error,
  //   isAuthenticated,
  //   loginWithRedirect,
  //   getAccessTokenSilently
  // } = useAuth0();

  // if (isLoading) return null;
  // if (error) return <div>... oops looks like there is a error</div>;

  // if (!isAuthenticated) {
  //   loginWithRedirect();
  // }

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
