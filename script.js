// Main JavaScript functionality for BabyWise AI
class BabyWiseApp {
    constructor() {
        this.isRecording = false;
        this.mediaRecorder = null;
        this.recordingTimeout = null;
        this.callActive = false;
        this.isMuted = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.showWelcomeMessage();
    }
    
    setupEventListeners() {
        // Chat input enter key
        const messageInput = Utils.dom.getElementById('messageInput');
        if (messageInput) {
            Utils.event.on(messageInput, 'keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
        
        // File input change
        const fileInput = Utils.dom.getElementById('fileInput');
        if (fileInput) {
            Utils.event.on(fileInput, 'change', (e) => {
                this.handleFileSelection(e);
            });
        }
        
        // Voice recording click to stop
        const voiceRecording = Utils.dom.getElementById('voiceRecording');
        if (voiceRecording) {
            Utils.event.on(voiceRecording, 'click', () => {
                if (this.isRecording) {
                    this.stopVoiceRecording();
                }
            });
        }
    }
    
    showWelcomeMessage() {
        setTimeout(() => {
            this.addMessage(CONFIG.welcomeMessage, 'ai');
        }, 1000);
    }
    
    // Header visibility toggle
    toggleHeader(isHomePage) {
        const header = Utils.dom.getElementById('appHeader');
        if (isHomePage) {
            Utils.dom.removeClass(header, 'hidden');
        } else {
            Utils.dom.addClass(header, 'hidden');
        }
    }
    
    // Page Navigation
    showPage(page) {
        // Hide all pages
        Utils.dom.querySelectorAll('.page').forEach(p => Utils.dom.removeClass(p, 'active'));
        Utils.dom.querySelectorAll('.nav-item').forEach(n => Utils.dom.removeClass(n, 'active'));
        
        // Show selected page
        const pageElement = Utils.dom.getElementById(page + 'Page');
        if (pageElement) {
            Utils.dom.addClass(pageElement, 'active');
        }
        
        // Toggle header visibility
        this.toggleHeader(page === 'home');
        
        // Update active nav item
        const navItems = Utils.dom.querySelectorAll('.nav-item');
        const navIndex = CONFIG.navigation.findIndex(item => item.id === page);
        if (navIndex >= 0 && navItems[navIndex]) {
            Utils.dom.addClass(navItems[navIndex], 'active');
        }
    }
    
    // Feature Navigation
    showChatBot() {
        Utils.dom.querySelectorAll('.page').forEach(p => Utils.dom.removeClass(p, 'active'));
        Utils.dom.querySelectorAll('.nav-item').forEach(n => Utils.dom.removeClass(n, 'active'));
        
        const chatPage = Utils.dom.getElementById('chatPage');
        if (chatPage) {
            Utils.dom.addClass(chatPage, 'active');
        }
        
        const navItems = Utils.dom.querySelectorAll('.nav-item');
        if (navItems[1]) {
            Utils.dom.addClass(navItems[1], 'active');
        }
        
        this.toggleHeader(false);
    }
    
    showVideoCall() {
        Utils.dom.querySelectorAll('.page').forEach(p => Utils.dom.removeClass(p, 'active'));
        const videoPage = Utils.dom.getElementById('videoCallPage');
        if (videoPage) {
            Utils.dom.addClass(videoPage, 'active');
        }
        this.toggleHeader(false);
    }
    
    showHealthTracker() {
        Utils.dom.querySelectorAll('.page').forEach(p => Utils.dom.removeClass(p, 'active'));
        Utils.dom.querySelectorAll('.nav-item').forEach(n => Utils.dom.removeClass(n, 'active'));
        
        const trackerPage = Utils.dom.getElementById('healthTrackerPage');
        if (trackerPage) {
            Utils.dom.addClass(trackerPage, 'active');
        }
        
        const navItems = Utils.dom.querySelectorAll('.nav-item');
        if (navItems[2]) {
            Utils.dom.addClass(navItems[2], 'active');
        }
        
        this.toggleHeader(false);
    }
    
    showCryDecoder() {
        Utils.dom.querySelectorAll('.page').forEach(p => Utils.dom.removeClass(p, 'active'));
        const decoderPage = Utils.dom.getElementById('cryDecoderPage');
        if (decoderPage) {
            Utils.dom.addClass(decoderPage, 'active');
        }
        this.toggleHeader(false);
    }
    
    showCommunity() {
        Utils.dom.querySelectorAll('.page').forEach(p => Utils.dom.removeClass(p, 'active'));
        Utils.dom.querySelectorAll('.nav-item').forEach(n => Utils.dom.removeClass(n, 'active'));
        
        const communityPage = Utils.dom.getElementById('communityPage');
        if (communityPage) {
            Utils.dom.addClass(communityPage, 'active');
        }
        
        const navItems = Utils.dom.querySelectorAll('.nav-item');
        if (navItems[3]) {
            Utils.dom.addClass(navItems[3], 'active');
        }
        
        this.toggleHeader(false);
    }
    
    showSchemes() {
        Utils.dom.querySelectorAll('.page').forEach(p => Utils.dom.removeClass(p, 'active'));
        const schemesPage = Utils.dom.getElementById('schemesPage');
        if (schemesPage) {
            Utils.dom.addClass(schemesPage, 'active');
        }
        this.toggleHeader(false);
    }
    
    // File Upload Handler
    handleFileUpload() {
        const fileInput = Utils.dom.getElementById('fileInput');
        if (fileInput) {
            fileInput.click();
        }
    }
    
    handleFileSelection(e) {
        const files = e.target.files;
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileName = file.name;
                const fileType = file.type;
                
                // Get file icon
                const fileIcon = Utils.file.getFileIcon(fileType);
                
                // Add file message to chat
                this.addMessage(`${fileIcon} Uploaded: ${fileName}`, 'user');
            }
            
            // Simulate AI response
            setTimeout(() => {
                this.addTypingIndicator();
                setTimeout(() => {
                    this.removeTypingIndicator();
                    this.addMessage("I've received your file(s). How can I help you with this?", 'ai');
                }, 2000);
            }, 500);
        }
        
        // Clear the input
        e.target.value = '';
    }
    
