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
      Under Development 
    </div>
  );
};

export default ImageGenerator;
