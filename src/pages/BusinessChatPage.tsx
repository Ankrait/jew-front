import { useEffect, useId, useRef, useState } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { baseService, ConversationMessage } from '../services/base';

export default function BusinessChatPage() {
    const id = useId();
    const navigate = useNavigate();

    const [messages, setMessages] = useState<ConversationMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const restrictedAgents = ['trend', 'analysis'];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        const value = input.trim();
        if (!value) return;
        setInput('');
        setMessages((prev) => [...prev, { role: 'user', content: value }]);

        setIsLoading(true);

        try {
            const data = await baseService.sendMessage(id, value, messages);
            const agent = data.task_type?.toLowerCase() || 'girlfriend';
            const agentData = data.response[agent];
            const answer = agentData?.report
                ? agentData.report
                : agentData?.response || 'Ошибка';
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: answer ?? 'Ошибка' },
            ]);
        } catch {
            setMessages((prev) => [...prev, { role: 'assistant', content: 'Ошибка' }]);
        } finally {
            setIsLoading(false);
        }


    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">

            <main className="max-w-4xl mx-auto p-4">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="h-[calc(100vh-280px)] min-h-[550px] overflow-y-auto space-y-4 border border-slate-200">
                        <header className="bg-purple-200 shadow-sm">
                            <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4 ">
                                <button
                                    onClick={() => navigate('/')}
                                    className="p-2 hover:bg-purple-100 rounded-lg transition-colors">
                                    <ArrowLeft className="w-6 h-6 text-slate-600" />
                                </button>
                                <div>
                                    <h1 className="text-xl font-semibold text-slate-800">💼 Business Chat</h1>
                                    <p className="text-sm text-slate-600">AI ассистент для бизнеса</p>
                                </div>
                            </div>
                        </header>
                        {/* Messages */}
                        <div className="p-6">
                            {messages.map((message, i) => (
                                <div
                                    key={i}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'
                                        }`}>
                                    <div
                                        className={`max-w-[70%] rounded-2xl px-5 py-3 ${message.role === 'user'
                                            ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                                            : 'bg-slate-100 text-slate-800'
                                            }`}>
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                            {message.content}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-100 rounded-2xl px-5 py-3">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                    </div>

                    {/* Input */}
                    <div className="border-t border-slate-200 p-4 bg-slate-50">
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                                placeholder="Введите вопрос..."
                                className="flex-1 px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading}
                                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg">
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 text-center">
                            💼 JewelBot Business - AI ассистент для управления бизнесом
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
