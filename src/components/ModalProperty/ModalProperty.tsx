import React, { useState, useRef } from 'react'
import {
  FileButton,
  Button,
  Group,
  Text,
  TextInput,
  Select,
  NumberInput,
  Textarea,
} from '@mantine/core'
import style from './ModalProperty.module.scss'
import { Properties } from '@/types'

type Props = {
  property: Properties | null
}
const ModalProperty = ({ property }: Props) => {
  const [files, setFiles] = useState<File[]>([])
  const resetRef = useRef<() => void>(null)
  const clearFile = () => {
    setFiles([])
    resetRef.current?.()
  }
  return (
    <div>
      <div className={style.rowModal}>
        <TextInput
          className={style.colModal}
          label="Property name"
          placeholder="Enter name "
          value={property?.name}
        />
        <TextInput
          className={style.colModal}
          label="Property code"
          placeholder="Enter code "
          value={property?.code}
        />

        <Select
          className={style.colModal}
          label="Featured"
          placeholder="Choose featured "
          data={['Sale', 'Rent']}
          value={property?.featuredId}
        />
        <Select
          className={style.colModal}
          label="Category"
          placeholder="Choose featured "
          data={['House', 'Villa', 'Appartment']}
          value={property?.categoryId}
        />
      </div>
      <div className={style.rowModal}>
        <Select
          className={style.colModal}
          label="City/Province"
          placeholder="Choose featured "
          data={['Sale', 'Rent']}
        />
        <Select
          className={style.colModal}
          label="District"
          placeholder="Choose featured "
          data={['House', 'Villa', 'Appartment']}
        />
        <Select
          className={style.colModal}
          label="Ward"
          placeholder="Choose featured "
          data={['House', 'Villa', 'Appartment']}
        />
        <Select
          className={style.colModal}
          label="Street"
          placeholder="Choose featured "
          data={['House', 'Villa', 'Appartment']}
        />
      </div>
      <div className={style.rowModal}>
        <TextInput
          className={style.colModal}
          label="Address"
          placeholder="Enter address "
        />
        <NumberInput
          className={style.colModal}
          label="Number of floor"
          placeholder="Enter number of floor"
          min={0}
          value={property?.numberOfFloor}
        />
        <NumberInput
          className={style.colModal}
          label="Number of bedroom"
          placeholder="Enter number of bedroom"
          min={0}
          value={property?.numberOfBedroom}
        />
        <NumberInput
          className={style.colModal}
          label="Number of toilet"
          placeholder="Enter number of toilet"
          min={0}
          value={property?.numberOfToilet}
        />
      </div>
      <div className={style.rowModal}>
        <TextInput
          className={style.colModal}
          label="Land of Area"
          placeholder="Enter number"
          value={property?.landArea}
        />
        <NumberInput
          className={style.colModal}
          label="Area of use"
          placeholder="Enter number "
          min={0}
          value={property?.areaOfUse}
        />
        <NumberInput
          className={style.colModal}
          label="Price"
          placeholder="Enter price "
          min={0}
          value={property?.price}
        />
        <TextInput
          className={style.colModal}
          label="Currency Code"
          placeholder="Enter currency"
          value={property?.currencyCode}
        />
      </div>
      <div className={style.rowModal}>
        <TextInput
          className={style.colDirection}
          label="Direction"
          placeholder="Enter direction"
          value={property?.direction}
        />
      </div>
      <Textarea
        className={style.description}
        label="Description"
        placeholder="Enter decription"
        autosize
        minRows={5}
        // value={property?.description}
      />

      <div className="mt-[20px]">
        <Group justify="start">
          <FileButton
            onChange={setFiles}
            accept="image/png,image/jpeg"
            multiple
          >
            {(props) => (
              <Button {...props} classNames={{ root: style.rootButton }}>
                Upload image
              </Button>
            )}
          </FileButton>

          <Button disabled={!files} bg="red" onClick={clearFile}>
            Reset
          </Button>
        </Group>

        {files.length > 0 && (
          <Text size="sm" mt="sm">
            Your images:
          </Text>
        )}

        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
      <div className={style.coverBtn}>
        <Button
          classNames={{ root: style.rootButton }}
          onClick={() => alert('hihi haha')}
        >
          Add New{' '}
        </Button>
      </div>
    </div>
  )
}

export default ModalProperty
