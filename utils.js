// Utility functions for BabyWise AI
const Utils = {
    // DOM manipulation utilities
    dom: {
        // Get element by ID
        getElementById: (id) => document.getElementById(id),
        
        // Get elements by class name
        getElementsByClass: (className) => document.getElementsByClassName(className),
        
        // Get elements by selector
        querySelector: (selector) => document.querySelector(selector),
        
        // Get all elements by selector
        querySelectorAll: (selector) => document.querySelectorAll(selector),
        
        // Add class to element
        addClass: (element, className) => {
            if (element) element.classList.add(className);
        },
        
        // Remove class from element
        removeClass: (element, className) => {
            if (element) element.classList.remove(className);
        },
        
        // Toggle class on element
        toggleClass: (element, className) => {
            if (element) element.classList.toggle(className);
        },
        
        // Check if element has class
        hasClass: (element, className) => {
            return element ? element.classList.contains(className) : false;
        },
        
        // Create element
        createElement: (tagName, attributes = {}, textContent = '') => {
            const element = document.createElement(tagName);
            
            // Set attributes
            Object.keys(attributes).forEach(key => {
                element.setAttribute(key, attributes[key]);
            });
            
            // Set text content
            if (textContent) {
                element.textContent = textContent;
            }
            
            return element;
        },
        
        // Append child to parent
        appendChild: (parent, child) => {
            if (parent && child) parent.appendChild(child);
        },
        
        // Remove element
        removeElement: (element) => {
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
    },

    // Animation utilities
    animation: {
        // Fade in animation
        fadeIn: (element, duration = 300) => {
            if (!element) return;
            
            element.style.opacity = '0';
            element.style.transform = 'translateY(10px)';
            element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 10);
        },
        
        // Scroll to bottom of element
        scrollToBottom: (element) => {
            if (element) {
                element.scrollTop = element.scrollHeight;
            }
        },
        
        // Smooth scroll to element
        scrollToElement: (element) => {
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    },

    // String utilities
    string: {
        // Capitalize first letter
        capitalize: (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        
        // Truncate string
        truncate: (str, length = 50) => {
            return str.length > length ? str.substring(0, length) + '...' : str;
        },
        
        // Clean string for display
        clean: (str) => {
            return str.trim().replace(/\s+/g, ' ');
        },
        
        // Format time
        formatTime: (date) => {
            const now = new Date();
            const diff = now - date;
            const minutes = Math.floor(diff / 60000);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            
            if (minutes < 1) return 'Just now';
            if (minutes < 60) return `${minutes}m ago`;
            if (hours < 24) return `${hours}h ago`;
            if (days < 7) return `${days}d ago`;
            return date.toLocaleDateString();
        }
    },

    // File utilities
    file: {
        // Get file icon based on type
        getFileIcon: (fileType) => {
            const config = window.CONFIG;
            if (fileType.startsWith('image/')) {
                return config.fileIcons.image;
            } else if (fileType.startsWith('audio/')) {
                return config.fileIcons.audio;
            } else if (fileType.includes('pdf')) {
                return config.fileIcons.pdf;
            }
            return config.fileIcons.default;
        },
        
        // Format file size
        formatFileSize: (bytes) => {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },
        
        // Check if file is valid
        isValidFile: (file, allowedTypes = []) => {
            if (!file) return false;
            if (allowedTypes.length === 0) return true;
            return allowedTypes.some(type => file.type.includes(type));
        }
    },

    // Browser utilities
    browser: {
        // Check if browser supports feature
        supports: {
            webRTC: () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
            fileAPI: () => !!(window.File && window.FileReader && window.FileList && window.Blob),
            localStorage: () => {
                try {
                    localStorage.setItem('test', 'test');
                    localStorage.removeItem('test');
                    return true;
                } catch (e) {
                    return false;
                }
            }
        },
        
        // Get browser info
        getBrowserInfo: () => {
            const ua = navigator.userAgent;
            const browsers = {
                chrome: /chrome/i.test(ua),
                firefox: /firefox/i.test(ua),
                safari: /safari/i.test(ua),
                edge: /edge/i.test(ua),
                ie: /msie/i.test(ua)
            };
            
            for (const [browser, isMatch] of Object.entries(browsers)) {
                if (isMatch) return browser;
            }
            return 'unknown';
        },
        
        // Check if mobile device
        isMobile: () => {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
    },

    // Storage utilities
    storage: {
        // Local storage wrapper
        set: (key, value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('Storage error:', e);
                return false;
            }
        },
        
        get: (key, defaultValue = null) => {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                console.error('Storage error:', e);
                return defaultValue;
            }
        },
        
        remove: (key) => {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.error('Storage error:', e);
                return false;
            }
        },
        
        clear: () => {
            try {
                localStorage.clear();
                return true;
            } catch (e) {
                console.error('Storage error:', e);
                return false;
            }
        }
    },

    // Event utilities
    event: {
        // Add event listener
        on: (element, event, handler) => {
            if (element && handler) {
                element.addEventListener(event, handler);
            }
        },
        
        // Remove event listener
        off: (element, event, handler) => {
            if (element && handler) {
                element.removeEventListener(event, handler);
            }
        },
        
        // Trigger custom event
        trigger: (element, eventName, data = {}) => {
            if (element) {
                const event = new CustomEvent(eventName, { detail: data });
                element.dispatchEvent(event);
            }
        },
        
        // Prevent default and stop propagation
        stop: (event) => {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
    },

    // Debounce utility
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle utility
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Random utilities
    random: {
        // Generate random ID
        generateId: () => {
            return Math.random().toString(36).substr(2, 9);
        },
        
        // Generate random number
        number: (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        
        // Pick random item from array
        pick: (array) => {
            return array[Math.floor(Math.random() * array.length)];
        }
    },

    // Validation utilities
    validate: {
        // Check if email is valid
        email: (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        
        // Check if phone number is valid (Indian format)
        phone: (phone) => {
            const re = /^[6-9]\d{9}$/;
            return re.test(phone.replace(/\D/g, ''));
        },
        
        // Check if string is not empty
        notEmpty: (str) => {
            return str && str.trim().length > 0;
        },
        
        // Check if number is in range
        inRange: (num, min, max) => {
            return num >= min && num <= max;
        }
    },

    // Format utilities
    format: {
        // Format currency (Indian Rupees)
        currency: (amount) => {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR'
            }).format(amount);
        },
        
        // Format date
        date: (date, options = {}) => {
            return new Intl.DateTimeFormat('en-IN', options).format(date);
        },
        
        // Format phone number
        phone: (phone) => {
            const cleaned = phone.replace(/\D/g, '');
            const match = cleaned.match(/^(\d{5})(\d{5})$/);
            return match ? `${match[1]} ${match[2]}` : phone;
        }
    },

    // URL utilities
    url: {
        // Get query parameter
        getParam: (name) => {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        },
        
        // Set query parameter
        setParam: (name, value) => {
            const url = new URL(window.location);
            url.searchParams.set(name, value);
            window.history.replaceState({}, '', url);
        },
        
        // Remove query parameter
        removeParam: (name) => {
            const url = new URL(window.location);
            url.searchParams.delete(name);
            window.history.replaceState({}, '', url);
        }
    },

    // Performance utilities
    performance: {
        // Measure execution time
        measure: (fn, name = 'function') => {
            const start = performance.now();
            const result = fn();
            const end = performance.now();
            console.log(`${name} executed in ${end - start}ms`);
            return result;
        },
        
        // Request animation frame wrapper
        raf: (callback) => {
            return requestAnimationFrame(callback);
        },
        
        // Cancel animation frame
        cancelRaf: (id) => {
            cancelAnimationFrame(id);
        }
    }
};

// Export for use in other files
window.Utils = Utils;