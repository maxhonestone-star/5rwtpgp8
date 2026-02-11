// Prompt Templates
const promptTemplates = {
    hook: {
        title: "Hook Ideas",
        templates: [
            "🔥 STOP! You won't believe what happens when you try this {topic} hack!",
            "⚠️ Warning: This {topic} secret will change everything you know!",
            "I spent 100 hours testing {topic} methods so you don't have to...",
            "Everyone is doing {topic} WRONG! Here's the RIGHT way...",
            "What if I told you {topic} could be 10x easier than you think?",
            "The {topic} trick nobody talks about (until now)!",
            "This {topic} hack saved me hours - and it will for you too!",
            "POV: You just discovered the ultimate {topic} strategy"
        ]
    },
    script: {
        title: "Video Script",
        templates: [
            `Hey everyone! 👋

Today I'm going to show you the best way to {topic}.

[Hook - First 5 seconds]
{topic} is something that confuses a lot of people, but I'm going to make it super simple.

[Introduction - 10-15 seconds]
My name is [Your Name] and I help people master {topic}. I've been doing this for [X] years and today I'm sharing everything I know.

[Main Content - 45-60 seconds]
Here are the key steps to {topic}:

Step 1: [First step] - This is crucial because [reason]
Step 2: [Second step] - Don't skip this!
Step 3: [Third step] - The secret sauce!

[Bonus Tip - 10 seconds]
Pro tip: Most people forget about [bonus tip], but this will make your results 10x better.

[CTA - 10 seconds]
If you found this helpful, smash that like button and subscribe for more {topic} content. Drop a comment if you want me to cover [related topic] next!

Thanks for watching! 👋`
        ]
    },
    caption: {
        title: "Caption",
        templates: [
            `{topic} game strong! 💪

I've been working on this for [X] days and the results are INSANE.

Here's what I learned:
✅ [Lesson 1]
✅ [Lesson 2]
✅ [Lesson 3]

Save this for later! 🔖

Double tap if you love {topic}! ❤️

.{yourhashtag1} .{yourhashtag2}

#topic #{topic} #motivation #success #growth`,
            `POV: You finally understand {topic} 😎

This changed everything for me...

The secret is simple:
1. [Tip 1]
2. [Tip 2] 
3. [Tip 3]

Tag someone who needs to see this! 👇

#topic #viral #trending #fyp #growth`
        ]
    },
    title: {
        title: "Video Title",
        templates: [
            `{topic} Tutorial: The Ultimate Guide (2024)`,
            `I Tried {topic} For 30 Days - Here's What Happened`,
            `{topic}: Beginner to Expert in 10 Minutes`,
            `The TRUTH About {topic} Nobody Tells You`,
            `10 {topic} Hacks That Actually Work`,
            `How to Master {topic} (Even If You're a Beginner)`,
            `Why Everyone is Talking About {topic}`,
            `{topic}: What You NEED to Know`
        ]
    },
    hashtags: {
        title: "Hashtag Suggestions",
        templates: [
            `{topic.toLowerCase()}
#{topic.replace(/\s+/g, '').toLowerCase()}
#{topic.replace(/\s+/g, '').toLowerCase()}tips
#{topic.replace(/\s+/g, '').toLowerCase()}hacks
#{topic.replace(/\s+/g, '').toLowerCase()}tutorial
#{topic.replace(/\s+/g, '').toLowerCase()}guide
#viral
#fyp
#trending
#explorepage
#reels
#foryou`
        ]
    },
    thumbnail: {
        title: "Thumbnail Ideas",
        templates: [
            "Create a thumbnail with:",
            "- Bold, centered text: '🔥 STOP! {topic}'",
            "- Your face making a shocked expression",
            "- Bright gradient background (orange/blue)",
            "- Add arrow pointing to main element",
            "- Use emoji: 😱, ⚡, 💥",
            "- High contrast colors",
            "- 3-5 words maximum"
        ]
    },
    content: {
        title: "Content Ideas",
        templates: [
            `Here are 10 {topic} content ideas:

1. Beginner's Guide to {topic}
2. Common {topic} Mistakes (and How to Fix Them)
3. {topic} Tips from Experts
4. My {topic} Journey (Storytime)
5. {topic} Trends to Watch
6. {topic} Tools I Can't Live Without
7. Q&A: Everything You Need to Know About {topic}
8. {topic} Challenges (Try This!)
9. Behind the Scenes: My {topic} Process
10. {topic} Success Stories

Pick one and start creating! 🚀`
        ]
    },
    cta: {
        title: "Call-to-Action",
        templates: [
            "👉 Like this video if you learned something new!",
            "📌 Save this for later reference!",
            "💬 Comment below with your thoughts on {topic}!",
            "🔔 Subscribe for more {topic} content!",
            "👥 Share this with a friend who needs to see it!",
            "❓ What {topic} topic should I cover next?",
            "👍 Hit that like button if this helped you!",
            "🔗 Check the description for more {topic} resources!"
        ]
    }
};

