const genBtn = document.getElementById('genBtn');
const promptInput = document.getElementById('promptInput');
const statusText = document.getElementById('status');
const resultDiv = document.getElementById('result');

genBtn.addEventListener('click', async () => {
    const prompt = promptInput.value;
    if (!prompt) return alert("Please enter a prompt!");

    // UI Feedback
    genBtn.disabled = true;
    resultDiv.innerHTML = '<p class="status-msg">🎨 AI is thinking... (this takes ~10s)</p>';

    try {
        // NEW 2026 ROUTER ENDPOINT
        const API_URL = "https://router.huggingface.co/hf-inference/v1/images/generations";
        
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                // REPLACE THIS with your fresh token from HF Settings
                "Authorization": "Bearer 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", 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "black-forest-labs/FLUX.1-schnell",
                prompt: prompt,
                n: 1,
                size: "1024x1024"
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Generation failed. Check your token permissions.");
        }

        const data = await response.json();
        
        // The new API returns a URL in the 'data' array
        const imageUrl = data.data[0].url;
        resultDiv.innerHTML = `<img src="${imageUrl}" alt="AI Generated Result">`;

    } catch (err) {
        resultDiv.innerHTML = `<p style="color: #ff4d4d;">❌ Error: ${err.message}</p>`;
        console.error("Full Error Details:", err);
    } finally {
        genBtn.disabled = false;
    }
});
