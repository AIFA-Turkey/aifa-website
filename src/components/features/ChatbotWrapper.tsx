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

    // 2. MOUNT CHECK
    useEffect(() => {
        setIsFullyMounted(true);
    }, []);

    // 3. INITIALIZE WEB COMPONENT
    // We use a ref to set properties directly to avoid React attribute/property conflicts.
    // This runs only on the client, preventing hydration mismatches.
    useEffect(() => {
        if (isFullyMounted && chatRef.current) {
            const el = chatRef.current as any;

            // Standard constraints
            el.style.width = '100%';
            el.style.height = '100%';

            // Configuration Props
            el.window_title = config.window_title;
            el.flow_id = config.flow_id;
            el.host_url = config.host_url;
            el.api_key = config.api_key;

            // Flags - explicitly setting as attributes or props
            el.setAttribute('start_open', 'true');
            el.setAttribute('online', 'true');

            // Apply Styling via JSON props if supported by this version
            // This was previously causing issues when passed as attributes
            try {
                el.chat_window_style = JSON.stringify({
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#0b1021',
                    color: '#ffffff'
                });
                // el.chat_trigger_style = ... (Not used since we have our own launcher)
            } catch (err) {
                console.error("Failed to apply styles to langflow-chat:", err);
            }
        }
    }, [isFullyMounted, config]);

    const toggleOpen = () => setIsOpen(!isOpen);

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
                        suppressHydrationWarning
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
                        suppressHydrationWarning
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
                        {/* CLOSE BUTTON (Absolute Overlay) */}
                        <button
                            onClick={toggleOpen}
                            onPointerDown={(e) => controls.start(e)}
                            className="absolute top-2 right-2 z-10 text-white/50 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-1 transition-colors backdrop-blur-sm"
                        >
                            <X size={20} />
                        </button>

                        {/* CONTENT AREA */}
                        <div className="flex-1 w-full h-full bg-[#0b1021]">
                            {/* 
                                RAW DOM INJECTION
                                Bypassing React's render for the web component to avoid
                                hydration mismatches and attribute conflicts.
                            */}
                            <div
                                className="w-full h-full block"
                                ref={(el) => {
                                    if (el && !el.hasChildNodes()) {
                                        // Construct the element string
                                        const styleConfig = {
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: '#0b1021',
                                            color: '#ffffff'
                                        };

                                        const chatElement = document.createElement('langflow-chat');

                                        // Set Attributes (Standard HTML)
                                        chatElement.setAttribute('window_title', config.window_title);
                                        chatElement.setAttribute('flow_id', config.flow_id);
                                        chatElement.setAttribute('host_url', config.host_url);
                                        chatElement.setAttribute('api_key', config.api_key);
                                        chatElement.setAttribute('start_open', 'true');
                                        chatElement.setAttribute('online', 'true');
                                        chatElement.style.width = '100%';
                                        chatElement.style.height = '100%';

                                        // Set Properties (Custom Element JS Props)
                                        (chatElement as any).window_title = config.window_title;
                                        (chatElement as any).flow_id = config.flow_id;
                                        (chatElement as any).host_url = config.host_url;
                                        (chatElement as any).api_key = config.api_key;

                                        // Append first
                                        el.appendChild(chatElement);

                                        // Set JSON property safely (pass OBJECT directly)
                                        try {
                                            (chatElement as any).chat_window_style = styleConfig;
                                        } catch (e) {
                                            console.warn("Could not set chat_window_style", e);
                                        }

                                        // Store ref to chat element if needed for cleanup?
                                        if (chatRef) {
                                            (chatRef as any).current = chatElement;
                                        }
                                    }
                                }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
