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

export function isAdmin() {
  const isAdmin = localStorage.getItem('groupomania:admin');
  return Boolean(isAdmin) === true;
}

export function getLoggedUserId() {
  const user = JSON.parse(localStorage.getItem('groupomania:user'));
  const userId = user.userId;
  return userId;
}

export function canUpdate(entityAuthorId) {
  const userId = getLoggedUserId();
  return entityAuthorId === userId;
}

export function canDelete(entityAuthorId) {
  const userId = getLoggedUserId();
  return entityAuthorId === userId || isAdmin();
}