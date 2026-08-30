type Props = {
  data: {
    label: string;
    type: string;
  };
};

export default function CausalNode({ data }: Props) {
  return (
    <div
      style={{
        width: 240,
        padding: 18,
        borderRadius: 16,
        background: "#1b1634",
        border: "1px solid #6d5efc",
        color: "white",
        boxShadow: "0 0 20px rgba(124,92,255,.3)",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          marginBottom: 10,
        }}
      >
        {data.label}
      </div>

      <div
        style={{
          color: "#a78bfa",
          fontSize: 13,
        }}
      >
        {data.type}
      </div>
    </div>
  );
}