    // Voice Input Handler
    handleVoiceInput() {
        if (!this.isRecording) {
            this.startVoiceRecording();
        } else {
            this.stopVoiceRecording();
        }
    }
    
    startVoiceRecording() {
        if (!Utils.browser.supports.webRTC()) {
            alert('Voice recording not supported in this browser.');
            return;
        }
        
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                this.isRecording = true;
                const voiceButton = Utils.dom.getElementById('voiceButton');
                const voiceRecording = Utils.dom.getElementById('voiceRecording');
                
                Utils.dom.addClass(voiceButton, 'active');
                Utils.dom.addClass(voiceRecording, 'active');
                
                // Set up MediaRecorder
                this.mediaRecorder = new MediaRecorder(stream);
                
                this.mediaRecorder.ondataavailable = (e) => {
                    console.log('Audio data available:', e.data);
                };
                
                this.mediaRecorder.onstop = () => {
                    stream.getTracks().forEach(track => track.stop());
                };
                
                this.mediaRecorder.start();
                
                // Auto-stop after configured duration
                this.recordingTimeout = setTimeout(() => {
                    if (this.isRecording) {
                        this.stopVoiceRecording();
                    }
                }, CONFIG.voiceRecording.maxDuration);
            })
            .catch(err => {
                console.error('Error accessing microphone:', err);
                alert('Unable to access microphone. Please check permissions.');
            });
    }
    
    stopVoiceRecording() {
        if (this.isRecording) {
            this.isRecording = false;
            const voiceButton = Utils.dom.getElementById('voiceButton');
            const voiceRecording = Utils.dom.getElementById('voiceRecording');
            
            Utils.dom.removeClass(voiceButton, 'active');
            Utils.dom.removeClass(voiceRecording, 'active');
            
            if (this.mediaRecorder) {
                this.mediaRecorder.stop();
            }
            
            if (this.recordingTimeout) {
                clearTimeout(this.recordingTimeout);
            }
            
            // Simulate voice-to-text conversion
            setTimeout(() => {
                this.addMessage(CONFIG.voiceRecording.sampleVoiceMessage, 'user');
                
                // Simulate AI response
                setTimeout(() => {
                    this.addTypingIndicator();
                    setTimeout(() => {
                        this.removeTypingIndicator();
                        this.addMessage("I heard your question about helping your baby sleep better. Here are some gentle techniques you can try...", 'ai');
                    }, 2000);
                }, 500);
            }, 1000);
        }
    }
    
    // Chat Functionality
    sendMessage() {
        const input = Utils.dom.getElementById('messageInput');
        if (!input) return;
        
        const message = input.value.trim();
        
        if (message) {
            this.addMessage(message, 'user');
            input.value = '';
            
            // Simulate AI typing
            setTimeout(() => {
                this.addTypingIndicator();
                setTimeout(() => {
                    this.removeTypingIndicator();
                    this.addAIResponse(message);
                }, 2000);
            }, 500);
        }
    }
    
    addMessage(text, sender) {
        const chatMessages = Utils.dom.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageRow = Utils.dom.createElement('div', { class: `message-row ${sender}` });
        
        if (sender === 'ai') {
            messageRow.innerHTML = `
                <div class="ai-avatar">🤖</div>
                <div class="message ai">${text}</div>
            `;
        } else {
            messageRow.innerHTML = `
                <div class="message user">${text}</div>
            `;
        }
        
        Utils.dom.appendChild(chatMessages, messageRow);
        Utils.animation.scrollToBottom(chatMessages);
        Utils.animation.fadeIn(messageRow);
    }
    
    addTypingIndicator() {
        const chatMessages = Utils.dom.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const typingRow = Utils.dom.createElement('div', { class: 'message-row typing-row' });
        typingRow.innerHTML = `
            <div class="ai-avatar">🤖</div>
            <div class="typing-indicator">
                <div class="typing-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        `;
        
        Utils.dom.appendChild(chatMessages, typingRow);
        Utils.animation.scrollToBottom(chatMessages);
    }
    
    removeTypingIndicator() {
        const typingRow = Utils.dom.querySelector('.typing-row');
        if (typingRow) {
            Utils.dom.removeElement(typingRow);
        }
    }
    
    addAIResponse(userMessage) {
        const response = CONFIG.responses[userMessage] || CONFIG.defaultResponse;
        this.addMessage(response, 'ai');
    }
    
    quickChat(topic) {
        const input = Utils.dom.getElementById('messageInput');
        if (input) {
            input.value = topic;
            this.sendMessage();
        }
    }
    
    // Video Call Functions
    startCall() {
        if (!this.callActive) {
            const videoStatus = Utils.dom.getElementById('videoStatus');
            if (videoStatus) {
                videoStatus.textContent = '📹 Connected to AI Nurse Assistant';
                this.callActive = true;
                setTimeout(() => {
                    videoStatus.textContent = '🤖 How can I help you today?';
                }, 2000);
            }
        }
    }
    
    endCall() {
        const videoStatus = Utils.dom.getElementById('videoStatus');
        if (videoStatus) {
            videoStatus.textContent = '📹 Call ended';
            this.callActive = false;
            setTimeout(() => {
                videoStatus.textContent = '📹 Tap to start video consultation';
            }, 2000);
        }
    }
    
    toggleMute() {
        this.isMuted = !this.isMuted;
        const muteButton = Utils.dom.querySelector('.video-btn.mute');
        if (muteButton) {
            muteButton.textContent = this.isMuted ? '🔇' : '🎤';
        }
    }
    
    // Health Tracker Functions
    showTrackerTab(tab) {
        Utils.dom.querySelectorAll('.tracker-tab').forEach(t => Utils.dom.removeClass(t, 'active'));
        Utils.dom.querySelectorAll('.tracker-content').forEach(c => Utils.dom.addClass(c, 'hidden'));
        
        const activeTab = Utils.dom.querySelector('.tracker-tab[onclick*="' + tab + '"]');
        if (activeTab) {
            Utils.dom.addClass(activeTab, 'active');
        }
        
        const content = Utils.dom.getElementById(tab + 'Tracker');
        if (content) {
            Utils.dom.removeClass(content, 'hidden');
        }
    }
    
    // Cry Decoder Functions
    recordCry() {
        alert('🎤 Recording started... (This would access the microphone in a real app)');
        setTimeout(() => {
            alert('📊 Analysis complete: Hunger cry detected. Your baby seems to be hungry.');
        }, 3000);
    }
    
    uploadCry() {
        alert('📁 Please select an audio file... (This would open file picker in a real app)');
    }
    
    // Community Functions
    shareExperience() {
        alert('🎤 Voice-to-text feature would be activated here for easy sharing');
    }
    
    // Government Schemes Functions
    applyScheme(scheme) {
        alert(`Redirecting to ${scheme} application portal...`);
    }
    
    findCenter() {
        alert('🗺️ Finding nearest Anganwadi centers based on your location...');
    }
    
    // Profile Functions
    editProfile() {
        alert('✏️ Edit Profile feature would open here');
    }
    
    babyProfile() {
        alert('👶 Baby Profile management would open here');
    }
    
    healthReports() {
        alert('📄 Health reports and medical history would be displayed here');
    }
    
    languageSettings() {
        alert('🌍 Language selection (Hindi, English, Tamil, Telugu, etc.) would be available here');
    }
    
    notifications() {
        alert('🔔 Notification settings and appointment reminders would be configured here');
    }
    
    helpSupport() {
        alert('❓ Help & Support section with FAQs and contact information would open here');
    }
}

