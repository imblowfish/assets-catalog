import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "preact/compat";
import { UploadIcon } from "$/components/Icons.tsx";

const ImagePreview = forwardRef(
  (_props: undefined, ref: ForwardedRef<HTMLImageElement>) => {
    return (
      <div
        class="flex justify-center"
        style={{ maxHeight: "80%" }}
      >
        <img
          class="object-contain"
          ref={ref}
        />
      </div>
    );
  },
);

export interface FileUploaderProps {
  onChange?: (file: File) => void;
  name?: string;
  required?: boolean;
}

export const FileUploader = forwardRef((props: FileUploaderProps, ref: ForwardedRef<HTMLInputElement>) => {
  const [fileSelected, setFileSelected] = useState(false);

  const fileReaderRef = useRef(new FileReader());
  const assetRef = useRef<HTMLImageElement | null>(null);

  const onFileLoad = () => {
    if (!assetRef.current) {
      return;
    }
    assetRef.current.src = fileReaderRef.current.result as string;
    setFileSelected(true);
  };

  useEffect(() => {
    fileReaderRef.current.addEventListener("load", onFileLoad);
    return () => {
      fileReaderRef.current.removeEventListener("load", onFileLoad);
    };
  }, []);

  return (
    <div class="h-96 border border-black border-dashed hover:border-solid rounded flex flex-col justify-center items-center relative">
      <input
        ref={ref}
        class="absolute top-0 left-0 w-full h-full opacity-0"
        type="file"
        name={props.name}
        required={props.required}
        onChange={(event) => {
          const file = event.currentTarget.files?.[0];
          if (!file) {
            return;
          }
          fileReaderRef.current.readAsDataURL(file);
          props.onChange?.(file);
        }}
      />
      {!fileSelected && (
        <div class="flex flex-row">
          <UploadIcon />
          <p>Choose file or drag it here</p>
        </div>
      )}
      <ImagePreview ref={assetRef} />
    </div>
  );
});
