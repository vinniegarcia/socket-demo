import PGPubSub from 'pg-pubsub'

const pubsub = new PGPubSub('postgres://bdl_admin@localhost/syapse_apps_pds')



pubsub.addChannel('notifications')

export default pubsub