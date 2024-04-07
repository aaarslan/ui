import { Button } from "../lib/button";
import { useTheme } from "../lib/theme";
import { Typography } from "../lib/typography";
function App() {
  const { theme, setIsLight, isLight } = useTheme();
  return (
    <body
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      <div>
        <Typography vx="heading">Heading</Typography>
        <Typography vx="heading2">Heading 2</Typography>
        <Typography vx="heading3">Heading 3</Typography>
        <Typography vx="heading4">Heading 4</Typography>
        <Typography vx="body">
          This is a paragraph of text. It should be styled according to the
          theme.
        </Typography>
        <Typography vx="span">This is a span of text.</Typography>
        <hr />
        <Typography vx="heading">Colors</Typography>
        <Typography vx="body">
          <span style={{ backgroundColor: `${theme.colors.brand}` }}>
            Brand: {theme.colors.brand}
          </span>
          <br />
          <span style={{ backgroundColor: `${theme.colors.background}` }}>
            Background: {theme.colors.background}
          </span>
          <br />
          <span style={{ backgroundColor: `${theme.colors.textPrimary}` }}>
            Text Primary: {theme.colors.textPrimary}
          </span>
          <br />
          <span style={{ backgroundColor: `${theme.colors.textSecondary}` }}>
            Text Secondary: {theme.colors.textSecondary}
          </span>
          <br />
          <span style={{ backgroundColor: `${theme.colors.stroke}` }}>
            Stroke: {theme.colors.stroke}
          </span>
          <br />
          <span style={{ backgroundColor: `${theme.colors.accent}` }}>
            Accent: {theme.colors.accent}
          </span>
          <br />
          <span style={{ backgroundColor: `${theme.colors.fill}` }}>
            Fill: {theme.colors.fill}
          </span>
          <br />
          <span style={{ backgroundColor: `${theme.colors.danger}` }}>
            Danger: {theme.colors.danger}
          </span>
          <br />
          <span style={{ backgroundColor: `${theme.colors.warning}` }}>
            Warning: {theme.colors.warning}
          </span>
          <br />
          <span style={{ backgroundColor: `${theme.colors.success}` }}>
            Success: {theme.colors.success}
          </span>
          <br />
          <span style={{ backgroundColor: `${theme.colors.white}` }}>
            White: {theme.colors.white}
          </span>
          <br />
          <span style={{ backgroundColor: `${theme.colors.black}` }}>
            Black: {theme.colors.black}
          </span>
        </Typography>
        <hr />
        <Button vx="primary" rd={"sm"}>
          Primary Button
        </Button>
        <Button vx="secondary">Secondary Button</Button>
        <Button vx="tertiary">Tertiary Button</Button>
        <Button
          type="button"
          rd="lg"
          vx="tertiary"
          onClick={() => setIsLight(!isLight)}
        >
          👻
        </Button>
        <Button vx="primary" disabled>
          Primary Button
        </Button>
        <Button vx="secondary" disabled>
          Secondary Button
        </Button>
        <Button vx="tertiary" disabled>
          Tertiary Button
        </Button>
      </div>
    </body>
  );
}

export default App;
