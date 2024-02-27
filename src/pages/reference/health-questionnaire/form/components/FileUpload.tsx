
const fileInput = useRef<HTMLInputElement | null>(null);
const [fileName, setFileName] = useState("");
const [imageData, setImageData] = useState("");
const deployment = (files: FileList) => {
    const file = files[0];
    const fileReader = new FileReader();
    setFileName(file.name);
    fileReader.onload = () => {
        setImageData(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
};
const camera = () => {
    if (!fileInput.current) return;
    fileInput.current.setAttribute("capture", "environment");
    fileInput.current.click();
};
const isMobile = window.navigator.userAgent
    .toLowerCase()
    .includes("mobile");
    
const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length <= 0) return;
    deployment(files); // ファイル名とプレビューの表示
};
const { ref, ...rest } = register("file", {
    onChange,
    required: "ファイルを選択してください",
});
const FileUpload = () => {
    return (
        <>
            {" "}
            <input
                type="file"
                ref={(e) => {
                    ref(e);
                    fileInput.current = e;
                }}
                {...rest}
            />
            <button onClick={camera} type="button" disabled={!isMobile}>
                カメラで撮影
            </button>
            <input
                type="file"
                ref={(e) => {
                    ref(e);
                    fileInput.current = e;
                }}
                accept="image/*"
                style={{ display: "none" }}
                {...rest}
            />
            <img src={imageData} />
            <div>{fileName}</div>{" "}
        </>
    );
};