// Global functions for onclick handlers
function showPage(page) {
    app.showPage(page);
}

function showChatBot() {
    app.showChatBot();
}

function showVideoCall() {
    app.showVideoCall();
}

function showHealthTracker() {
    app.showHealthTracker();
}

function showCryDecoder() {
    app.showCryDecoder();
}

function showCommunity() {
    app.showCommunity();
}

function showSchemes() {
    app.showSchemes();
}

function handleFileUpload() {
    app.handleFileUpload();
}

function handleVoiceInput() {
    app.handleVoiceInput();
}

function sendMessage() {
    app.sendMessage();
}

function quickChat(topic) {
    app.quickChat(topic);
}

function startCall() {
    app.startCall();
}

function endCall() {
    app.endCall();
}

function toggleMute() {
    app.toggleMute();
}

function showTrackerTab(tab) {
    app.showTrackerTab(tab);
}

function recordCry() {
    app.recordCry();
}

function uploadCry() {
    app.uploadCry();
}

function shareExperience() {
    app.shareExperience();
}

function applyScheme(scheme) {
    app.applyScheme(scheme);
}

function findCenter() {
    app.findCenter();
}

function editProfile() {
    app.editProfile();
}

function babyProfile() {
    app.babyProfile();
}

function healthReports() {
    app.healthReports();
}

function languageSettings() {
    app.languageSettings();
}

function notifications() {
    app.notifications();
}

function helpSupport() {
    app.helpSupport();
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', function() {
    app = new BabyWiseApp();
});