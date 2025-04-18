import { HTMLInputTypeAttribute } from "react"

export interface InputFormProps {
  label: string,
  name: string,
  type?: HTMLInputTypeAttribute,
  required?: boolean
  placeholder?: string
}

export function InputForm({ label, placeholder, type, required, name }: InputFormProps) {
  placeholder = placeholder == undefined ? "An example" : placeholder
  type = type == undefined ? "text" : type
  return <>

    <div className="w-full">
      <label className="block mb-2 text-sm font-medium">{label}</label>
      <input type={type} className=" border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name={name} placeholder={placeholder} required={required} />
    </div>

  </>

}

export interface SelectFormProps {
  label: string,
  required?: boolean
  name: string,
  options: string[]
}


export function SelectForm({ label, options, required, name }: SelectFormProps) {

  return <>

    <div className="w-full">

      <label className="block mb-2 text-sm font-medium">{label}</label>
      <select name={name} className=" border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required={required}>
        {options.map(op => <option>{op}</option>)}
      </select>
    </div>

  </>

}

export interface FileInputProps {
  label: string,
  required?: boolean
  name: string,
  options: string[]
}

export function FileInput({ label, placeholder, type, required, name }: InputFormProps) {
  placeholder = placeholder == undefined ? "An example" : placeholder
  type = type == undefined ? "text" : type
  return <>

    <div className="w-full">
      <label className="block mb-2 text-sm font-medium">{label}</label>
      <input type={type} className=" border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name={name} placeholder={placeholder} required={required} />
    </div>

  </>

}
