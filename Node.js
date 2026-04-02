const genBtn = document.getElementById('genBtn');
const promptInput = document.getElementById('promptInput');
const resultContainer = document.getElementById('result-container');

genBtn.addEventListener('click', async () => {
    const prompt = promptInput.value;
    if (!prompt) return alert("Please enter a prompt!");

    resultContainer.innerHTML = '<div class="loader">Loading...</div>';
    
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
            {
                headers: { 
                    // ↓↓↓ PUT YOUR TOKEN HERE ↓↓↓
                    Authorization: "Bearer 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", 
                    "Content-Type": "application/json" 
                },
                method: "POST",
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        if (!response.ok) throw new Error("API Error: Check your token or limit");

        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        
        resultContainer.innerHTML = `<img src="${imgUrl}" alt="AI Generated Image">`;
    } catch (error) {
        resultContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
});
