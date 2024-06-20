import React, { useState, useEffect } from 'react'
import chaticon from '../../assets/images/chaticon.png'
import { Image, Input } from '@mantine/core'
import { IoMdSend } from 'react-icons/io'

const chatbotURL = process.env.REACT_APP_CHATBOT_URL
const ChatbotConversation = () => {
  const [value, setValue] = useState('')
  const [messages, setMessages] = useState<
    { text: string; sender: 'user' | 'bot' }[]
  >(() => {
    const savedMessages = localStorage.getItem('messages')
    return savedMessages ? JSON.parse(savedMessages) : []
  })

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages))
  }, [messages])

  const sendMessage = async () => {
    if (value.trim()) {
      const userMessage: { text: string; sender: 'user' | 'bot' } = {
        text: value,
        sender: 'user',
      }
      setMessages((prevMessages) => [...prevMessages, userMessage])
      setValue('')

      try {
        if (!chatbotURL) {
          throw new Error(
            'REACT_APP_CHATBOT_URL is not defined in your environment variables',
          )
        }
        const response = await fetch(chatbotURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: value }),
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        const botMessage: { text: string; sender: 'user' | 'bot' } = {
          text: data.response,
          sender: 'bot',
        }
        setMessages((prevMessages) => [...prevMessages, botMessage])
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }

  return (
    <div className=" w-[300px] h-[360px] fixed bottom-[240px] right-7 z-50 border-none rounded-14 outline-none bg-white text-black shadow-xl">
      <div>
        <div className="flex flex-row p-4">
          <div>
            <Image
              src={chaticon}
              alt="chat icon"
              className="w-[60px] h-[60px] rounded-[100px]"
            />
          </div>
          <div className="ml-4">
            <p className="text-[24px] font-bold m-0">ChatBot</p>
            <p className="text-[16px] m-0 text-gray-400">Online</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-200 h-[300px] overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            <p className="bg-white p-2 rounded-md inline-block text-sm">
              {message.text}
            </p>
          </div>
        ))}
      </div>
      <div>
        <Input
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          classNames={{
            input: 'border-none rounded-none',
          }}
          rightSectionPointerEvents="all"
          placeholder="Type your message here"
          rightSection={
            <IoMdSend
              size={24}
              className="text-labelBlue"
              onClick={sendMessage}
            />
          }
        />
      </div>
    </div>
  )
}

export default ChatbotConversation
