import ColorPicker from "./Components/ColorPicker";
import GradientSelect from "./Components/GradientSelect";
import StyleDisplay from "./Components/StyleDisplay";
import InterpolationEditor from "./Components/InterpolationEditor";
import GradientTypeSelect from "./Components/GradientTypeSelect";
import { GradientProvider } from "./Utils/ContextAPI";

export default function Home() {
  return (
    <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black w-full h-full pt-4">
      <main>
        <GradientProvider>
          <div className="flex flex-row justify-around">
            <GradientSelect/>
            <ColorPicker/>
            <StyleDisplay/>
          </div>
          <div className="w-full h-full grid grid-cols-2 gap-4 px-16 bg-white dark:bg-black items-start">
            <GradientTypeSelect/>
            <InterpolationEditor/>
          </div>
        </GradientProvider>
      </main>
    </div>
  );
}
