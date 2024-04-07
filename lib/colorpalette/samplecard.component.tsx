import type { FC } from "react";
interface SampleCardProps {
  brand: string;
  primaryText: string;
  secondaryText: string;
  primaryOutline: string;
  secondaryOutline: string;
  fill: string;
  background: string;
}

const SampleCard: FC<SampleCardProps> = ({
  brand,
  primaryText,
  secondaryText,
  primaryOutline,
  secondaryOutline,
  fill,
  background,
}: SampleCardProps) => {
  return (
    <div
      style={{
        height: "270px",
        width: "300px",
        borderRadius: "8px",
        padding: "16px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: `${background}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span
        style={{
          color: `${primaryText}`,
          fontSize: "40px",
          lineHeight: "48px",
        }}
      >
        Welcome!
      </span>
      <span
        style={{
          color: `${secondaryText}`,
          fontSize: "32px",
          lineHeight: "40px",
        }}
      >
        I hope you like it!
      </span>
      <hr
        style={{
          border: `1px solid ${secondaryOutline}`,
          marginTop: "16px",
          width: "100%",
        }}
      />
      <span
        style={{
          color: `${secondaryText}`,
          fontSize: "14px",
          lineHeight: "20px",
        }}
      >
        This is a form
      </span>
      <label
        style={{
          color: `${secondaryText}`,
          fontSize: "14px",
          lineHeight: "20px",
          marginTop: "16px",
        }}
      >
        Name
      </label>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          marginTop: "16px",
          width: "fit-content",
          borderRadius: "8px",
          border: `2px solid ${primaryOutline}`,
        }}
      >
        <input
          type="text"
          placeholder="Name"
          style={{
            flex: 1,
            padding: "8px",
            border: "none",
            outline: "none",
            borderRadius: "6px 0 0 6px",
            marginRight: "-2px",
          }}
        />
        <button
          type="button"
          style={{
            backgroundColor: `${brand}`,
            color: `${fill}`,
            padding: "8px 16px",
            border: "none",
            borderRadius: "0 6px 6px 0",
            cursor: "pointer",
          }}
        >
          Say Hello
        </button>
      </div>
      <hr
        style={{
          border: `1px solid ${secondaryOutline}`,
          marginTop: "16px",
          width: "100%",
        }}
      />
      <span
        style={{
          color: `${secondaryText}`,
          fontSize: "14px",
          lineHeight: "20px",
        }}
      >
        This is a footer{" "}
        <span
          style={{
            backgroundColor: `${fill}`,
            height: "50px",
            width: "50px",
            borderRadius: "32px",
            padding: "4px",
            fontSize: "10px",
            lineHeight: "12px",
            color: `${primaryText}`,
          }}
        >
          #hello
        </span>
      </span>
    </div>
  );
};

export { SampleCard };
