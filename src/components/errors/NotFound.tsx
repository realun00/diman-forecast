const NotFound = () => {
  return (
    <div className="container card cs-view border-0 text-center bg-transparent">
      <h2 style={{ color: "#EA9DA2", fontWeight: 700 }}>Page not found!</h2>
      <br />
      <span style={{ color: "#979797", fontSize: "1em" }}>
        We could not find the page you are looking for. If you feel this is an issue on our side, please contact us
        here.
      </span>
    </div>
  );
};

export default NotFound;