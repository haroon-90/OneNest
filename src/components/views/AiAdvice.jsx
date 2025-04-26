import React, { useState } from 'react';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateImage = async (prompt) => {
    const apiKey = "API_TOKEN";
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
    <div className="flex flex-col items-center justify-center bg-[#202021] text-white p-6 rounded-lg">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
        SnapCraft
      </h1>
      <h3 className='font-bold mb-4 text-center'>Image Generator</h3>

      <div className="flex items-center justify-center gap-4 mb-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter a prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 border-1 border-[#25d366] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25d366]"
        />
        <button
          onClick={handleSubmit}
          className="bg-[#25d366] hover:bg-[#5fffc1] text-black font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:scale-105"
        >
          Generate
        </button>
      </div>

      {loading && (
        <div className="text-center text-lg text-gray-300 mb-6">
        <div className='loading-img w-[50vh] h-[50vh] rounded-lg shadow-lg mt-6 flex items-center justify-center'>
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#25d366]"></div>
        </div>
        </div>
      )}

      {error && (
        <div className="text-center text-lg text-red-500 mb-6">
          {error}
        </div>
      )}

      {imageUrl && (
        <div className="flex flex-col items-center justify-center">
          <img
            src={imageUrl}
            alt={prompt}
            className="max-w-[50vh] h-auto rounded-lg shadow-lg mt-6"
          />
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
