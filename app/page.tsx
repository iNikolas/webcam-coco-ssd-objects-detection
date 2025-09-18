import { About } from "./_components/containers/layout/about";
import { ClosableBlock } from "./_components/ui/closable-block";
import { ModelStatus } from "./_components/containers/model/status";
import { PredictWebcam } from "./_components/containers/predict-webcam";
import { MemoryUsage } from "./_components/containers/model/memory-usage";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <ModelStatus />
      <div className="flex-1 flex flex-col justify-center items-center">
        <PredictWebcam className="w-full" />
      </div>
      <MemoryUsage />
      <ClosableBlock>
        <About />
      </ClosableBlock>
    </div>
  );
}
