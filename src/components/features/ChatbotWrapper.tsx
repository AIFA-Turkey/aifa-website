'use client';

import React, { useRef, useEffect, useState } from 'react';
import { GripVertical, MessageCircle, X } from 'lucide-react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';

interface ChatbotConfig {
    window_title: string;
    flow_id: string;
    host_url: string;
    api_key: string;
}

// Custom Element Interface
interface MyCustomElement extends HTMLElement {
    container?: ShadowRoot; // Some versions expose this
    // standard shadowRoot is on HTMLElement
}

export default function ChatbotWrapper({ config }: { config: ChatbotConfig }) {
    const chatRef = useRef<HTMLElement>(null);
    const controls = useDragControls();

    // 1. STATE: Default to CLOSED (Icon visible)
    const [isOpen, setIsOpen] = useState(false);
    const [isFullyMounted, setIsFullyMounted] = useState(false);

    // Initial mount check
    useEffect(() => {
        setIsFullyMounted(true);
    }, []);

    const toggleOpen = () => setIsOpen(!isOpen);

    // 2. SHADOW DOM LOGIC: Only runs when `isOpen` is true and component is rendered
    useEffect(() => {
        if (!isOpen || !chatRef.current) return;

        const el = chatRef.current as MyCustomElement;

        console.log("[ChatbotWrapper] Window opened. Initializing...");

        // B. Robust Initialization
        const initialize = async () => {
            // Wait for script to register the component
            await customElements.whenDefined('langflow-chat');

            console.log("[ChatbotWrapper] Custom element defined. Checking for Shadow Root...");

            let attempts = 0;
            const initInterval = setInterval(() => {
                attempts++;
                // Check both standard and proprietary properties
                // @ts-ignore
                const root = el.shadowRoot || el.container;

                if (root) {
                    // Check if we already injected to avoid duplicates
                    if (!root.querySelector('#injected-chatbot-styles')) {
                        console.log("[ChatbotWrapper] Shadow root found. Injecting styles.");

                        // C. INJECT CSS
                        const style = document.createElement('style');
                        style.id = 'injected-chatbot-styles';
                        style.textContent = `
                            /* 1. HIDE INTERNAL TRIGGER (Visual only, keep it essentially there for logic) */
                            .cl-trigger {
                                opacity: 0 !important;
                                width: 1px !important;
                                height: 1px !important;
                                pointer-events: none !important;
                                position: absolute !important;
                                bottom: 0 !important;
                                right: 0 !important;
                                overflow: hidden !important;
                            }
    
                            /* 2. FIT INTERNAL WINDOW */
                            .cl-chat-window {
                                position: absolute !important;
                                inset: 0 !important; /* Forces top:0, left:0, right:0, bottom:0 */
                                width: 100% !important;
                                height: 100% !important;
                                max-height: none !important;
                                max-width: none !important;
                                margin: 0 !important;
                                
                                /* Reset Appearance */
                                border-radius: 0 !important;
                                box-shadow: none !important;
                                background-color: transparent !important;
                                
                                /* Ensure Visibility */
                                transform: none !important; 
                                opacity: 1 !important;
                                z-index: 10 !important;
                                
                                /* Layout */
                                display: flex !important;
                                flex-direction: column !important;
                                box-sizing: border-box !important;
                            }
                            
                            /* Force inner content to fit */
                            .cl-window {
                                width: 100% !important;
                                height: 100% !important;
                                border-radius: 0 !important;
                                box-shadow: none !important;
                                box-sizing: border-box !important;
                            }
                            
                            /* Remove spacing/padding from the window container if present */
                            /* Some versions have a padding wrapper */
                            .cl-modal-window {
                                 padding: 0 !important;
                                 margin: 0 !important;
                                 width: 100% !important;
                                 height: 100% !important;
                            }
                        `;
                        root.appendChild(style);
                    }

                    // D. SYNC INTERNAL STATE
                    const trigger = root.querySelector('.cl-trigger') as HTMLElement;
                    const chatWindow = root.querySelector('.cl-chat-window');

                    if (trigger) {
                        // If we see the trigger but NO chat window (or chat window is hidden/scaled down)
                        // We must click the trigger.
                        const isClosed = !chatWindow ||
                            chatWindow.classList.contains('cl-scale-0') ||
                            getComputedStyle(chatWindow).display === 'none';

                        if (isClosed) {
                            console.log("[ChatbotWrapper] Internal state seems closed. Triggering open...");
                            const oldPointerEvents = trigger.style.pointerEvents;
                            trigger.style.pointerEvents = 'auto';
                            trigger.click();
                            trigger.style.pointerEvents = oldPointerEvents;
                        } else {
                            // If it's open, we can stop polling once we're sure styles are stuck
                            // But let's keep polling for a bit just to be safe, or clear it.
                            // We'll clear it after a few successful checks or just rely on the layout.
                            clearInterval(initInterval);
                        }
                    }
                } else if (attempts > 50) {
                    // Stop trying after 5 seconds to generate less noise
                    clearInterval(initInterval);
                }
            }, 100);
        };

        initialize();

        // No simple cleanup for the async path, but the interval clears itself.
        // We could add a mounted check inside the async function if needed.
        return () => { }; // Cleanup handled internally

    }, [isOpen, config]);

    if (!isFullyMounted) return null;

    return (
        <motion.div
            drag
            dragListener={false}
            dragControls={controls}
            dragMomentum={false}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed z-[9999]"
            style={{
                right: 20,
                bottom: 20,
                touchAction: 'none'
            }}
        >
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    /* --- LAUNCHER BUTTON --- */
                    <motion.button
                        key="launcher"
                        // suppressHydrationWarning
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleOpen}
                        onPointerDown={(e) => controls.start(e)}
                        className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-cyan-500/50 text-white transition-all cursor-grab active:cursor-grabbing"
                    >
                        <MessageCircle size={28} />
                    </motion.button>
                ) : (
                    /* --- CHAT WINDOW CONTAINER --- */
                    <motion.div
                        key="window"
                        // suppressHydrationWarning
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="flex flex-col shadow-2xl rounded-lg overflow-hidden border border-white/10 bg-[#0b1021]"
                        style={{
                            width: '400px',
                            height: '600px',
                            maxHeight: '80vh',
                            maxWidth: '90vw',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {/* HEADER */}
                        <div
                            onPointerDown={(e) => controls.start(e)}
                            className="bg-[#1a1f3c] p-3 flex justify-between items-center cursor-move border-b border-white/5 select-none shrink-0"
                            style={{ height: '50px' }}
                        >
                            <div className="flex items-center gap-2 text-white/70">
                                <GripVertical size={16} />
                                <span className="text-sm font-medium">Chat</span>
                            </div>
                            <button
                                onClick={toggleOpen}
                                className="text-white/50 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* CONTENT AREA */}
                        {/* This relative container is where we mount existing element */}
                        <div className="flex-1 relative w-full h-full bg-[#0b1021] overflow-hidden">
                            {/* React Element for Custom Component */}
                            {React.createElement('langflow-chat', {
                                ref: chatRef,
                                className: 'w-full h-full',
                                window_title: config.window_title,
                                flow_id: config.flow_id,
                                host_url: config.host_url,
                                api_key: config.api_key,
                                style: {
                                    // These props might be ignored by Shadow DOM, but good to have
                                    width: '100%',
                                    height: '100%',
                                }
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
