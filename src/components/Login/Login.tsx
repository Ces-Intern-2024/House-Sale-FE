import React from 'react'

import { useToggle, upperFirst } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core'
import { GoogleButton } from './GoogleButton'
import style from './Login.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import axios from 'axios'
import { getItem, setItem } from '../../utils/localStorage'
const LOGIN_URL = '/login'
interface Props {
  email: string
  password: string
}
export function Login(props: PaperProps) {
  const [type, toggle] = useToggle(['Login', 'Register'])
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  })

  const handleLogin = async (value: Props) => {
    // e.preventDefault()
    try {
      const res = await axios.post(
        LOGIN_URL,
        { email: value.email, password: value.password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )

      setItem('data', res.data.metaData)
      navigate('/')
      console.log(getItem('data'))
    } catch (err) {
      console.error('Login error:', err)
    }
  }

  return (
    <Paper
      w={460}
      classNames={{ root: style.rootLoginForm }}
      radius="md"
      p="xl"
      withBorder
      {...props}
    >
      <Link to="/" className={style.btnBackHome}>
        <IoIosArrowBack />
      </Link>

      <Text className="text-center" size="lg" fw={500}>
        Welcome to{' '}
        <span className="font-[700] text-archivo text-[#399f83]">
          Modern House
        </span>
        . {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit((values) => {
          handleLogin(values)
        })}
      >
        <Stack>
          {/* {type === 'Register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue('name', event.currentTarget.value)
              }
              radius="md"
            />
          )} */}

          <TextInput
            required
            label="Email"
            placeholder="Enter email"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Enter password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={
              form.errors.password &&
              'Password should include at least 6 characters'
            }
            radius="md"
          />

          {type === 'Register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue('terms', event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === 'Register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button
            size="md"
            type="submit"
            radius="xl"
            classNames={{ root: style.btnLogIn }}
          >
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  )
}