// State
let state = {
    history: JSON.parse(localStorage.getItem('promptHistory') || '[]'),
    darkMode: localStorage.getItem('darkMode') === 'true',
    generatedPrompt: '',
    generatedImage: null
};

// DOM Elements
const elements = {
    darkModeToggle: document.getElementById('darkModeToggle'),
    tabs: document.querySelectorAll('.tab'),
    sections: document.querySelectorAll('.section'),
    imageTabs: document.querySelectorAll('.image-tab'),
    imageSections: document.querySelectorAll('.image-section'),
    promptForm: document.getElementById('promptForm'),
    promptOutput: document.getElementById('promptOutput'),
    promptText: document.getElementById('promptText'),
    copyPrompt: document.getElementById('copyPrompt'),
    clearPrompt: document.getElementById('clearPrompt'),
    imageForm: document.getElementById('imageForm'),
    canvas: document.getElementById('imageCanvas'),
    canvasContainer: document.querySelector('.canvas-container'),
    imageOutput: document.getElementById('imageOutput'),
    imagePreview: document.getElementById('imagePreview'),
    downloadImage: document.getElementById('downloadImage'),
    clearImage: document.getElementById('clearImage'),
    uploadImage: document.getElementById('uploadImage'),
    uploadedImageContainer: document.getElementById('uploadedImageContainer'),
    uploadedImage: document.getElementById('uploadedImage'),
    analyzeImage: document.getElementById('analyzeImage'),
    styleOutput: document.getElementById('styleOutput'),
    styleText: document.getElementById('styleText'),
    copyStyle: document.getElementById('copyStyle'),
    historyList: document.getElementById('historyList'),
    clearHistory: document.getElementById('clearHistory'),
    fontSize: document.getElementById('fontSize'),
    fontSizeValue: document.getElementById('fontSizeValue')
};

// Initialize
function init() {
    applyDarkMode();
    renderHistory();
    setupEventListeners();
    setupFontSizeSlider();
}

// Dark Mode
function applyDarkMode() {
    if (state.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        elements.darkModeToggle.querySelector('span').textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        elements.darkModeToggle.querySelector('span').textContent = '🌙';
    }
}

function toggleDarkMode() {
    state.darkMode = !state.darkMode;
    localStorage.setItem('darkMode', state.darkMode);
    applyDarkMode();
}

// Event Listeners
function setupEventListeners() {
    // Dark Mode Toggle
    elements.darkModeToggle.addEventListener('click', toggleDarkMode);

    // Tabs
    elements.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchTab(tabName);
        });
    });

    // Image Tabs
    elements.imageTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.imagetab;
            switchImageTab(tabName);
        });
    });

    // Prompt Form
    elements.promptForm.addEventListener('submit', handlePromptSubmit);

    // Copy Prompt
    elements.copyPrompt.addEventListener('click', copyPromptToClipboard);

    // Clear Prompt
    elements.clearPrompt.addEventListener('click', clearPrompt);

    // Image Form
    elements.imageForm.addEventListener('submit', handleImageSubmit);

    // Download Image
    elements.downloadImage.addEventListener('click', downloadGeneratedImage);

    // Clear Image
    elements.clearImage.addEventListener('click', clearImageForm);

    // Upload Image
    elements.uploadImage.addEventListener('change', handleImageUpload);

    // Analyze Image
    elements.analyzeImage.addEventListener('click', analyzeImageStyle);

    // Copy Style
    elements.copyStyle.addEventListener('click', copyStyleToClipboard);

    // Clear History
    elements.clearHistory.addEventListener('click', clearHistory);
}

