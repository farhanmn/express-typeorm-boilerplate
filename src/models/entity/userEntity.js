import { EntitySchema } from 'typeorm'
import { User } from '../model/User.js'

const UserEntity = new EntitySchema({
  name: 'User',
  tableName: 'user',
  target: User,

  columns: {
    id: { primary: true, type: 'text', generated: 'uuid' },

    name: { type: 'varchar' },

    fullname: { type: 'varchar' },

    email: { type: 'varchar' },

    phone: { type: 'varchar' },

    password: { type: 'varchar' },

    status: { type: 'tinyint', default: 1, comment: '0=Inactive, 1=Active' },

    last_login_at: { type: 'timestamp' },

    last_ip_address: { type: 'varchar' },

    created_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },

    updated_at: {
      type: 'timestamp',
    },
  },
})

export default UserEntity
