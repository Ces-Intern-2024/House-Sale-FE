import React, { useEffect, useState } from 'react'
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
import { setUser } from '../../redux/reducers/userSlice'
import { signInSuccess } from '../../redux/reducers/sessionSlice'
import { useAppDispatch } from '../../redux/hooks'
import appConfig from '../../configs/app.config'
import { useGoogleLogin } from '@react-oauth/google'
import {
  CODE_RESPONSE_401,
  CODE_RESPONSE_404,
  CODE_RESPONSE_403,
  CODE_RESPONSE_400,
} from '../../constants/codeResponse'
import { Roles } from '../../types/role'

const LOGIN_URL = '/user/login'
interface Props {
  email: string
  password: string
}
export function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [userGoogle, setUserGoogle] = useState<string | null>(null)

  const login = useGoogleLogin({
    onSuccess: (response) => {
      setUserGoogle(response.access_token)
    },
    // onError: () => console.log('Login Failed:'),
  })

  useEffect(() => {
    if (userGoogle) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userGoogle}`,
          {
            headers: {
              Authorization: `Bearer ${userGoogle}`,
              Accept: 'application/json',
            },
          },
        )
        .then(async (res) => {
          try {
            const userServer = await axios.post(`/user/login-with-google`, {
              email: res.data.email,
              fullName: res.data.name,
              accessToken: userGoogle,
            })
            await dispatch(setUser(userServer.data.metaData.userInfo))
            await dispatch(
              signInSuccess({
                signedIn: true,
                tokens: { ...userServer.data.metaData.tokens },
              }),
            )
            const roleId = userServer.data.metaData.userInfo.roleId

            if (roleId === Roles.User) {
              navigate(appConfig.tourPath)
            }
            if (roleId === Roles.Seller) {
              navigate(appConfig.authenticatedEntryPath)
            }
          } catch (error: any) {
            if (error.response) {
              if (error.response.status === CODE_RESPONSE_400) {
                setError(
                  'An error occurred while logging in. Please try again later!',
                )
              } else if (error.response.status === CODE_RESPONSE_404) {
                setError('Not Found!')
              }
            } else {
              setError(
                'An error occurred while logging in. Please try again later!',
              )
            }
          }
        })
    }
  }, [userGoogle])

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
    setError('')
    try {
      const res = await axios.post(
        LOGIN_URL,
        { email: value.email, password: value.password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )

      await dispatch(setUser(res.data.metaData.user))
      await dispatch(
        signInSuccess({
          signedIn: true,
          tokens: { ...res.data.metaData.tokens },
        }),
      )
      const roleId = res.data.metaData.user.roleId
      if (roleId === Roles.User) {
        navigate(appConfig.tourPath)
      }
      if (roleId === Roles.Seller) {
        navigate(appConfig.authenticatedEntryPath)
      }
      if (roleId === Roles.Admin) {
        navigate(appConfig.adminEntryPath)
      }
    } catch (error: any) {
      if (error.response) {
        if (
          error.response.status === CODE_RESPONSE_401 ||
          error.response.status === CODE_RESPONSE_403
        ) {
          setError('Email or password is incorrect.')
        } else if (error.response.status === CODE_RESPONSE_400) {
          setError('Email is not registered!')
        }
      } else {
        setError('An error occurred while logging in. Please try again later')
      }
    }
  }

  return (
    <>
      <Text className="text-center" size="lg" fw={500}>
        Welcome to{' '}
        <Link to="/home">
          <span className="font-[700] text-archivo text-[#399f83]">
            Modern House
          </span>
        </Link>
        . Log In with email
      </Text>

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
          {error && <div className="text-red">{error}</div>}
        </Stack>

        <Button
          size="md"
          type="submit"
          radius="xl"
          classNames={{ root: style.btnLogIn }}
        >
          Sign In
        </Button>
        <Group justify="space-between" mt="xl">
          <Anchor>
            <Link to="/register">Do not have an account? Register</Link>
          </Anchor>
        </Group>
      </form>
      <Divider
        label="Or continue with "
        labelPosition="center"
        my="lg"
        classNames={{ label: style.divider }}
      />
      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl" onClick={() => login()}>
          Google
        </GoogleButton>
      </Group>
    </>
  )
}
