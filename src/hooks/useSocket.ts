import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import { AppDispatch, RootState } from '../store';
import { addMessage, setConnected } from '../store/slices/chatSlice';

export const useSocket = (sessionId?: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token || !sessionId) return;

    // Создаем подключение к сокету
    socketRef.current = io('http://localhost:3000', {
      auth: {
        token,
      },
    });

    const socket = socketRef.current;

    // Обработчики событий
    socket.on('connect', () => {
      console.log('Connected to server');
      dispatch(setConnected(true));

      // Присоединяемся к комнате чата
      socket.emit('joinChat', sessionId);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      dispatch(setConnected(false));
    });

    socket.on('newMessage', (message) => {
      console.log('New message received:', message);
      dispatch(addMessage(message));
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    // Очистка при размонтировании
    return () => {
      if (socket) {
        socket.emit('leaveChat', sessionId);
        socket.disconnect();
      }
    };
  }, [token, sessionId, dispatch]);

  // Функция для отправки сообщения
  const sendMessage = (text: string) => {
    if (socketRef.current && sessionId) {
      socketRef.current.emit('sendMessage', {
        text,
        sender: 'USER',
        sessionId,
      });
    }
  };

  // Функция для отправки события "печатает"
  const sendTyping = (isTyping: boolean) => {
    if (socketRef.current && sessionId) {
      socketRef.current.emit('typing', {
        sessionId,
        isTyping,
      });
    }
  };

  return { sendMessage, sendTyping };
};