const { Auth0Provider, useAuth0 } = reactAuth0;

const Loading = () => (
  <svg
    width="55"
    height="80"
    viewBox="0 0 55 80"
    xmlns="http://www.w3.org/2000/svg"
    fill="#a52a2a"
  >
    <g transform="matrix(1 0 0 -1 0 80)">
      <rect width="10" height="20" rx="3">
        <animate
          attributeName="height"
          begin="0s"
          dur="4.3s"
          values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="15" width="10" height="80" rx="3">
        <animate
          attributeName="height"
          begin="0s"
          dur="2s"
          values="80;55;33;5;75;23;73;33;12;14;60;80"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="30" width="10" height="50" rx="3">
        <animate
          attributeName="height"
          begin="0s"
          dur="1.4s"
          values="50;34;78;23;56;23;34;76;80;54;21;50"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="45" width="10" height="30" rx="3">
        <animate
          attributeName="height"
          begin="0s"
          dur="2s"
          values="30;45;13;80;56;72;45;76;34;23;67;30"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
    </g>
  </svg>
);

const Home = () => {
  const [text, setText] = React.useState("");
  const [responseIsLoading, setResponseLoading] = React.useState(false);
  const [success, setSuccess] = React.useState();
  const {
    isLoading,
    error,
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently
  } = useAuth0();
  const sendText = async (custom) => {
    setSuccess(null);
    setResponseLoading(true);
    const token = await getAccessTokenSilently();
    const res = await axios({
      method: "post",
      url: "https://auth0-magic-mirror.herokuapp.com/v1/update-meeting",
      data: { status: custom || text },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.status === 200) {
      setSuccess("Request sent successfully!");
    } else {
      setSuccess("Opps, there was an error");
    }
    setResponseLoading(false);
  };

  if (isLoading) return <Loading />;
  if (error) return <div>... oops looks like there is a error</div>;

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }
  return (
    <React.Fragment>
      <div className="mainContainer">
        <img src="/logo.png" />
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setSuccess(null);
            setText(e.target.value);
          }}
        />
        {responseIsLoading ? (
          <Loading />
        ) : (
          <button onClick={() => sendText()} className="learn-more">
            Send to Mirror
          </button>
        )}
        {success ? <p className="notification">{success}</p> : null}
      </div>
      <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      {responseIsLoading ? null : (
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
      )}
    </React.Fragment>
  );
};

const domContainer = document.querySelector("#root");
ReactDOM.render(
  <Auth0Provider
    domain="dev-rm3u1yq4.auth0.com"
    clientId="Jck1XCeOhHUrTrp0LQp1V5cyz5ECXGJp"
    audience="https://magicmirror/api"
    redirectUri={window.location.origin}
  >
    <Home />
  </Auth0Provider>,
  domContainer
);
