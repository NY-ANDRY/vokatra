const host = 'http://127.0.0.1:8000/api';

const dateFormat = (value) => {
    return new Date(value).toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' })
}

export { host, dateFormat };