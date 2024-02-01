import React from 'react'
import Input from '../CustomInput/Input'
import Button from '../CustomButton/ButtonCustom'
import style from './ContactUs.module.scss'
import { MdPerson2, MdEmail } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'
import { Group, Image, Textarea } from '@mantine/core'
import avatar from '../../assets/images/avatar.jpg'

const ContactUs = () => {
  return (
    <div className={style.ContactContainer}>
      <div className={style.ContactContent}>
        <div className={style.ContactPriceProperty}>$ 300.00</div>
        <p className={style.ContactText}>PROPERTY FOR SALE</p>
        <div className={style.ContactInputContainer}>
          <form>
            <div className={style.ContactInputRow}>
              <Input
                size="md"
                radius="xl"
                placeholder="Full Name"
                className={style.ContactInput}
                leftS={<MdPerson2 size={16} color="green" />}
                required
              ></Input>
            </div>
            <div className={style.ContactInputRow}>
              <Input
                size="md"
                radius="xl"
                placeholder="Email"
                className={style.ContactInput}
                leftS={<MdEmail size={16} color="green" />}
                required
              ></Input>
            </div>
            <div className={style.ContactInputRow}>
              <Input
                size="md"
                radius="xl"
                placeholder="Phone"
                className={style.ContactInput}
                leftS={<FaPhoneAlt size={16} color="green" />}
                required
              ></Input>
            </div>
            <div className={style.ContactInputRow}>
              <Textarea
                classNames={{ input: style.rootTextArea }}
                placeholder="Message"
              />
            </div>
            <div className={style.ContactSubmit}>
              <Group>
                <Button variant="filled" text="SEND TO SELLER"></Button>
              </Group>
            </div>
          </form>
        </div>

        <div className={style.ContactInfoSeller}>
          <div className={style.ContactAvatar}>
            <Image
              src={avatar}
              alt="avatar"
              radius="50%"
              h={100}
              w="auto"
              fit="cover"
            />
          </div>
          <div className={style.ContactInfoDetail}>
            <div className={style.ContactNameSeller}>Big Boss</div>
            <div className={style.ContactPhoneEmail}>
              <FaPhoneAlt size={20} color="green" />
              <span className={style.ContactTextSeller}>+84 901172380</span>
            </div>
            <div className={style.ContactPhoneEmail}>
              <MdEmail size={20} color="green" />
              <span className={style.ContactTextSeller}>
                bigboss23122001@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
