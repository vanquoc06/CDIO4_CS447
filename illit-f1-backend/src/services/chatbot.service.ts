// src/services/chatbot.service.ts
import prisma from '../config/database';

export const createChatSession = async (userId: string) => {
  const session = await prisma.chatbot_Sessions.create({
    data: {
      user_id: userId
    }
  });
  return session;
};

export const getChatSession = async (sessionId: string) => {
  const session = await prisma.chatbot_Sessions.findUnique({
    where: { session_id: sessionId },
    include: {
      Chatbot_Messages: {
        orderBy: { sent_at: 'asc' }
      }
    }
  });
  return session;
};

export const getUserSessions = async (userId: string) => {
  const sessions = await prisma.chatbot_Sessions.findMany({
    where: { user_id: userId },
    include: {
      Chatbot_Messages: {
        orderBy: { sent_at: 'desc' },
        take: 1
      }
    },
    orderBy: { started_at: 'desc' }
  });
  return sessions;
};

export const saveChatMessage = async (sessionId: string, sender: string, messageText: string) => {
  // Validate sender
  if (!['user', 'bot'].includes(sender)) {
    throw new Error('Sender must be "user" or "bot"');
  }

  const message = await prisma.chatbot_Messages.create({
    data: {
      session_id: sessionId,
      sender,
      message_text: messageText
    }
  });

  // Update session's last_interacted_at
  await prisma.chatbot_Sessions.update({
    where: { session_id: sessionId },
    data: { last_interacted_at: new Date() }
  });

  return message;
};

export const getChatMessages = async (sessionId: string, limit: number = 50) => {
  const messages = await prisma.chatbot_Messages.findMany({
    where: { session_id: sessionId },
    orderBy: { sent_at: 'asc' },
    take: limit
  });
  return messages;
};

export const deleteSession = async (sessionId: string) => {
  // Delete messages first
  await prisma.chatbot_Messages.deleteMany({
    where: { session_id: sessionId }
  });

  // Then delete session
  const session = await prisma.chatbot_Sessions.delete({
    where: { session_id: sessionId }
  });

  return session;
};

export const clearSessionMessages = async (sessionId: string) => {
  const result = await prisma.chatbot_Messages.deleteMany({
    where: { session_id: sessionId }
  });
  return result;
};
