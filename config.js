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
        },
        {
            id: 'healthReports',
            icon: '📋',
            title: 'Health Reports',
            description: 'View past health reports and medical history',
            action: 'showHealthReports'
        },
        {
            id: 'journalTracker',
            icon: '📸',
            title: 'Growth Journal',
            description: 'Capture your baby\'s growth journey with photos',
            action: 'showJournalTracker'
        },
        {
            id: 'hospitalFinder',
            icon: '🏥',
            title: 'Nearest Hospital',
            description: 'Find nearby hospitals and vaccination centers',
            action: 'showHospitalFinder'
        }
    ],

    // Hospital finder data
    hospitals: [
        {
            id: 1,
            name: 'Government General Hospital',
            type: 'government',
            address: '123 Medical Street, Delhi',
            distance: 0.8,
            contactNumber: '+91-11-2345-6789',
            rating: 4.2,
            cost: {
                consultation: 50,
                vaccination: 0,
                emergency: 100
            },
            services: ['Emergency', 'Pediatrics', 'Vaccination', 'Maternity'],
            facilities: ['24/7 Emergency', 'Pediatric ICU', 'Vaccination Center', 'Ambulance'],
            doctorsCount: 15,
            beds: 200,
            workingHours: '24/7'
        },
        {
            id: 2,
            name: 'City Children\'s Hospital',
            type: 'private',
            address: '456 Health Avenue, Delhi',
            distance: 1.2,
            contactNumber: '+91-11-9876-5432',
            rating: 4.8,
            cost: {
                consultation: 800,
                vaccination: 300,
                emergency: 2000
            },
            services: ['Emergency', 'Pediatrics', 'Vaccination', 'Neonatal Care'],
            facilities: ['NICU', 'Pediatric Surgery', 'Vaccination Center', 'Pharmacy'],
            doctorsCount: 25,
            beds: 120,
            workingHours: '24/7'
        },
        {
            id: 3,
            name: 'Metro Vaccination Center',
            type: 'vaccination',
            address: '789 Wellness Road, Delhi',
            distance: 0.5,
            contactNumber: '+91-11-1111-2222',
            rating: 4.5,
            cost: {
                consultation: 200,
                vaccination: 150,
                emergency: 500
            },
            services: ['Vaccination', 'Pediatrics', 'Health Checkup'],
            facilities: ['Vaccination Center', 'Child Health Clinic', 'Pharmacy'],
            doctorsCount: 8,
            beds: 20,
            workingHours: '9 AM - 6 PM'
        },
        {
            id: 4,
            name: 'Apollo Children\'s Hospital',
            type: 'private',
            address: '321 Medical Complex, Delhi',
            distance: 2.1,
            contactNumber: '+91-11-3333-4444',
            rating: 4.9,
            cost: {
                consultation: 1200,
                vaccination: 500,
                emergency: 3000
            },
            services: ['Emergency', 'Pediatrics', 'Vaccination', 'Specialized Care'],
            facilities: ['Pediatric ICU', 'NICU', 'Vaccination Center', 'Specialized Units'],
            doctorsCount: 40,
            beds: 180,
            workingHours: '24/7'
        },
        {
            id: 5,
            name: 'District Health Center',
            type: 'government',
            address: '654 Public Health Lane, Delhi',
            distance: 1.8,
            contactNumber: '+91-11-5555-6666',
            rating: 3.8,
            cost: {
                consultation: 30,
                vaccination: 0,
                emergency: 50
            },
            services: ['Emergency', 'Pediatrics', 'Vaccination', 'Maternity'],
            facilities: ['Emergency Ward', 'Vaccination Center', 'Maternity Ward', 'Pharmacy'],
            doctorsCount: 12,
            beds: 150,
            workingHours: '8 AM - 8 PM'
        },
        {
            id: 6,
            name: 'Fortis Children\'s Clinic',
            type: 'private',
            address: '987 Premium Health Plaza, Delhi',
            distance: 2.8,
            contactNumber: '+91-11-7777-8888',
            rating: 4.7,
            cost: {
                consultation: 1000,
                vaccination: 400,
                emergency: 2500
            },
            services: ['Emergency', 'Pediatrics', 'Vaccination', 'Specialized Care'],
            facilities: ['Pediatric Emergency', 'Vaccination Center', 'Diagnostic Lab', 'Pharmacy'],
            doctorsCount: 30,
            beds: 100,
            workingHours: '24/7'
        },
        {
            id: 7,
            name: 'Community Vaccination Hub',
            type: 'vaccination',
            address: '147 Community Center, Delhi',
            distance: 0.3,
            contactNumber: '+91-11-9999-0000',
            rating: 4.3,
            cost: {
                consultation: 100,
                vaccination: 50,
                emergency: 200
            },
            services: ['Vaccination', 'Health Checkup', 'Consultation'],
            facilities: ['Vaccination Center', 'Health Clinic', 'Waiting Area'],
            doctorsCount: 5,
            beds: 10,
            workingHours: '10 AM - 5 PM'
        },
        {
            id: 8,
            name: 'Max Super Speciality Hospital',
            type: 'private',
            address: '258 Super Speciality Road, Delhi',
            distance: 3.5,
            contactNumber: '+91-11-2222-3333',
            rating: 4.9,
            cost: {
                consultation: 1500,
                vaccination: 600,
                emergency: 4000
            },
            services: ['Emergency', 'Pediatrics', 'Vaccination', 'Super Speciality'],
            facilities: ['Pediatric ICU', 'NICU', 'Vaccination Center', 'Advanced Diagnostics'],
            doctorsCount: 50,
            beds: 300,
            workingHours: '24/7'
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
    },

    // Baby rash consultation demo data
    rashDemo: {
        title: 'Baby Skin Rash Analysis',
        description: 'AI-powered skin condition assessment',
        possibleCauses: [
            'Eczema (atopic dermatitis)',
            'Contact dermatitis',
            'Heat rash (miliaria)',
            'Seborrheic dermatitis',
            'Allergic reaction'
        ],
        immediateSteps: [
            'Gently clean the affected area with lukewarm water and pat dry',
            'Check for new soaps, lotions, or fabrics that might have caused the rash',
            'Watch for spreading, fever, or worsening condition',
            'If rash persists for more than 24 hours or baby shows signs of discomfort',
            'Seek immediate medical attention if there\'s fever, pus, or severe swelling'
        ],
        emergencySignals: [
            'High fever (above 101°F/38.3°C)',
            'Widespread rash covering large body areas',
            'Pus or fluid drainage',
            'Difficulty breathing or swallowing',
            'Severe swelling or blistering'
        ]
    },

    // Health Reports dummy data
    healthReports: [
        {
            id: 1,
            date: '2024-01-15',
            type: 'Routine Checkup',
            doctor: 'Dr. Sarah Johnson',
            summary: 'Normal growth and development. Weight: 7.2kg, Height: 68cm',
            recommendations: 'Continue current feeding schedule. Next appointment in 2 months.',
            icon: '🩺'
        },
        {
            id: 2,
            date: '2024-02-20',
            type: 'Vaccination',
            doctor: 'Dr. Mike Chen',
            summary: 'DPT vaccine administered. No adverse reactions observed.',
            recommendations: 'Monitor for fever. Next vaccination due in 6 weeks.',
            icon: '💉'
        },
        {
            id: 3,
            date: '2024-03-10',
            type: 'Nutrition Assessment',
            doctor: 'Dr. Emily Davis',
            summary: 'Healthy weight gain. Transitioning to solid foods well.',
            recommendations: 'Introduce new foods gradually. Increase iron-rich foods.',
            icon: '🥗'
        },
        {
            id: 4,
            date: '2024-03-25',
            type: 'Development Check',
            doctor: 'Dr. Sarah Johnson',
            summary: 'Meeting all milestones. Excellent motor skills development.',
            recommendations: 'Continue tummy time. Encourage crawling activities.',
            icon: '👶'
        }
    ],

    // Personal Journal Tracker dummy data
    journalEntries: [
        {
            id: 1,
            date: '2024-01-01',
            title: 'First New Year',
            photo: '👶',
            description: 'Baby\'s first New Year celebration! So tiny and precious.',
            milestone: 'First Holiday',
            age: '2 months'
        },
        {
            id: 2,
            date: '2024-01-20',
            title: 'First Smile',
            photo: '😊',
            description: 'Today baby gave us the most beautiful smile! Heart melted.',
            milestone: 'Social Development',
            age: '2.5 months'
        },
        {
            id: 3,
            date: '2024-02-14',
            title: 'Valentine\'s Day',
            photo: '💕',
            description: 'Our little valentine looking adorable in red outfit.',
            milestone: 'Growing Up',
            age: '3 months'
        },
        {
            id: 4,
            date: '2024-02-28',
            title: 'Rolling Over',
            photo: '🤸',
            description: 'First time rolling from back to tummy! So proud!',
            milestone: 'Motor Development',
            age: '3.5 months'
        },
        {
            id: 5,
            date: '2024-03-15',
            title: 'Sitting Up',
            photo: '🪑',
            description: 'Learning to sit up with support. Getting stronger every day!',
            milestone: 'Physical Development',
            age: '4 months'
        },
        {
            id: 6,
            date: '2024-03-30',
            title: 'First Tooth',
            photo: '🦷',
            description: 'The first tiny tooth appeared! Growing up so fast.',
            milestone: 'Teething',
            age: '4.5 months'
        }
    ]
};

// Export for use in other files
window.CONFIG = CONFIG;