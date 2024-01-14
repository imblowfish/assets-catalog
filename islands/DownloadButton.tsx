import { Button } from "$/components/Button.tsx";

interface DownloadButtonProps {
  filename: string;
  url: string;
}

export const DownloadButton = (props: DownloadButtonProps) => {
  return (
    <Button
      onClick={() => {
        const anchor = document.createElement("a");
        document.body.appendChild(anchor);
        anchor.download = props.filename;
        anchor.href = props.url;
        anchor.click();
        document.body.removeChild(anchor);
      }}
    >
      Download
    </Button>
  );
};
