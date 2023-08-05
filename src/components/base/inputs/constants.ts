export enum InputTypess {
  number = 'number',
  search = 'search',
  text = 'text',
  password = 'password',
  textarea = 'textarea',
  email = 'email',
  tel = 'tel',
  file = 'file',
  url = 'url',
  time = 'time',
  date = 'date',
}

export interface IInputType {
  val: InputTypess
}
