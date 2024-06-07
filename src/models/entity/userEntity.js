import { EntitySchema } from 'typeorm'
import { User } from '../model/User.js'

const UserEntity = new EntitySchema({
  name: 'User',
  tableName: 'user',
  target: User,

  columns: {
    user_id: { primary: true, type: 'text', generated: 'uuid' },
    user_name: { type: 'varchar' },
    user_email: { type: 'varchar' },
    user_phone: { type: 'varchar' },
    user_password: { type: 'varchar' },
    user_password_salt: { type: 'varchar' },
    user_status: {
      type: 'tinyint',
      default: () => '1',
      comment: '0=Inactive, 1=Active',
    },
    user_last_login_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
    user_last_ip_address: { type: 'varchar', nullable: true },
    is_deleted: { type: 'tinyint', default: () => '0' },
    created_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
    updated_at: {
      type: 'timestamp',
      onUpdate: 'CURRENT_TIMESTAMP',
      nullable: true,
    },
  },
})

export default UserEntity
