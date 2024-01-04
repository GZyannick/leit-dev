import { toPng } from "html-to-image";
import { getRectOfNodes, getTransformForBounds, useReactFlow } from "reactflow";
import { sendToCloudinary } from "@/app/mindmap/[id]/actions";

const imageWidth = 1920;
const imageHeight = 1080;

const createThumbnail = (
  ref: any,
  mindmapId: string,
  nodesBounds: any,
  startTransition: any,
) => {
  const transform = getTransformForBounds(
    nodesBounds,
    imageWidth,
    imageHeight,
    0.5,
    2,
  );

  toPng(ref.current.querySelector(".react-flow__renderer"), {
    width: imageWidth,
    height: imageHeight,
  })
    .then((data: string) => {
      startTransition(() => sendToCloudinary(data, mindmapId));
      return true;
    })
    .catch(function (error) {
      return false;
    });
};

export default createThumbnail;
