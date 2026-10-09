import ColorPicker from "./Components/ColorPicker";
import GradientSelect from "./Components/GradientSelect";
import DirectionSelect from "./Components/DirectionSelect";
import StyleDisplay from "./Components/StyleDisplay";
import InterpolationEditor from "./Components/InterpolationEditor";
import RadialProperties from "./Components/RadialProperties";
import { GradientProvider } from "./Utils/ContextAPI";

export default function Home() {
  return (
    <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black w-full h-full">
      <main className="w-full h-full grid grid-cols-2 gap-4 py-32 px-16 bg-white dark:bg-black items-start">
        <GradientProvider>
          <ColorPicker/>
          <GradientSelect/>
          <InterpolationEditor/>
          <DirectionSelect/>
          <RadialProperties/>
          <StyleDisplay/>
        </GradientProvider>
      </main>
    </div>
  );
}
