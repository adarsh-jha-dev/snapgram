import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".svg", ".jpeg", ".jpg"],
    },
  });

  return (
    <div
      className="flex flex-col flex-center bg-dark-3 rounded-xl cursor-pointer "
      {...getRootProps()}
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className=" flex flex-1 justify-center w-full p-5">
            <img src={fileUrl} alt="img" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or Drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file-upload"
          />
          <h3 className=" base-medium text-light-2 mb-2 mt-6">
            Drag Photo here
          </h3>
          <p className="text-light-4 small-regular mb-6 ">SVG, PNG, JPG</p>

          <Button className="shad-button_darl_4">Select From computer</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
