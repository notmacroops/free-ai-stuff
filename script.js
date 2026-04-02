// No need for DOMContentLoaded when using type="module"
const genBtn = document.getElementById('genBtn');
const promptInput = document.getElementById('promptInput');
const resultDiv = document.getElementById('result');

genBtn.addEventListener('click', async () => {
    const prompt = promptInput.value;
    if (!prompt) return alert("Enter a prompt!");

    resultDiv.innerHTML = '<p class="loading">🎨 Connecting to HF Router...</p>';

    try {
        // Updated 2026 Hugging Face Router URL
        const API_URL = "https://router.huggingface.co/hf-inference/v1/images/generations";
        
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": "Bearer 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", // Replace with your fresh token
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
            const errorText = await response.text();
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        
        // The Router API returns a JSON object with a URL
        const imageUrl = data.data[0].url;
        resultDiv.innerHTML = `<img src="${imageUrl}" alt="AI Result">`;

    } catch (err) {
        resultDiv.innerHTML = `<p style="color:red">❌ ${err.message}</p>`;
        console.error(err);
    }
});
