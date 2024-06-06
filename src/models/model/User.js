class User {
  constructor(
    id,
    name,
    email,
    phone,
    password,
    status,
    last_login_at,
    last_ip_address,
    created_at,
    updated_at
  ) {
    this.id = id
    this.name = name
    this.email = email
    this.phone = phone
    this.password = password
    this.status = status
    this.last_login_at = last_login_at
    this.last_ip_address = last_ip_address
    this.created_at = created_at
    this.updated_at = updated_at
  }
}

export { User as User }
