import { useAxios } from 'hooks/use-axios'
import { IMessage } from './message.interface'

export const useSendMessage = () => {
  const { execute, response, loading } = useAxios<IMessage>()
  
  const sendMessage = (data: any) => {
    const method = 'POST'
    const url = '/webhook/send-message-whatsapp'
    const temp = Object.assign({}, data)
      
    execute({
      method,
      url,
      data: temp,
    })
  }
  
  return {
    sendMessage,
    loading,
    message: response
  }
}