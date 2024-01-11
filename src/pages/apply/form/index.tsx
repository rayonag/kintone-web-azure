"use client";
import { useDashboardUser } from "@/pages/_app";
// Import necessary modules from React
import React, { useState } from "react";

const ApplicationForm = () => {
    // State to track whether the iframe content is loading
    const [isLoading, setIsLoading] = useState(true);
    const user = useDashboardUser();
    const ref = user.ref;
    console.log(isLoading);
    // Function to handle iframe load event
    const handleIframeLoad = () => {
        // Set isLoading to false when the iframe has finished loading
        // added 2 seconds for lagging loading time
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    return (
        // Use a wrapper div for the entire page
        <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
            {/* Header component */}
            {/* <header style={{ backgroundColor: "#f0f0f0", padding: "10px", textAlign: "center" }}>
                <h1>Simple Header</h1>
            </header> */}
            {/* Display the loading spinner while the iframe is loading */}
            {isLoading && (
                <div className="flex items-center justify-center h-screen">
                    <div className="spinner border-4 border-solid border-white/30 border-t-[#3498db] rounded-full w-[20vmin] h-[20vmin] animate-spin"></div>
                </div>
            )}
            {/* Iframe component */}
            <iframe
                title="Embedded Content"
                src={`https://f62c12b3.form.kintoneapp.com/public/6c3b288a54c80e09b9b9c2160219236edffef801d5d46cdc90e7a81c0ffb2819?iframe=true&ref=${ref}`} // Replace with your desired URL
                style={{ flex: 1, border: "none" }} // Make the iframe fill the remaining space
                onLoad={handleIframeLoad}
            ></iframe>
        </div>
    );
};

// Export the component for use in other files
export default ApplicationForm;
