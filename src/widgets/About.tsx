import Card, { CardComponentProps } from "../components/Card";

const About: React.FC<CardComponentProps> = ({ id, close }) => {
  return (
    <Card id={id} title="about" close={close}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          padding: "0px 16px",
        }}
      >
        <span style={{ fontSize: "2em" }}>floppa's new tab</span>

        <span>
          made by <a href="https://github.com/mirunaish">unicornish</a>
        </span>

        <span>
          instructions and more info{" "}
          <a href="https://github.com/mirunaish/floppa-home/tree/main/README.md">
            here
          </a>
        </span>

        <span>
          source code can be found{" "}
          <a href="https://github.com/mirunaish/floppa-home/tree/main">here</a>
        </span>

        <div
          className="theme-icon"
          style={{ width: "8em", height: "8em", margin: "20px 0px 10px 0px" }}
        />
      </div>
    </Card>
  );
};

export default About;
