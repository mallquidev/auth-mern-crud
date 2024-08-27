import {useState} from 'react';
import {registerRequest} from '../api/auth_api.js'

function Register() {

  const [formData, setFormData] = useState({
    user: '',
    email: '',
    password: ''
  })

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await registerRequest(formData)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    console.log(formData);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
            <label htmlFor="usuario" className="block text-sm font-medium mb-1">Usuario</label>
            <input
              name="usuario"
              type="usuario"
              value={formData.usuario}
              onChange={handleChange}
              placeholder="ejemplo@dominio.com"
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Correo Electrónico</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@dominio.com"
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Registrase
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
