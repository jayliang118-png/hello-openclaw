// Hello OpenClaw - Single Page Application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Set current date and year
    setCurrentDate();
    setCurrentYear();
    
    // Initialize counter
    initializeCounter();
    
    // Add GitHub link handler
    setupGitHubLink();
    
    // Add animation on load
    animateElements();
    
    // Log initialization
    console.log('Hello OpenClaw SPA initialized successfully!');
    console.log('Repository: https://github.com/jayliang118-png/hello-openclaw');
}

// Set current date in the info section
function setCurrentDate() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    };
    const formattedDate = now.toLocaleDateString('en-US', options);
    document.getElementById('current-date').textContent = formattedDate;
}

// Set current year in footer
function setCurrentYear() {
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
}

// Counter functionality
function initializeCounter() {
    let counter = 0;
    const counterElement = document.getElementById('counter-value');
    const incrementBtn = document.getElementById('increment-btn');
    const decrementBtn = document.getElementById('decrement-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    // Update counter display
    function updateCounter() {
        counterElement.textContent = counter;
        
        // Add visual feedback based on counter value
        if (counter > 0) {
            counterElement.style.color = '#48bb78'; // Green for positive
            counterElement.style.borderColor = '#48bb78';
        } else if (counter < 0) {
            counterElement.style.color = '#f56565'; // Red for negative
            counterElement.style.borderColor = '#f56565';
        } else {
            counterElement.style.color = '#667eea'; // Blue for zero
            counterElement.style.borderColor = '#c3cfe2';
        }
        
        // Add pulse animation
        counterElement.classList.add('pulse');
        setTimeout(() => {
            counterElement.classList.remove('pulse');
        }, 300);
    }
    
    // Increment counter
    incrementBtn.addEventListener('click', function() {
        counter++;
        updateCounter();
        playClickSound('high');
    });
    
    // Decrement counter
    decrementBtn.addEventListener('click', function() {
        counter--;
        updateCounter();
        playClickSound('low');
    });
    
    // Reset counter
    resetBtn.addEventListener('click', function() {
        counter = 0;
        updateCounter();
        playClickSound('reset');
        
        // Show reset confirmation
        showNotification('Counter has been reset to 0!', 'info');
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case '+':
            case '=':
                if (event.shiftKey) {
                    event.preventDefault();
                    counter++;
                    updateCounter();
                    playClickSound('high');
                }
                break;
            case '-':
            case '_':
                if (event.shiftKey) {
                    event.preventDefault();
                    counter--;
                    updateCounter();
                    playClickSound('low');
                }
                break;
            case '0':
            case 'r':
            case 'R':
                if (event.ctrlKey) {
                    event.preventDefault();
                    counter = 0;
                    updateCounter();
                    playClickSound('reset');
                    showNotification('Counter reset with keyboard shortcut!', 'info');
                }
                break;
        }
    });
    
    // Initialize with zero
    updateCounter();
}

// Setup GitHub link with analytics
function setupGitHubLink() {
    const githubBtn = document.querySelector('.btn-github');
    
    githubBtn.addEventListener('click', function(event) {
        // Track click (in a real app, you might send this to analytics)
        console.log('GitHub repository link clicked');
        
        // You could add analytics here
        // Example: sendEventToAnalytics('github_link_click');
        
        // The link will open in new tab (target="_blank" in HTML)
        // We'll just log it for now
    });
}

// Simple sound effects using Web Audio API
function playClickSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Set frequency based on type
        switch(type) {
            case 'high':
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                break;
            case 'low':
                oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
                break;
            case 'reset':
                oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
                break;
            default:
                oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
        }
        
        // Configure volume
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        // Play the sound
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        // Fallback if Web Audio API is not supported
        console.log('Sound effect would play here');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'info' ? 'info-circle' : 'check-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'info' ? '#4299e1' : '#48bb78'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-family: 'Poppins', sans-serif;
    `;
    
    // Add keyframes for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .pulse {
            animation: pulse 0.3s ease;
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Animate elements on load
function animateElements() {
    // Animate feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Animate hero section
    const heroElements = document.querySelectorAll('.hero h2, .hero-text, .counter-section');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + (100 * index));
    });
}

// Add CSS for pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    .pulse {
        animation: pulse 0.3s ease;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pulseStyle);

// Export app info (for debugging/extension)
window.HelloOpenClawApp = {
    version: '1.0.0',
    repository: 'https://github.com/jayliang118-png/hello-openclaw',
    getCounterValue: function() {
        return parseInt(document.getElementById('counter-value').textContent);
    },
    resetCounter: function() {
        document.getElementById('reset-btn').click();
    }
};

// Log app info
console.log(`
╔══════════════════════════════════════════════════════╗
║         HELLO OPENCLAW SPA - READY TO GO!           ║
╠══════════════════════════════════════════════════════╣
║ Repository: https://github.com/jayliang118-png/      ║
║                    hello-openclaw                    ║
║                                                      ║
║ Features:                                            ║
║ • Interactive counter with keyboard shortcuts        ║
║ • Responsive design for all devices                  ║
║ • Animated elements on load                          ║
║ • GitHub integration ready                           ║
║ • Sound effects (where supported)                    ║
║ • Notification system                                ║
╚══════════════════════════════════════════════════════╝
`);