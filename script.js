// Wrap everything in a check to make sure the HTML is ready
document.addEventListener('DOMContentLoaded', () => {
    const genBtn = document.getElementById('genBtn');
    const promptInput = document.getElementById('promptInput');
    const resultContainer = document.getElementById('result-container');

    genBtn.addEventListener('click', async () => {
        const prompt = promptInput.value;
        if (!prompt) return alert("Please enter a prompt!");

        // Update UI to show we are starting
        resultContainer.innerHTML = '<div class="loader">🚀 Initializing...</div>';
        
        async function query(data) {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
                {
                    headers: { 
                        Authorization: "Bearer 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", 
                        "Content-Type": "application/json" 
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );

            // HANDLE LOADING STATUS
            if (response.status === 503) {
                const result = await response.json();
                resultContainer.innerHTML = `<div class="loader">⏳ Model is waking up... Estimated wait: ${Math.round(result.estimated_time)}s</div>`;
                // Wait 5 seconds and try again automatically
                await new Promise(resolve => setTimeout(resolve, 5000));
                return query(data);
            }

            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
            
            return await response.blob();
        }

        try {
            resultContainer.innerHTML = '<div class="loader">🎨 Generating your image...</div>';
            const blob = await query({ inputs: prompt });
            const imgUrl = URL.createObjectURL(blob);
            resultContainer.innerHTML = `<img src="${imgUrl}" alt="AI Generated Image">`;
        } catch (error) {
            resultContainer.innerHTML = `<p style="color: #ff4d4d;">❌ Error: ${error.message}</p>`;
            console.error(error);
        }
    });
});