// Font Size Slider
function setupFontSizeSlider() {
    elements.fontSize.addEventListener('input', (e) => {
        elements.fontSizeValue.textContent = e.target.value + 'px';
    });
}

// Tab Switching
function switchTab(tabName) {
    elements.tabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    elements.sections.forEach(section => {
        if (tabName === 'prompt') {
            section.classList.toggle('active', section.id === 'promptSection');
        } else {
            section.classList.toggle('active', section.id === 'imageSection');
        }
    });
}

function switchImageTab(tabName) {
    elements.imageTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.imagetab === tabName);
    });

    elements.imageSections.forEach(section => {
        section.classList.toggle('active', section.id === tabName);
    });
}

// Prompt Generation
function handlePromptSubmit(e) {
    e.preventDefault();

    const category = document.getElementById('category').value;
    const topic = document.getElementById('topic').value;
    const tone = document.getElementById('tone').value;
    const platform = document.getElementById('platform').value;

    if (!category || !topic) {
        alert('Please select a category and enter a topic!');
        return;
    }

    const template = promptTemplates[category];
    const prompt = generatePrompt(category, template, topic, tone, platform);

    state.generatedPrompt = prompt;
    elements.promptText.innerHTML = `<p>${prompt.replace(/\n/g, '<br>')}</p>`;

    // Save to history
    saveToHistory(category, prompt);

    // Show output
    elements.promptOutput.style.display = 'block';
}

function generatePrompt(category, template, topic, tone, platform) {
    const prompts = template.templates;
    const randomIndex = Math.floor(Math.random() * prompts.length);
    let prompt = prompts[randomIndex];

    // Replace {topic} with actual topic
    prompt = prompt.replace(/{topic}/g, topic);

    // Add tone-specific modifications
    let tonePrefix = '';
    switch(tone) {
        case 'professional':
            tonePrefix = `[Tone: Professional & Authoritative] `;
            break;
        case 'funny':
            tonePrefix = `[Tone: Funny & Entertaining] `;
            break;
        case 'educational':
            tonePrefix = `[Tone: Educational & Informative] `;
            break;
        case 'inspiring':
            tonePrefix = `[Tone: Inspiring & Motivational] `;
            break;
        case 'controversial':
            tonePrefix = `[Tone: Thought-Provoking & Controversial] `;
            break;
        default:
            tonePrefix = `[Tone: Casual & Friendly] `;
    }

    // Add platform-specific notes
    let platformNote = '';
    if (platform === 'youtube') {
        platformNote = '\n\n[Optimized for YouTube: Longer format, detailed explanation]';
    } else if (platform === 'tiktok') {
        platformNote = '\n\n[Optimized for TikTok: Short, snappy, engaging]';
    }

    return tonePrefix + '\n\n' + prompt + platformNote;
}

function copyPromptToClipboard() {
    if (state.generatedPrompt) {
        navigator.clipboard.writeText(state.generatedPrompt).then(() => {
            alert('Prompt copied to clipboard! 📋');
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy prompt');
        });
    }
}

function clearPrompt() {
    elements.promptForm.reset();
    elements.promptText.innerHTML = '<p class="placeholder">Generated prompt will appear here...</p>';
    state.generatedPrompt = '';
}

// Image Generation
function handleImageSubmit(e) {
    e.preventDefault();

    const text = document.getElementById('imageText').value;
    const template = document.getElementById('template').value;
    const backgroundColor = document.getElementById('backgroundColor').value;
    const textColor = document.getElementById('textColor').value;
    const fontSize = parseInt(document.getElementById('fontSize').value);

    if (!text) {
        alert('Please enter text for the image!');
        return;
    }

    generateImage(text, template, backgroundColor, textColor, fontSize);
}

function generateImage(text, template, backgroundColor, textColor, fontSize) {
    const canvas = elements.canvas;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, backgroundColor);
    gradient.addColorStop(1, adjustColor(backgroundColor, -30));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Template-specific styling
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    switch(template) {
        case 'thumbnail-youtube':
            drawYouTubeThumbnail(ctx, text, textColor, fontSize, canvas);
            break;
        case 'thumbnail-tiktok':
            drawTikTokCover(ctx, text, textColor, fontSize, canvas);
            break;
        case 'quote':
            drawQuoteCard(ctx, text, textColor, fontSize, canvas);
            break;
        case 'announcement':
            drawAnnouncement(ctx, text, textColor, fontSize, canvas);
            break;
        case 'minimal':
            drawMinimal(ctx, text, textColor, fontSize, canvas);
            break;
    }

    // Show canvas
    elements.canvasContainer.style.display = 'block';

    // Convert to image preview
    const dataURL = canvas.toDataURL('image/png');
    elements.imagePreview.src = dataURL;
    elements.imageOutput.style.display = 'block';

    state.generatedImage = dataURL;
}

