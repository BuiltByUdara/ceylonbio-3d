import {OrganViewer, type OrganViewerProps} from "./organ-viewer";
import {heartModel} from "./heart-model";
export {heartModel} from "./heart-model";

export type HeartProps = Omit<OrganViewerProps, "model">;

export function Heart(props: HeartProps) {
  return <OrganViewer model={heartModel} {...props} />;
}
