import axios from "axios";

const axiosGet = async (apiUrl: string) => {
    return new Promise(async function (resolve, reject) {
        axios.get(`${process.env.GIT_URL}/${apiUrl}`, {})
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
export default axiosGet