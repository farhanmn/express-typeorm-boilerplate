class User {
  constructor(
    user_id,
    user_name,
    user_email,
    user_phone,
    user_password,
    user_password_salt,
    user_status,
    user_last_login_at,
    user_last_ip_address,
    created_at,
    updated_at
  ) {
    this.user_id = user_id
    this.user_name = user_name
    this.user_email = user_email
    this.user_phone = user_phone
    this.user_password = user_password
    this.user_password_salt = user_password_salt
    this.user_status = user_status
    this.user_last_login_at = user_last_login_at
    this.user_last_ip_address = user_last_ip_address
    this.created_at = created_at
    this.updated_at = updated_at
  }
}

export { User }
