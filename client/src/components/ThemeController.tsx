import { BsMoonFill, BsSunFill } from "react-icons/bs";

export default function ThemeController({
  handleThemeToggle,
}: {
  handleThemeToggle: () => void;
}) {
  return (
    <label className="swap swap-rotate">
      <input type="checkbox" onChange={handleThemeToggle} />
      <BsSunFill className="swap-on h-4 w-4" />
      <BsMoonFill className="swap-off h-4 w-4" />
    </label>
  );
}
