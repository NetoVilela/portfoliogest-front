type Props = {
  message: string;
}
export default function HelperText({ message }: Props) {
  return (
    <span className="text-meta-1 italic text-sm">
      {message}
    </span>
  );
}
