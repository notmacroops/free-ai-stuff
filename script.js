document.addEventListener('DOMContentLoaded', () => {
    const genBtn = document.getElementById('genBtn');
    const promptInput = document.getElementById('promptInput');
    const resultContainer = document.getElementById('result-container');

    genBtn.addEventListener('click', async () => {
        const prompt = promptInput.value;
        if (!prompt) return alert("Please enter a prompt!");

        resultContainer.innerHTML = '<div class="loader">🎨 Requesting from New Router...</div>';
        
        try {
            // NEW 2026 ENDPOINT URL
            const url = "https://router.huggingface.co/hf-inference/v1/images/generations";

            const response = await fetch(url, {
                headers: { 
                    "Authorization": "Bearer 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", 
                    "Content-Type": "application/json" 
                },
                method: "POST",
                body: JSON.stringify({ 
                    model: "black-forest-labs/FLUX.1-schnell", // Model moved inside the body
                    prompt: prompt,
                    n: 1,
                    size: "1024x1024"
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Generation failed");
            }

            const data = await response.json();
            // The new API returns an OpenAI-style JSON with a URL
            const imgUrl = data.data[0].url; 
            
            resultContainer.innerHTML = `<img src="${imgUrl}" alt="AI Generated Image">`;
        } catch (error) {
            resultContainer.innerHTML = `<p style="color: #ff4d4d;">❌ ${error.message}</p>`;
            console.error("Full Error:", error);
        }
    });
});
