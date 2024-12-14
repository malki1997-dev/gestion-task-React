import axios from 'axios'

// creer une instance Axios pour configurer l'url de base et les en-tétes par défaut

const axiosInstance=axios.create({
    baseURL: 'http://localhost:5106',
    headers:
    {
        'Content-Type':'application/json',
    },
});

export default axiosInstance;



