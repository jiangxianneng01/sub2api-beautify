import landing from './landing'
import common from './common'
import dashboard from './dashboard'
import channelMonitorV2 from './channelMonitorV2'
import batchImage from './batchImage'
import studio from './studio'
import admin from './admin'
import misc from './misc'
import appearance from './appearance'
import chat from './chat'

export default {
  ...landing,
  ...common,
  ...dashboard,
  ...channelMonitorV2,
  ...batchImage,
  ...studio,
  admin,
  ...misc,
  ...appearance,
  ...chat,
}
