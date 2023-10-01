import useCpu from "../../hooks/useCpu";

export default function Details() {
  const { cpu } = useCpu();

  return <div>Cores: {cpu.CoreCount}</div>;
}
