const dayjs = require("dayjs");

exports.newUserEmailContent = ({
  email,
  first_name,
  last_name,
  phone,
  address,
}) => {
  return `
        <h1>Información del nuevo usuario</h1>
        <ul>
            <li>Fecha: ${dayjs().format("[(]DD/MM/YYYY hh[:]mm[:]ss[)]")}</li>
            <li>Email: ${email}</li>
            <li>Nombre: ${first_name}</li>
            <li>Apellido: ${last_name}</li>
            <li>Teléfono: ${phone}</li>
            <li>Dirección: ${address}</li>

        </ul>
    `;
};
