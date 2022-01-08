const dayjs = require('dayjs')

exports.emailHTML = ({ username, date, message }) => {

return `
<h1>User Information</h1>
<ul>
    <li>Date: ${date}</li>
    <li>User Email: ${username}</li>
</ul>
<p>${message}</p>
`};

exports.newUserEmailContent = ({email,first_name,last_name,age,phone,address,avatarUrl}) =>{
    return `
        <h1>Información del nuevo usuario</h1>
        <ul>
            <li>Fecha: ${dayjs().format('[(]DD/MM/YYYY hh[:]mm[:]ss[)]')}</li>
            <li>Email: ${email}</li>
            <li>Nombre: ${first_name}</li>
            <li>Apellido: ${last_name}</li>
            <li>Edad: ${age}</li>
            <li>Teléfono: ${phone}</li>
            <li>Dirección: ${address}</li>
            <li>Avatar: <img sr="${avatarUrl}" /></li>

        </ul>
    `
}