import ColorPicker from "./Components/ColorPicker";
import GradientSelect from "./Components/GradientSelect";
import DirectionSelect from "./Components/DirectionSelect";

export default function Home() {
  return (
    <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black w-full h-full">
      <main className="flex w-full h-full flex-row justify-around py-32 px-16 bg-white dark:bg-black items-start">
        <ColorPicker/>
        <DirectionSelect/>
        <GradientSelect/>
      </main>
    </div>
  );
}
