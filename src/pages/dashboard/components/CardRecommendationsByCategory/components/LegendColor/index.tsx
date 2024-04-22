type Props = {
  color: string;
};

export const LegendColor = ({ color }: Props) => {
  return <div style={{ width: '40px', height: '12px', backgroundColor: color }}></div>;
};