function drawYouTubeThumbnail(ctx, text, color, fontSize, canvas) {
    // Add border
    ctx.strokeStyle = color;
    ctx.lineWidth = 20;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Add glow effect
    ctx.shadowColor = color;
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw text
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = color;
    
    // Word wrap
    const words = text.split(' ');
    let line = '';
    let y = canvas.height / 2;
    const lineHeight = fontSize * 1.2;
    
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > canvas.width - 100 && n > 0) {
            ctx.fillText(line, canvas.width / 2, y);
            line = words[n] + ' ';
            y -= lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, canvas.width / 2, y);

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
}

function drawTikTokCover(ctx, text, color, fontSize, canvas) {
    // Add diagonal stripes
    ctx.strokeStyle = adjustColor(color, -40);
    ctx.lineWidth = 10;
    for (let i = -canvas.height; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + canvas.height, canvas.height);
        ctx.stroke();
    }

    // Draw text
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = color;
    
    const words = text.split(' ');
    let line = '';
    let y = canvas.height / 2;
    const lineHeight = fontSize * 1.2;
    
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > canvas.width - 100 && n > 0) {
            ctx.fillText(line, canvas.width / 2, y);
            line = words[n] + ' ';
            y -= lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, canvas.width / 2, y);
}

function drawQuoteCard(ctx, text, color, fontSize, canvas) {
    // Add quote marks
    ctx.font = `${fontSize * 3}px Georgia, serif`;
    ctx.fillStyle = adjustColor(color, -50);
    ctx.globalAlpha = 0.3;
    ctx.fillText('"', 100, 200);
    ctx.fillText('"', canvas.width - 100, canvas.height - 200);
    ctx.globalAlpha = 1;

    // Draw text
    ctx.font = `italic ${fontSize}px Georgia, serif`;
    ctx.fillStyle = color;
    
    const words = text.split(' ');
    let line = '';
    let y = canvas.height / 2;
    const lineHeight = fontSize * 1.3;
    
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > canvas.width - 120 && n > 0) {
            ctx.fillText(line, canvas.width / 2, y);
            line = words[n] + ' ';
            y -= lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, canvas.width / 2, y);
}

function drawAnnouncement(ctx, text, color, fontSize, canvas) {
    // Add banner
    ctx.fillStyle = color;
    ctx.fillRect(0, canvas.height - 150, canvas.width, 150);

    // Draw main text
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = adjustColor(color, -100);
    
    const words = text.split(' ');
    let line = '';
    let y = canvas.height / 2 - 50;
    const lineHeight = fontSize * 1.2;
    
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > canvas.width - 100 && n > 0) {
            ctx.fillText(line, canvas.width / 2, y);
            line = words[n] + ' ';
            y -= lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, canvas.width / 2, y);

    // Add "NEW!" badge
    ctx.font = `bold 60px Arial, sans-serif`;
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.9;
    ctx.fillText('NEW!', canvas.width / 2, canvas.height / 2 + 100);
    ctx.globalAlpha = 1;
}

