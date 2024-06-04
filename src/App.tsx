import { Button } from "../lib/button";
import { useTheme } from "../lib/theme";
import { contrastRatio } from "../lib/theme/utils";
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
          {contrastRatio(theme.colors.brand, theme.colors.fill) > 4.5 ? (
            <span>✅</span>
          ) : (
            <span>❌</span>
          )}
          <span style={{ backgroundColor: `${theme.colors.brand}` }}>
            Brand: {theme.colors.brand}
          </span>
          <br />
          {contrastRatio(theme.colors.background, theme.colors.fill) > 1 ? (
            <span>✅</span>
          ) : (
            <span>❌</span>
          )}
          <span style={{ backgroundColor: `${theme.colors.background}` }}>
            Background: {theme.colors.background}
          </span>
          <br />
          {contrastRatio(theme.colors.textPrimary, theme.colors.fill) > 4.5 ? (
            <span>✅</span>
          ) : (
            <span>❌</span>
          )}
          <span style={{ backgroundColor: `${theme.colors.textPrimary}` }}>
            Text Primary: {theme.colors.textPrimary}
          </span>
          <br />
          {contrastRatio(theme.colors.textSecondary, theme.colors.fill) >
          4.5 ? (
            <span>✅</span>
          ) : (
            <span>❌</span>
          )}
          <span style={{ backgroundColor: `${theme.colors.textSecondary}` }}>
            Text Secondary: {theme.colors.textSecondary}
          </span>
          <br />
          {contrastRatio(theme.colors.stroke, theme.colors.fill) > 3 ? (
            <span>✅</span>
          ) : (
            <span>❌</span>
          )}
          <span style={{ backgroundColor: `${theme.colors.stroke}` }}>
            Stroke: {theme.colors.stroke}
          </span>
          <br />
          {contrastRatio(theme.colors.accent, theme.colors.fill) > 1 ? (
            <span>✅</span>
          ) : (
            <span>❌</span>
          )}
          <span style={{ backgroundColor: `${theme.colors.accent}` }}>
            Accent: {theme.colors.accent}
          </span>
          <br />
          {contrastRatio(theme.colors.fill, theme.colors.fill) >= 1 ? (
            <span>✅</span>
          ) : (
            <span>❌</span>
          )}
          <span style={{ backgroundColor: `${theme.colors.fill}` }}>
            Fill: {theme.colors.fill}
          </span>
          <br />
          {contrastRatio(theme.colors.error, theme.colors.fill) > 3 ? (
            <span>✅</span>
          ) : (
            <span>❌</span>
          )}
          <span style={{ backgroundColor: `${theme.colors.error}` }}>
            error: {theme.colors.error}
          </span>
          <br />
          {contrastRatio(theme.colors.warning, theme.colors.fill) >= 1 ? (
            <span>✅</span>
          ) : (
            <span>❌</span>
          )}
          <span style={{ backgroundColor: `${theme.colors.warning}` }}>
            Warning: {theme.colors.warning}
          </span>
          <br />
          {contrastRatio(theme.colors.success, theme.colors.fill) > 3 ? (
            <span>✅</span>
          ) : (
            <span>❌</span>
          )}
          <span style={{ backgroundColor: `${theme.colors.success}` }}>
            Success: {theme.colors.success}
          </span>
          <br />
          {contrastRatio(theme.colors.white, theme.colors.fill) > 1 ? (
            <span>✅</span>
          ) : (
            <span>❌</span>
          )}
          <span style={{ backgroundColor: `${theme.colors.white}` }}>
            White: {theme.colors.white}
          </span>
          <br />
          {contrastRatio(theme.colors.black, theme.colors.fill) > 1 ? (
            <span>✅</span>
          ) : (
            <span>❌</span>
          )}
          <span style={{ backgroundColor: `${theme.colors.black}` }}>
            Black: {theme.colors.black}
          </span>
          {contrastRatio(theme.colors.black, theme.colors.fill) > 1 ? (
            <span>✅</span>
          ) : (
            <span>❌</span>
          )}
          <span style={{ backgroundColor: `${theme.colors.raised}` }}>
            Raised: {theme.colors.raised}
          </span>
          {contrastRatio(theme.colors.black, theme.colors.fill) > 1 ? (
            <span>✅</span>
          ) : (
            <span>❌</span>
          )}
          <span style={{ backgroundColor: `${theme.colors.overlay}` }}>
            Overlay: {theme.colors.overlay}
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
        <hr />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ backgroundColor: `${theme.colors.brandFill}` }}>
            Brand Fill: {theme.colors.brandFill}
          </span>
          <span
            style={{ backgroundColor: `${theme.colors.brandStrokeStrong}` }}
          >
            Brand Stroke: {theme.colors.brandStrokeStrong}
          </span>
          <span style={{ backgroundColor: `${theme.colors.brandText}` }}>
            Brand Text: {theme.colors.brandText}
          </span>
          <span
            style={{
              backgroundColor: `${theme.colors.successFill}`,
              color: `${theme.colors.successText}`,
              border: `1px solid ${theme.colors.successStrokeStrong}`,
            }}
          >
            Brand Text: {theme.colors.brandText}
          </span>
        </div>
      </div>
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: !isLight ? theme.colors.raised : theme.colors.fill,
            height: "200px",
            width: "200px",
            borderRadius: `${theme.borderRadius.md}px`,
            boxShadow: isLight ? theme.shadows.raised : "none",
            padding: `${theme.spacing.md}px`,
          }}
        >
          <Typography vx="span">Raised</Typography>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: !isLight
                ? theme.colors.overlay
                : theme.colors.fill,
              height: "100px",
              width: "70px",
              borderRadius: `${theme.borderRadius.md}px`,
              boxShadow: isLight ? theme.shadows.overlay : "none",
              padding: `${theme.spacing.sm}px`,
            }}
          >
            <Typography vx="span">Overlay</Typography>
          </div>
        </div>
      </>
    </body>
  );
}

export default App;
