import { toPng } from "html-to-image";
import {
  Panel,
  getRectOfNodes,
  getTransformForBounds,
  useReactFlow,
} from "reactflow";
import { useTransition } from "react";
import { sendToCloudinary } from "@/app/mindmap/[id]/actions";

const imageWidth = 1920;
const imageHeight = 1080;

const Thumbnail = (props: { refHtml: any; mindMapId: string }) => {
  let [isPending, startTransition] = useTransition();
  const { getNodes } = useReactFlow();
  const onClick = () => {
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
    );

    toPng(props.refHtml.current, {
      width: imageWidth,
      height: imageHeight,
    }).then((data: string) => {
      startTransition(() => sendToCloudinary(data, props.mindMapId));
    });
  };

  return (
    <Panel position="top-left">
      <button onClick={onClick}>screenshot</button>
    </Panel>
  );
};

export default Thumbnail;
