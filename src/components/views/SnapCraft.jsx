import React, { useState } from 'react';
import { useTheme } from "../../context/ThemeContext";

const ImageGenerator = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const generateImage = async (prompt) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch("http://localhost:5000/generate-image", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ prompt }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to generate image");
  //     }

  //     const data = await response.json();
  //     setImageUrl(data.image); // This is base64 image string from backend
  //   } catch (error) {
  //     setError(error.message || "Failed to generate image.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const generateImage = async (prompt) => {
    const apiKey = "API";
    const modelName = "stabilityai/stable-diffusion-xl-base-1.0";

    try {
      setLoading(true);
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${modelName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Image generation failed: ${errorData}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageUrl(imageUrl);
      setLoading(false);
    } catch (error) {
      console.error("Error during image generation:", error);
      setError("Failed to generate image.");
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (prompt) {
      generateImage(prompt);
    } else {
      alert("Please enter a prompt.");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-lg w-[90vw] sm:w-[80vw] md:w-[70vw] max-w-2xl mx-auto"
      style={{
        backgroundColor: isDark ? "#1A1B1F" : "#f2f2f2",
        color: isDark ? "#ffffff" : "#000000",
      }}
    >
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-center">
        SnapCraft
      </h1>
      <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-4 text-center">
        Image Generator
      </h3>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 w-full">
        <input
          type="text"
          placeholder="Enter a prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full sm:flex-1 border border-[#25d366] rounded-lg px-4 py-2 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-[#25d366]"
          style={{
            backgroundColor: isDark ? "#1A1B1F" : "#f2f2f2",
            color: isDark ? "#ffffff" : "#000000",
          }}
        />
        <button
          onClick={handleSubmit}
          className="bg-[#25d366] hover:bg-[#5fffc1] text-black font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:scale-105 w-full sm:w-auto"
        >
          Generate
        </button>
      </div>

      {loading && (
        <div className="w-full flex items-center justify-center mb-6">
          <div className="w-60 h-60 sm:w-72 sm:h-72 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-gray-800">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#25d366]"></div>
          </div>
        </div>
      )}

      {error && (
        <div className="text-center text-base text-red-500 mb-6">{error}</div>
      )}

      {imageUrl && (
        <div className="flex flex-col items-center justify-center mb-6 w-full">
          <img
            src={imageUrl}
            alt={prompt}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow-lg mt-4"
          />
        </div>
      )}
    </div>

  );
};

export default ImageGenerator;
