import React from 'react'
import Input from '../CustomInput/Input'
import Button from '../CustomButton/ButtonCustom'
import style from './ContactUs.module.scss'
import { MdPerson2, MdEmail } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import { Group, Image } from '@mantine/core'
import avatar from '../../assets/images/avatar.jpg'
// import { useForm } from '@mantine/form'
const ContactUs = () => {
  // const form = useForm({
  //   initialValues: {
  //     fullName: '',
  //     email: '',
  //     phone: '',
  //     message: '',
  //   },
  //   validate: {
  //     fullName: (value) =>
  //       value.length === 0 ? 'The name field cannot be empty' : null,
  //     email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
  //     phone: (value) =>
  //       value.length !== 10 ? 'The phone number includes 10 numbers' : null,
  //   },
  // })

  return (
    <div className={style.ContactContainer}>
      <div className={style.ContactContent}>
        <div className={style.ContactPriceProperty}>$ 300.00</div>
        <p className={style.ContactText}>PROPERTY FOR SALE</p>
        <div className={style.ContactInputContainer}>
          <form>
            <div className={style.ContactInputRow}>
              <Input
                size="lg"
                radius="xl"
                placeholder="Full Name"
                className={style.ContactInput}
                leftS={<MdPerson2 size={16} color="green" />}
                required
              ></Input>
            </div>
            <div className={style.ContactInputRow}>
              <Input
                size="lg"
                radius="xl"
                placeholder="Email"
                className={style.ContactInput}
                leftS={<MdEmail size={16} color="green" />}
                required
              ></Input>
            </div>
            <div className={style.ContactInputRow}>
              <Input
                size="lg"
                radius="xl"
                placeholder="Phone"
                className={style.ContactInput}
                leftS={<FaPhoneAlt size={16} color="green" />}
                required
              ></Input>
            </div>
            <div className={style.ContactInputRow}>
              <Input
                size="lg"
                radius="xl"
                placeholder="Message"
                className={style.ContactInput}
                leftS={<FaMessage size={16} color="green" />}
                required
              ></Input>
            </div>
            <div className={style.ContactSubmit}>
              <Group>
                <Button
                  variant="filled"
                  text="SEND TO SELLER"
                  // bg='red'
                ></Button>
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
              h={140}
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
