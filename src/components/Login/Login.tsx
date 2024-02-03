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
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
// import logo from '../../assets/images/logo_transparent.png'

export function Login(props: PaperProps) {
  const [type, toggle] = useToggle(['Login', 'Register'])

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
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

  return (
    <Paper
      w={460}
      classNames={{ root: style.rootLoginForm }}
      radius="md"
      p="xl"
      withBorder
      {...props}
    >
      {/* <div className="flex justify-between">
        <div className="w-[120px] bg-[#4cd5ae] rounded-[15px] ">
          <Image src={logo} fit="contain" />
        </div> */}
      <Link to="/" className={style.btnBackHome}>
        <IoIosArrowBack />
      </Link>
      {/* </div> */}

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
        onSubmit={form.onSubmit(() => {
          alert('login')
        })}
      >
        <Stack>
          {type === 'Register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue('name', event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
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
            placeholder="Your password"
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
