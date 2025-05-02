import { type ComponentProps } from "react";
import { ImagePlus } from "lucide-react";
import Image from "next/image";

import { classMerge } from "@lib/utils";

type DropzoneBasic = {
  objectUrl?: string;
  isDragActive?: boolean;
  alt?: string;
};

type DropzoneHandler = {
  openDropzone: () => void;
  deletePreview: () => void;
};

export type DropzoneProps = ComponentProps<"div">;
export type DropzoneContentProps = ComponentProps<"div"> & DropzoneBasic & DropzoneHandler;
export type DropzonePlaceholderProps = ComponentProps<"div"> & { isDragActive?: boolean };
export type DropzonePreviewProps = ComponentProps<"div"> & { objectUrl: string, alt?: string };
export type DropzoneControlProps = ComponentProps<"div"> & DropzoneHandler;

export function Dropzone(props: DropzoneProps) {
  const { className, ...rest } = props;
  const classes = classMerge(
    "flex flex-col items-center justify-center",
    "gap-2 p-3 w-57 h-53 border-2 border-dashed border-slate-300",
    "rounded-lg cursor-pointer transition-colors",
    "hover:border-slate-400",
    className,
  );

  return <div data-slot="dropzone" className={classes} {...rest}/>;
}

export function DropzoneContent(props: DropzoneContentProps) {
  const { objectUrl, isDragActive, alt, openDropzone, deletePreview } = props;
  if (!objectUrl) return <DropzonePlaceholder isDragActive={isDragActive}/>;
  if (objectUrl) return (
    <>
      <DropzonePreview objectUrl={objectUrl} alt={alt}/>
      <DropzoneControl openDropzone={openDropzone} deletePreview={deletePreview}/>
    </>
  );
}

export function DropzonePlaceholder(props: DropzonePlaceholderProps) {
  const { className, isDragActive, ...rest } = props;
  const classes = classMerge(
    "flex flex-col items-center justify-center",
    "gap-3 text-xs text-slate-500",
    className,
  );

  return (
    <div data-slot="dropzone-placeholder" className={classes} {...rest}>
      <ImagePlus className="size-5"/>
      <div className="flex flex-col items-center justify-center gap-1">
        {!isDragActive && <span className="underline">Click to select files</span>}
        {isDragActive && <span>Drag the image here...</span>}
        <span>Supported File Type : jpg or png</span>
      </div>
    </div>
  );
}

export function DropzonePreview(props: DropzonePreviewProps) {
  const { className, objectUrl, alt = "Dropzone preview", ...rest } = props;
  const classes = classMerge("relative w-full h-28 rounded-md overflow-hidden [&_img]:object-cover", className);

  return (
    <div data-slot="dropzone-preview" className={classes} {...rest}>
      <Image src={objectUrl} alt={alt} fill={true}/>
    </div>
  );
}

export function DropzoneControl(props: DropzoneControlProps) {
  const { className, openDropzone, deletePreview, ...rest } = props;
  const classes = classMerge("flex flex-row gap-2.5 text-xs", className);

  return (
    <div data-slot="dropzone-control" className={classes} {...rest}>
      <button
        className="text-primary underline"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openDropzone();
        }}
      >
        Changes
      </button>
      <button
        className="text-dropdown-destructive underline"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          deletePreview();
        }}
      >
        Delete
      </button>
    </div>
  );
}
