import { Message } from 'element-ui'
import { messageDuration, messageType } from '@/config'

export const uiutils = {
  Message: {
    error: function(message: string) {
      // @ts-ignore
      Message({
        message: message || 'Error',
        type: messageType.error,
        duration: messageDuration.short
      })
    },
    success: function(message: string) {
      // @ts-ignore
      Message({
        message: message || 'Success',
        type: messageType.success,
        duration: messageDuration.short
      })
    }
  }
}

export default uiutils
