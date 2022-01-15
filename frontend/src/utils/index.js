import moment from 'moment'

export function logout() {
  localStorage.removeItem('groupomania:user')
  localStorage.removeItem('groupomania:token')
  localStorage.removeItem('groupomania:admin')
  this.$router.push('/accueil')
}

export function dateFormat(date) {
  return moment(new Date(date)).format('DD/MM/YYYY à HH:mm');
}