function drawMinimal(ctx, text, color, fontSize, canvas) {
    // Simple, clean design
    ctx.font = `${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = color;
    
    const words = text.split(' ');
    let line = '';
    let y = canvas.height / 2;
    const lineHeight = fontSize * 1.2;
    
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > canvas.width - 100 && n > 0) {
            ctx.fillText(line, canvas.width / 2, y);
            line = words[n] + ' ';
            y -= lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, canvas.width / 2, y);

    // Add subtle border
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.globalAlpha = 0.3;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
    ctx.globalAlpha = 1;
}

function adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function downloadGeneratedImage() {
    if (state.generatedImage) {
        const link = document.createElement('a');
        link.download = 'prompt-image.png';
        link.href = state.generatedImage;
        link.click();
    }
}

function clearImageForm() {
    elements.imageForm.reset();
    elements.canvasContainer.style.display = 'none';
    elements.imageOutput.style.display = 'none';
    elements.fontSizeValue.textContent = '48px';
    state.generatedImage = null;
}

// Image Analysis
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            elements.uploadedImage.src = event.target.result;
            elements.uploadedImageContainer.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function analyzeImageStyle() {
    if (!elements.uploadedImage.src || elements.uploadedImage.src === '') {
        alert('Please upload an image first!');
        return;
    }

    // Analyze the uploaded image (simplified analysis)
    const analysis = analyzeImageProperties();
    
    elements.styleText.innerHTML = `<p>${analysis.replace(/\n/g, '<br>')}</p>`;
    elements.styleOutput.style.display = 'block';
}

function analyzeImageProperties() {
    const img = elements.uploadedImage;
    
    // Create canvas to analyze image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);

    // Get average color
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let r = 0, g = 0, b = 0;
    
    for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
    }
    
    const pixelCount = data.length / 4;
    r = Math.round(r / pixelCount);
    g = Math.round(g / pixelCount);
    b = Math.round(b / pixelCount);
    
    const dominantColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

    // Generate style description
    let analysis = `🎨 Style Analysis:\n\n`;
    analysis += `📐 Image Dimensions: ${canvas.width} x ${canvas.height}\n`;
    analysis += `🎨 Dominant Color: ${dominantColor}\n`;
    analysis += `📊 Color Tone: ${getColorTone(r, g, b)}\n\n`;
    analysis += `💡 Style Recommendations:\n`;
    analysis += `- Use ${dominantColor} as background color\n`;
    analysis += `- Pair with ${getContrastColor(r, g, b)} for text\n`;
    analysis += `- Font size: 48-64px for readability\n`;
    analysis += `- Template: YouTube Thumbnail or Quote Card would work well\n\n`;
    analysis += `✨ Output Style:\n`;
    analysis += `Modern gradient background with bold typography`;
    
    return analysis;
}

function getColorTone(r, g, b) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    
    if (max === min) return 'Neutral / Grayscale';
    if (max === r) return g > b ? 'Warm / Red-Orange' : 'Vibrant / Red-Purple';
    if (max === g) return r > b ? 'Warm / Yellow-Green' : 'Cool / Green-Teal';
    return r > g ? 'Vibrant / Purple-Pink' : 'Cool / Blue';
}

function getContrastColor(r, g, b) {
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000 (Black)' : '#FFFFFF (White)';
}

function copyStyleToClipboard() {
    const styleText = elements.styleText.textContent;
    if (styleText && styleText !== 'Style analysis will appear here...') {
        navigator.clipboard.writeText(styleText).then(() => {
            alert('Style analysis copied to clipboard! 📋');
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy style analysis');
        });
    }
}

// History Management
function saveToHistory(category, prompt) {
    const historyItem = {
        id: Date.now(),
        category: category,
        content: prompt,
        timestamp: new Date().toLocaleString()
    };
    
    state.history.unshift(historyItem);
    
    // Keep only last 50 items
    if (state.history.length > 50) {
        state.history = state.history.slice(0, 50);
    }
    
    localStorage.setItem('promptHistory', JSON.stringify(state.history));
    renderHistory();
}

function renderHistory() {
    if (state.history.length === 0) {
        elements.historyList.innerHTML = '<p class="placeholder">No history yet...</p>';
        return;
    }

    elements.historyList.innerHTML = state.history.map(item => `
        <div class="history-item" data-id="${item.id}">
            <span class="category">${promptTemplates[item.category]?.title || item.category}</span>
            <div class="timestamp">${item.timestamp}</div>
            <div class="content">${item.content.substring(0, 100)}...</div>
        </div>
    `).join('');

    // Add click handlers to history items
    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = parseInt(item.dataset.id);
            const historyItem = state.history.find(h => h.id === id);
            if (historyItem) {
                elements.promptText.innerHTML = `<p>${historyItem.content.replace(/\n/g, '<br>')}</p>`;
                state.generatedPrompt = historyItem.content;
                elements.promptOutput.style.display = 'block';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
        state.history = [];
        localStorage.removeItem('promptHistory');
        renderHistory();
    }
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registered');
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// Initialize App
document.addEventListener('DOMContentLoaded', init);