export default function SectionTitle({ text }: { text: string }) {
  return (
    <div className="border-b border-base-300 pb-5">
      <h2 className="text-center text-3xl font-medium capitalize tracking-wider">
        {text}
      </h2>
    </div>
  );
}
