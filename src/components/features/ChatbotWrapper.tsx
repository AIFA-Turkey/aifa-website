'use client';

import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatbotConfig {
    window_title: string;
    flow_id: string;
    host_url: string;
    api_key: string;
}

// Some builds keep a reference to a closed shadow root.
interface LangflowElement extends HTMLElement {
    container?: ShadowRoot;
    _shadowRoot?: ShadowRoot;
    _root?: ShadowRoot;
    _container?: ShadowRoot;
    __aifaShadow?: ShadowRoot;
}

export default function ChatbotWrapper({ config }: { config: ChatbotConfig }) {
    // 1. STATE: Default to CLOSED (Icon visible)
    const [isOpen, setIsOpen] = useState(false);
    const [isFullyMounted, setIsFullyMounted] = useState(false);

    // 2. MOUNT CHECK
    useEffect(() => {
        setIsFullyMounted(true);
    }, []);

    const toggleOpen = () => setIsOpen(!isOpen);

    if (!isFullyMounted) return null;

    return (
        <motion.div
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
                        className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-cyan-500/50 text-white transition-all cursor-pointer"
                    >
                        <MessageCircle size={28} />
                    </motion.button>
                ) : (
                    /* --- CHAT WINDOW (INNER ONLY) --- */
                    <motion.div
                        key="window"
                        suppressHydrationWarning
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="relative shadow-2xl rounded-lg overflow-hidden w-[500px] h-[750px] max-h-[85vh] max-w-[90vw]"
                    >
                        {/* RAW DOM INJECTION */}
                        <div
                            className="w-full h-full block"
                            ref={(el) => {
                                if (el && !el.hasChildNodes()) {
                                    const styleConfig = {
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: '#0b1021',
                                        color: '#ffffff'
                                    };

                                    const chatElement = withOpenShadowForLangflow(() => {
                                        return document.createElement('langflow-chat');
                                    });

                                    chatElement.setAttribute('window_title', config.window_title);
                                    chatElement.setAttribute('flow_id', config.flow_id);
                                    chatElement.setAttribute('host_url', config.host_url);
                                    chatElement.setAttribute('api_key', config.api_key);
                                    chatElement.setAttribute('start_open', 'true');
                                    chatElement.setAttribute('online', 'true');
                                    chatElement.style.width = '100%';
                                    chatElement.style.height = '100%';

                                    (chatElement as any).window_title = config.window_title;
                                    (chatElement as any).flow_id = config.flow_id;
                                    (chatElement as any).host_url = config.host_url;
                                    (chatElement as any).api_key = config.api_key;

                                    el.appendChild(chatElement);

                                    try {
                                        (chatElement as any).chat_window_style = styleConfig;
                                    } catch (e) {
                                        console.warn("Could not set chat_window_style", e);
                                    }

                                    injectShadowStyles(chatElement, () => setIsOpen(false));
                                }
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Hide internal header/launcher so our outer toggle controls state
function injectShadowStyles(element: HTMLElement, onClose: () => void) {
    const tryApply = () => {
        const root = getInternalRoot(element);
        if (!root) return false;

        if (!root.querySelector('style[data-aifa-hide]')) {
            const style = document.createElement('style');
            style.setAttribute('data-aifa-hide', 'true');
            style.textContent = `
                button[aria-label*="close" i]:not([data-aifa-close="true"]), 
                button[class*="close" i]:not([data-aifa-close="true"]),
                .close-button:not([data-aifa-close="true"]) {
                    display: none !important;
                }
                .floating-button, .launcher, .chat-launcher, .floating-action-button {
                    display: none !important;
                }
                .cl-trigger, button.cl-trigger {
                    display: none !important;
                }
                .cl-chat-window {
                    left: 0 !important;
                    top: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    width: 100% !important;
                    height: 100% !important;
                    transform: none !important;
                }
                button:has(svg.lucide-x),
                button:has(path[d*="M18 6 6 18"]),
                button:has(path[d*="m18 6-12 12"]) {
                    display: none !important;
                }
            `;
            root.appendChild(style);
        }

        applyShadowOverrides(root, onClose);

        const observer = new MutationObserver(() => {
            applyShadowOverrides(root, onClose);
        });
        observer.observe(root, { childList: true, subtree: true, attributes: true });
        setTimeout(() => observer.disconnect(), 8000);
        return true;
    };

    if (tryApply()) return;

    const interval = setInterval(() => {
        if (tryApply()) clearInterval(interval);
    }, 50);

    setTimeout(() => clearInterval(interval), 5000);
}

function getInternalRoot(element: HTMLElement): ShadowRoot | null {
    const anyEl = element as LangflowElement;
    return (
        element.shadowRoot ||
        anyEl.container ||
        anyEl._shadowRoot ||
        anyEl._root ||
        anyEl._container ||
        anyEl.__aifaShadow ||
        null
    );
}

function applyShadowOverrides(root: ShadowRoot, onClose: () => void) {
    const triggers = root.querySelectorAll('.cl-trigger, button.cl-trigger');
    triggers.forEach((node) => {
        (node as HTMLElement).style.display = 'none';
    });
    ensureHeaderClose(root, onClose);
}

function ensureHeaderClose(root: ShadowRoot, onClose: () => void) {
    const existing = root.querySelector('button[data-aifa-close="true"]');
    if (existing) return;

    const header =
        root.querySelector('.chat-header') ||
        root.querySelector('.cl-chat-header') ||
        root.querySelector('header') ||
        root.querySelector('[class*="header"]');
    if (!header) return;

    const headerEl = header as HTMLElement;
    if (!headerEl.style.position || headerEl.style.position === 'static') {
        headerEl.style.position = 'relative';
    }

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Close chat');
    btn.setAttribute('data-aifa-close', 'true');
    btn.textContent = '×';
    btn.style.position = 'absolute';
    btn.style.right = '12px';
    btn.style.top = '50%';
    btn.style.transform = 'translateY(-50%)';
    btn.style.width = '28px';
    btn.style.height = '28px';
    btn.style.borderRadius = '9999px';
    btn.style.border = 'none';
    btn.style.cursor = 'pointer';
    btn.style.background = '#2563eb';
    btn.style.color = '#ffffff';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.style.lineHeight = '1';
    btn.style.fontSize = '18px';
    btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.25)';
    btn.addEventListener('click', onClose);

    headerEl.appendChild(btn);
}

function withOpenShadowForLangflow<T>(createElement: () => T): T {
    const original = HTMLElement.prototype.attachShadow;
    let restored = false;
    const restore = () => {
        if (!restored) {
            HTMLElement.prototype.attachShadow = original;
            restored = true;
        }
    };

    HTMLElement.prototype.attachShadow = function (init) {
        const isLangflow = (this as HTMLElement).tagName === 'LANGFLOW-CHAT';
        if (!isLangflow) {
            return original.call(this, init);
        }
        const shadow = original.call(this, { ...init, mode: 'open' });
        (this as LangflowElement).__aifaShadow = shadow;
        return shadow;
    };

    const element = createElement();

    if (typeof customElements !== 'undefined' && customElements.whenDefined) {
        customElements.whenDefined('langflow-chat').then(() => {
            setTimeout(restore, 500);
        });
    } else {
        setTimeout(restore, 2000);
    }

    return element;
}
