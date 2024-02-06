import React from 'react'
import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Group,
  Button,
  Stack,
  Anchor,
  Text,
  Divider,
} from '@mantine/core'
import style from './Login.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleButton } from './GoogleButton'
import axios from 'axios'
import { getItem, setItem } from '../../utils/localStorage'
const LOGIN_URL = '/user/login'
interface Props {
  email: string
  password: string
}
export function Login() {
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
      console.log('login')
      setItem('data', res.data.metaData)

      res.data.metaData.user.roleId === 1 ? navigate('/') : navigate('/profile')

      console.log(getItem('data'))
    } catch (err) {
      console.error('Login error:', err)
    }
  }

  return (
    <>
      <Text className="text-center" size="lg" fw={500}>
        Welcome to{' '}
        <Link to="/">
          <span className="font-[700] text-archivo text-[#399f83]">
            Modern House
          </span>
        </Link>
        . Log In with
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
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor>
            <Link to="/register">Do not have an account? Register</Link>
          </Anchor>

          <Button
            size="md"
            type="submit"
            radius="xl"
            classNames={{ root: style.btnLogIn }}
          >
            Log In
          </Button>
        </Group>
      </form>
    </>
  )
}
