const LoadingSpinner = () => (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/60 z-50">
        <div className="spinner border-4 border-solid border-white/30 border-t-[#3498db] rounded-full w-[20vmin] h-[20vmin] animate-spin"></div>
    </div>
);
export default LoadingSpinner;
