type Props = {
  message: string;
}
export default function HelperText({ message }: Props) {
  return (
    <p className="text-meta-1 italic text-sm">
      {message}
    </p>
  );
}
