import { Webcam } from "./_components/containers/webcam";
import { ModelStatus } from "./_components/containers/model/status";

export default function Home() {
  return (
    <>
      <ModelStatus />
      <Webcam />
    </>
  );
}
