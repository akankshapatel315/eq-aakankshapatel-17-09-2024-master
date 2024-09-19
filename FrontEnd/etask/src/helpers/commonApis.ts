import axios from "axios";
const SERVER_BASE_URL='http://localhost:8080'


const axiosGet = async (apiUrl: string) => {
    return new Promise(async function (resolve, reject) {
        axios.get(`${SERVER_BASE_URL}/${apiUrl}`, {})
            .then((response) => {
                if (response.status === 200) {
                    resolve(response)
                }
                else {
                    reject(response)
                }
            }).catch((error) => {
                reject(error)
            })

    });
}

export default  axiosGet 