import React, { useState } from 'react'
import styles from './MaintenanceComponent.module.scss'
import ExchangePolicy from '../Transaction/ExchangePolicy'
import { Switch, Textarea, Tooltip } from '@mantine/core'
import { IconSettingsAutomation, IconSettingsPause } from '@tabler/icons-react'

export default function MaintenanceComponent() {
  const [checked, setChecked] = useState(false)
  const [message, setMessage] = useState(
    'The page you are looking for is under maintenance and will be back soon.',
  )
  return (
    <>
      <div className={styles.container}>
        <ExchangePolicy />
        <Textarea
          size="lg"
          label="Message For Maintenance Pop-Up"
          placeholder="Autosize with 4 rows max"
          defaultValue={message}
          autosize
          minRows={5}
          maxRows={7}
          onChange={(event) => setMessage(event.currentTarget.value)}
        />
        <Switch
          classNames={{
            track: `${checked ? 'bg-[#5FA084]' : 'bg-blur'}  outline-none border-none`,
          }}
          width={150}
          size="lg"
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
          onLabel={
            <Tooltip label="Turn Off Maintenance Mode">
              <IconSettingsPause stroke={2} />
            </Tooltip>
          }
          offLabel={
            <Tooltip label="Turn On Maintenance Mode">
              <IconSettingsAutomation stroke={2} />
            </Tooltip>
          }
        />
      </div>
    </>
  )
}
