// Main JavaScript functionality for BabyWise AI
class BabyWiseApp {
    constructor() {
        this.isRecording = false;
        this.mediaRecorder = null;
        this.recordingTimeout = null;
        this.callActive = false;
        this.isMuted = false;
        this.cameraEnabled = true;
        
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
    
    showHealthReports() {
        Utils.dom.querySelectorAll('.page').forEach(p => Utils.dom.removeClass(p, 'active'));
        const healthReportsPage = Utils.dom.getElementById('healthReportsPage');
        if (healthReportsPage) {
            Utils.dom.addClass(healthReportsPage, 'active');
        }
        this.toggleHeader(false);
    }
    
    showJournalTracker() {
        Utils.dom.querySelectorAll('.page').forEach(p => Utils.dom.removeClass(p, 'active'));
        const journalTrackerPage = Utils.dom.getElementById('journalTrackerPage');
        if (journalTrackerPage) {
            Utils.dom.addClass(journalTrackerPage, 'active');
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
                <div class="ai-avatar">👨‍⚕️</div>
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
            <div class="ai-avatar">👨‍⚕️</div>
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
            const callBtn = Utils.dom.getElementById('callBtn');
            const callIcon = callBtn.querySelector('.btn-icon');
            const callLabel = callBtn.querySelector('.btn-label');
            
            if (videoStatus) {
                videoStatus.textContent = '📹 Connected to AI Nurse Assistant';
                this.callActive = true;
                
                // Update call button state
                Utils.dom.addClass(callBtn, 'calling');
                callIcon.textContent = '📞';
                callLabel.textContent = 'Connected';
                
                setTimeout(() => {
                    videoStatus.textContent = '👩‍⚕️ How can I help you today?';
                }, 2000);
            }
        }
    }
    
    endCall() {
        const videoStatus = Utils.dom.getElementById('videoStatus');
        const callBtn = Utils.dom.getElementById('callBtn');
        const callIcon = callBtn.querySelector('.btn-icon');
        const callLabel = callBtn.querySelector('.btn-label');
        
        if (videoStatus) {
            videoStatus.textContent = '📹 Call ended';
            this.callActive = false;
            
            // Reset call button state
            Utils.dom.removeClass(callBtn, 'calling');
            callIcon.textContent = '📞';
            callLabel.textContent = 'Call';
            
            setTimeout(() => {
                videoStatus.textContent = '📹 Tap to start video consultation';
            }, 2000);
        }
    }
    
    toggleMute() {
        this.isMuted = !this.isMuted;
        const muteBtn = Utils.dom.getElementById('muteBtn');
        const muteIcon = muteBtn.querySelector('.btn-icon');
        const muteLabel = muteBtn.querySelector('.btn-label');
        
        if (this.isMuted) {
            Utils.dom.addClass(muteBtn, 'muted');
            muteIcon.textContent = '🔇';
            muteLabel.textContent = 'Muted';
        } else {
            Utils.dom.removeClass(muteBtn, 'muted');
            muteIcon.textContent = '🎤';
            muteLabel.textContent = 'Mute';
        }
    }
    
    toggleCamera() {
        this.cameraEnabled = !this.cameraEnabled;
        const cameraBtn = Utils.dom.getElementById('cameraBtn');
        const cameraIcon = cameraBtn.querySelector('.btn-icon');
        const cameraLabel = cameraBtn.querySelector('.btn-label');
        
        if (this.cameraEnabled) {
            Utils.dom.removeClass(cameraBtn, 'disabled');
            cameraIcon.textContent = '📹';
            cameraLabel.textContent = 'Camera';
        } else {
            Utils.dom.addClass(cameraBtn, 'disabled');
            cameraIcon.textContent = '📷';
            cameraLabel.textContent = 'Off';
        }
    }
    
    // Baby Rash Demo Function
    showRashDemo() {
        const placeholder = Utils.dom.getElementById('videoPlaceholder');
        const demoContent = Utils.dom.getElementById('rashDemoContent');
        const videoStatus = Utils.dom.getElementById('videoStatus');
        const startBtn = Utils.dom.getElementById('startDemoBtn');
        const resetBtn = Utils.dom.getElementById('resetDemoBtn');
        
        if (placeholder && demoContent && videoStatus) {
            // Hide placeholder and show demo content
            Utils.dom.addClass(placeholder, 'hidden');
            Utils.dom.removeClass(demoContent, 'hidden');
            Utils.dom.addClass(demoContent, 'show');
            
            // Toggle buttons
            Utils.dom.addClass(startBtn, 'hidden');
            Utils.dom.removeClass(resetBtn, 'hidden');
            
            // Update video status
            videoStatus.textContent = '👩‍⚕️ Analyzing baby\'s skin condition...';
            
            // Simulate AI analysis progression
            setTimeout(() => {
                videoStatus.textContent = '🔍 Skin rash detected on both cheeks';
                this.showRashGuidance();
            }, 2000);
            
            setTimeout(() => {
                videoStatus.textContent = '👩‍⚕️ Providing treatment recommendations';
            }, 4000);
        }
    }
    
    resetDemo() {
        const placeholder = Utils.dom.getElementById('videoPlaceholder');
        const demoContent = Utils.dom.getElementById('rashDemoContent');
        const videoStatus = Utils.dom.getElementById('videoStatus');
        const startBtn = Utils.dom.getElementById('startDemoBtn');
        const resetBtn = Utils.dom.getElementById('resetDemoBtn');
        const responseText = Utils.dom.getElementById('aiResponse');
        
        if (placeholder && demoContent && videoStatus) {
            // Show placeholder and hide demo content
            Utils.dom.removeClass(placeholder, 'hidden');
            Utils.dom.addClass(demoContent, 'hidden');
            Utils.dom.removeClass(demoContent, 'show');
            
            // Toggle buttons
            Utils.dom.removeClass(startBtn, 'hidden');
            Utils.dom.addClass(resetBtn, 'hidden');
            
            // Reset video status
            videoStatus.textContent = '👩‍⚕️ Tap to start video consultation';
            
            // Reset AI response
            if (responseText) {
                responseText.textContent = 'I can see red rashes on your baby\'s cheeks. This could be eczema, contact dermatitis, or heat rash. Let me provide you with some guidance.';
            }
        }
    }
    
    showRashGuidance() {
        const responseText = Utils.dom.getElementById('aiResponse');
        if (responseText) {
            responseText.innerHTML = `
                <div class="guidance-steps">
                    <div class="guidance-step">
                        <span class="guidance-step-number">1.</span>
                        <strong>Immediate care:</strong> Gently clean the affected area with lukewarm water and pat dry
                    </div>
                    <div class="guidance-step">
                        <span class="guidance-step-number">2.</span>
                        <strong>Avoid irritants:</strong> Check for new soaps, lotions, or fabrics that might have caused the rash
                    </div>
                    <div class="guidance-step">
                        <span class="guidance-step-number">3.</span>
                        <strong>Monitor symptoms:</strong> Watch for spreading, fever, or worsening condition
                    </div>
                    <div class="guidance-step">
                        <span class="guidance-step-number">4.</span>
                        <strong>When to seek help:</strong> If rash persists for more than 24 hours or baby shows signs of discomfort
                    </div>
                    <div class="guidance-step">
                        <span class="guidance-step-number">5.</span>
                        <strong>Emergency signs:</strong> Seek immediate medical attention if there's fever, pus, or severe swelling
                    </div>
                </div>
            `;
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
    
    // Journal Tracker Functions
    addJournalEntry() {
        alert('📸 Camera and photo picker would open here to add a new memory');
    }
    
    // Hospital Finder Functions
    showHospitalFinder() {
        Utils.dom.querySelectorAll('.page').forEach(p => Utils.dom.removeClass(p, 'active'));
        const hospitalFinderPage = Utils.dom.getElementById('hospitalFinderPage');
        if (hospitalFinderPage) {
            Utils.dom.addClass(hospitalFinderPage, 'active');
        }
        this.toggleHeader(false);
        
        // Initialize hospital finder with all hospitals
        this.loadHospitals();
    }
    
    loadHospitals(filter = 'all', sortBy = 'distance') {
        const hospitalsList = Utils.dom.getElementById('hospitalsList');
        if (!hospitalsList) return;
        
        let hospitals = [...CONFIG.hospitals];
        
        // Apply filter
        if (filter !== 'all') {
            hospitals = hospitals.filter(hospital => hospital.type === filter);
        }
        
        // Apply sorting
        hospitals.sort((a, b) => {
            switch (sortBy) {
                case 'distance':
                    return a.distance - b.distance;
                case 'cost':
                    return a.cost.consultation - b.cost.consultation;
                case 'rating':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });
        
        // Clear existing hospitals
        hospitalsList.innerHTML = '';
        
        // Render hospitals
        hospitals.forEach(hospital => {
            const hospitalCard = this.createHospitalCard(hospital);
            Utils.dom.appendChild(hospitalsList, hospitalCard);
        });
    }
    
    createHospitalCard(hospital) {
        const card = Utils.dom.createElement('div', { class: 'hospital-card' });
        
        const ratingStars = '⭐'.repeat(Math.floor(hospital.rating));
        const servicesHTML = hospital.services.map(service => 
            `<span class="hospital-service">${service}</span>`
        ).join('');
        
        const costDisplay = hospital.cost.consultation === 0 ? 'Free' : `₹${hospital.cost.consultation}`;
        const vaccCostDisplay = hospital.cost.vaccination === 0 ? 'Free' : `₹${hospital.cost.vaccination}`;
        
        card.innerHTML = `
            <div class="hospital-header">
                <div class="hospital-info">
                    <div class="hospital-name">${hospital.name}</div>
                    <div class="hospital-type ${hospital.type}">${hospital.type}</div>
                    <div class="hospital-address">📍 ${hospital.address}</div>
                    <div class="hospital-distance">📏 ${hospital.distance} km away</div>
                </div>
            </div>
            
            <div class="hospital-stats">
                <div class="hospital-stat">
                    <span class="hospital-rating">
                        <span class="hospital-rating-stars">${ratingStars}</span>
                        <span>${hospital.rating}</span>
                    </span>
                </div>
                <div class="hospital-stat">👨‍⚕️ ${hospital.doctorsCount} doctors</div>
                <div class="hospital-stat">🏥 ${hospital.beds} beds</div>
                <div class="hospital-stat">🕒 ${hospital.workingHours}</div>
            </div>
            
            <div class="hospital-costs">
                <div class="hospital-cost">
                    <div class="hospital-cost-value">${costDisplay}</div>
                    <div>Consultation</div>
                </div>
                <div class="hospital-cost">
                    <div class="hospital-cost-value">${vaccCostDisplay}</div>
                    <div>Vaccination</div>
                </div>
                <div class="hospital-cost">
                    <div class="hospital-cost-value">₹${hospital.cost.emergency}</div>
                    <div>Emergency</div>
                </div>
            </div>
            
            <div class="hospital-services">
                ${servicesHTML}
            </div>
            
            <div class="hospital-actions">
                <button class="hospital-action primary" onclick="callHospital('${hospital.contactNumber}')">
                    📞 Call Now
                </button>
                <button class="hospital-action secondary" onclick="getDirections(${hospital.id})">
                    🗺️ Directions
                </button>
                <button class="hospital-action secondary" onclick="compareHospital(${hospital.id})">
                    ⚖️ Compare
                </button>
            </div>
        `;
        
        return card;
    }
    
    searchHospitals() {
        const searchInput = Utils.dom.getElementById('hospitalSearch');
        const searchTerm = searchInput?.value.toLowerCase() || '';
        
        if (!searchTerm) {
            this.loadHospitals();
            return;
        }
        
        const filteredHospitals = CONFIG.hospitals.filter(hospital => 
            hospital.name.toLowerCase().includes(searchTerm) ||
            hospital.address.toLowerCase().includes(searchTerm) ||
            hospital.services.some(service => service.toLowerCase().includes(searchTerm))
        );
        
        this.renderFilteredHospitals(filteredHospitals);
    }
    
    renderFilteredHospitals(hospitals) {
        const hospitalsList = Utils.dom.getElementById('hospitalsList');
        if (!hospitalsList) return;
        
        hospitalsList.innerHTML = '';
        
        if (hospitals.length === 0) {
            hospitalsList.innerHTML = `
                <div class="no-results">
                    <div style="text-align: center; padding: 40px; color: #666;">
                        <div style="font-size: 48px; margin-bottom: 20px;">🔍</div>
                        <div style="font-size: 18px; margin-bottom: 10px;">No hospitals found</div>
                        <div style="font-size: 14px;">Try a different search term</div>
                    </div>
                </div>
            `;
            return;
        }
        
        hospitals.forEach(hospital => {
            const hospitalCard = this.createHospitalCard(hospital);
            Utils.dom.appendChild(hospitalsList, hospitalCard);
        });
    }
    
    filterHospitals(type) {
        // Update active filter tab
        Utils.dom.querySelectorAll('.filter-tab').forEach(tab => 
            Utils.dom.removeClass(tab, 'active')
        );
        
        const activeTab = Utils.dom.querySelector(`.filter-tab[onclick*="'${type}'"]`);
        if (activeTab) {
            Utils.dom.addClass(activeTab, 'active');
        }
        
        // Load hospitals with filter
        const sortBy = Utils.dom.getElementById('sortBy')?.value || 'distance';
        this.loadHospitals(type, sortBy);
    }
    
    sortHospitals() {
        const sortBy = Utils.dom.getElementById('sortBy')?.value || 'distance';
        const activeFilter = Utils.dom.querySelector('.filter-tab.active')?.textContent.toLowerCase() || 'all';
        this.loadHospitals(activeFilter, sortBy);
    }
    
    callHospital(phoneNumber) {
        if (Utils.browser.supports.tel()) {
            window.location.href = `tel:${phoneNumber}`;
        } else {
            alert(`📞 Call ${phoneNumber} to contact the hospital`);
        }
    }
    
    getDirections(hospitalId) {
        const hospital = CONFIG.hospitals.find(h => h.id === hospitalId);
        if (hospital) {
            // In a real app, this would open maps
            alert(`🗺️ Opening directions to ${hospital.name}...\n\nAddress: ${hospital.address}\nDistance: ${hospital.distance} km`);
        }
    }
    
    compareHospital(hospitalId) {
        const hospital = CONFIG.hospitals.find(h => h.id === hospitalId);
        if (hospital) {
            // Find nearby hospitals for comparison
            const nearbyHospitals = CONFIG.hospitals
                .filter(h => h.id !== hospitalId)
                .sort((a, b) => a.distance - b.distance)
                .slice(0, 2);
            
            this.showComparison([hospital, ...nearbyHospitals]);
        }
    }
    
    showComparison(hospitals) {
        const comparisonSection = Utils.dom.getElementById('comparisonSection');
        const comparisonContent = Utils.dom.getElementById('comparisonContent');
        
        if (!comparisonSection || !comparisonContent) return;
        
        // Generate comparison content
        const comparisonHTML = this.generateComparisonHTML(hospitals);
        comparisonContent.innerHTML = comparisonHTML;
        
        // Show comparison modal
        comparisonSection.style.display = 'flex';
        
        // Add event listener for clicking outside to close
        comparisonSection.addEventListener('click', (e) => {
            if (e.target === comparisonSection) {
                this.closeComparison();
            }
        });
    }
    
    generateComparisonHTML(hospitals) {
        const hospitalsHTML = hospitals.map(hospital => `
            <div class="comparison-hospital">
                <div class="comparison-hospital-name">${hospital.name}</div>
                <div class="comparison-item">
                    <span class="comparison-item-label">Type:</span>
                    <span class="comparison-item-value">${hospital.type}</span>
                </div>
                <div class="comparison-item">
                    <span class="comparison-item-label">Distance:</span>
                    <span class="comparison-item-value">${hospital.distance} km</span>
                </div>
                <div class="comparison-item">
                    <span class="comparison-item-label">Rating:</span>
                    <span class="comparison-item-value">⭐ ${hospital.rating}</span>
                </div>
                <div class="comparison-item">
                    <span class="comparison-item-label">Consultation:</span>
                    <span class="comparison-item-value">${hospital.cost.consultation === 0 ? 'Free' : '₹' + hospital.cost.consultation}</span>
                </div>
                <div class="comparison-item">
                    <span class="comparison-item-label">Vaccination:</span>
                    <span class="comparison-item-value">${hospital.cost.vaccination === 0 ? 'Free' : '₹' + hospital.cost.vaccination}</span>
                </div>
                <div class="comparison-item">
                    <span class="comparison-item-label">Emergency:</span>
                    <span class="comparison-item-value">₹${hospital.cost.emergency}</span>
                </div>
                <div class="comparison-item">
                    <span class="comparison-item-label">Doctors:</span>
                    <span class="comparison-item-value">${hospital.doctorsCount}</span>
                </div>
                <div class="comparison-item">
                    <span class="comparison-item-label">Beds:</span>
                    <span class="comparison-item-value">${hospital.beds}</span>
                </div>
                <div class="comparison-item">
                    <span class="comparison-item-label">Hours:</span>
                    <span class="comparison-item-value">${hospital.workingHours}</span>
                </div>
            </div>
        `).join('');
        
        return `
            <div class="comparison-hospitals">
                ${hospitalsHTML}
            </div>
        `;
    }
    
    closeComparison() {
        const comparisonSection = Utils.dom.getElementById('comparisonSection');
        if (comparisonSection) {
            comparisonSection.style.display = 'none';
        }
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

function toggleCamera() {
    app.toggleCamera();
}

function showRashDemo() {
    app.showRashDemo();
}

function resetDemo() {
    app.resetDemo();
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

function showHealthReports() {
    app.showHealthReports();
}

function showJournalTracker() {
    app.showJournalTracker();
}

function addJournalEntry() {
    app.addJournalEntry();
}

function showHospitalFinder() {
    app.showHospitalFinder();
}

function searchHospitals() {
    app.searchHospitals();
}

function filterHospitals(type) {
    app.filterHospitals(type);
}

function sortHospitals() {
    app.sortHospitals();
}

function callHospital(phoneNumber) {
    app.callHospital(phoneNumber);
}

function getDirections(hospitalId) {
    app.getDirections(hospitalId);
}

function compareHospital(hospitalId) {
    app.compareHospital(hospitalId);
}

function closeComparison() {
    app.closeComparison();
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', function() {
    app = new BabyWiseApp();
});