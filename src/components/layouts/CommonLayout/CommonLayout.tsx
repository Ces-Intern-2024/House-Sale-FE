import React, { useState } from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import style from './CommonLayout.module.scss'
import Views from '../../../views/Views'
import chatbot from '../../../assets/images/chatbot.png'
import { Button, Image } from '@mantine/core'
import ChatbotConversation from '../../../components/ChatbotConversation/ChatbotConversation'
export default function Layout() {
  const [isOpened, setIsopened] = useState(false)
  const handleDisplay = () => {
    setIsopened(!isOpened)
  }
  return (
    <>
      <div className={style.outer}>
        <div className={style.inner}>
          <Header />
        </div>
      </div>
      <Views />
      <Footer />

      <Button className={style.chatbot} onClick={handleDisplay}>
        <Image src={chatbot} className={style.chatbotIcon} alt="chatbot" />
      </Button>
      {isOpened && <ChatbotConversation />}
    </>
  )
}
