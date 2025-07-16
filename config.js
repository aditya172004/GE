// Configuration data for BabyWise AI
const CONFIG = {
    // AI Response templates
    responses: {
        'Sleep Help': "Here are some gentle sleep training methods:\n\n• **Ferber Method**: Progressive waiting periods\n• **Chair Method**: Gradual distance increase\n• **No Tears Method**: Gentle, comfort-focused approach\n\nEach method works differently for different babies. What feels right for your parenting style?",
        'Feeding Guide': "Feeding guidelines for your baby:\n\n• **0-6 months**: Exclusive breastfeeding\n• **6+ months**: Introduce solid foods gradually\n• **Signs of hunger**: Rooting, sucking motions\n• **Feeding frequency**: Every 2-3 hours\n\nWould you like specific advice for your baby's age?",
        'Development': "Development milestones to watch for:\n\n• **0-3 months**: Smiling, head control\n• **3-6 months**: Rolling, sitting support\n• **6-9 months**: Crawling, standing\n• **9-12 months**: Walking, first words\n\nEvery baby develops at their own pace!",
        'Emergency': "For medical emergencies:\n\n• **Call 108**: Emergency medical services\n• **High fever**: Above 100.4°F (38°C)\n• **Difficulty breathing**: Seek immediate help\n• **Unusual crying**: Persistent, high-pitched\n\nI can help find nearby hospitals if needed."
    },

    // Default AI response
    defaultResponse: "I understand your concern. Based on your baby's situation, I'd recommend consulting with your pediatrician for personalized advice. I can also help you find nearby healthcare facilities or government schemes that might be helpful.",

    // Welcome message
    welcomeMessage: "Welcome to BabyWise! I'm here to help you with all your parenting questions. You can ask me about feeding, sleeping, development milestones, or any other concerns you have about your baby.",

    // App configuration
    app: {
        name: "BabyWise AI",
        subtitle: "Your smart parenting companion",
        version: "4.0"
    },

    // Navigation items
    navigation: [
        { id: 'home', icon: '🏠', label: 'Home' },
        { id: 'chat', icon: '💬', label: 'Chat' },
        { id: 'healthTracker', icon: '📊', label: 'Tracker' },
        { id: 'community', icon: '👥', label: 'Community' },
        { id: 'profile', icon: '👤', label: 'Profile' }
    ],

    // Feature cards for home page
    features: [
        {
            id: 'chat',
            icon: '💬',
            title: 'AI Chat',
            description: 'Get instant answers to your parenting questions',
            action: 'showChatBot'
        },
        {
            id: 'video',
            icon: '📹',
            title: 'Video Consult',
            description: 'Instant video consultation with AI nurse',
            action: 'showVideoCall'
        },
        {
            id: 'tracker',
            icon: '📊',
            title: 'Health Tracker',
            description: 'Track baby\'s growth and milestones',
            action: 'showHealthTracker'
        },
        {
            id: 'decoder',
            icon: '🍼',
            title: 'Cry Decoder',
            description: 'Understand what your baby needs',
            action: 'showCryDecoder'
        },
        {
            id: 'community',
            icon: '👥',
            title: 'Community',
            description: 'Connect with other parents',
            action: 'showCommunity'
        },
        {
            id: 'schemes',
            icon: '🏛️',
            title: 'Gov Schemes',
            description: 'Available government benefits',
            action: 'showSchemes'
        }
    ],

    // Quick actions for chat
    quickActions: [
        '😴 Sleep Help',
        '🍼 Feeding Guide',
        '👶 Development',
        '🚨 Emergency'
    ],

    // Tracker data
    trackerData: {
        baby: [
            {
                icon: '🍼',
                title: 'First Feeding',
                description: 'Track feeding times and amounts',
                status: 'completed'
            },
            {
                icon: '😴',
                title: 'Sleep Pattern',
                description: 'Monitor sleep cycles and duration',
                status: 'pending'
            },
            {
                icon: '💉',
                title: 'Vaccination',
                description: 'Next: DPT vaccine due in 2 weeks',
                status: 'pending'
            }
        ],
        mother: [
            {
                icon: '🥗',
                title: 'Nutrition',
                description: 'Daily nutritional requirements',
                status: 'completed'
            },
            {
                icon: '🧘',
                title: 'Exercise',
                description: 'Postpartum recovery exercises',
                status: 'pending'
            }
        ]
    },

    // Community posts
    communityPosts: [
        {
            id: 1,
            author: 'Priya Sharma',
            avatar: '👩',
            time: '2 hours ago',
            content: 'My 8-month-old finally started crawling! So exciting to see these milestones. Any tips for baby-proofing the house?',
            likes: 12,
            comments: 5
        },
        {
            id: 2,
            author: 'Raj Patel',
            avatar: '👨',
            time: '5 hours ago',
            content: 'सहारा आंगनवाड़ी केंद्र में निःशुल्क टीकाकरण शिविर आयोजित किया गया। सभी माताओं को इसका लाभ उठाना चाहिए।',
            likes: 8,
            comments: 3
        }
    ],

    // Government schemes
    schemes: [
        {
            id: 'PMMVY',
            title: 'Pradhan Mantri Matru Vandana Yojana',
            description: 'Cash incentive of ₹5,000 for pregnant and lactating mothers for the first living child.',
            buttonText: 'Apply Now'
        },
        {
            id: 'JSY',
            title: 'Janani Suraksha Yojana',
            description: 'Cash assistance for institutional delivery and transportation support.',
            buttonText: 'Apply Now'
        },
        {
            id: 'ANGANWADI',
            title: 'Anganwadi Services',
            description: 'Free immunization, health check-ups, and nutrition services at nearby centers.',
            buttonText: 'Find Center'
        },
        {
            id: 'POSHAN',
            title: 'Poshan Abhiyaan',
            description: 'National nutrition mission providing supplementary nutrition for children and mothers.',
            buttonText: 'Learn More'
        }
    ],

    // Profile options
    profileOptions: [
        {
            id: 'editProfile',
            icon: '✏️',
            text: 'Edit Profile',
            action: 'editProfile'
        },
        {
            id: 'babyProfile',
            icon: '👶',
            text: 'Baby Profile',
            action: 'babyProfile'
        },
        {
            id: 'healthReports',
            icon: '📄',
            text: 'Health Reports',
            action: 'healthReports'
        },
        {
            id: 'languageSettings',
            icon: '🌍',
            text: 'Language Settings',
            action: 'languageSettings'
        },
        {
            id: 'notifications',
            icon: '🔔',
            text: 'Notifications',
            action: 'notifications'
        },
        {
            id: 'helpSupport',
            icon: '❓',
            text: 'Help & Support',
            action: 'helpSupport'
        }
    ],

    // File type icons
    fileIcons: {
        image: '🖼️',
        audio: '🎵',
        pdf: '📄',
        default: '📄'
    },

    // Voice recording settings
    voiceRecording: {
        maxDuration: 30000, // 30 seconds
        sampleVoiceMessage: "🎤 Voice message: How can I help my baby sleep better?"
    },

    // Emergency contacts
    emergency: {
        number: '108',
        description: 'Emergency medical services'
    }
};

// Export for use in other files
window.CONFIG = CONFIG;