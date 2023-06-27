import axios from 'axios'
import { ref } from 'vue'

const useCripto = () => {
  const monedas = ref([
    { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
    { codigo: 'MXN', texto: 'Peso Mexicano' },
    { codigo: 'EUR', texto: 'Euro' },
    { codigo: 'GBP', texto: 'Libra Esterlina' },
    { codigo: 'PEN', texto: 'Sol Peruano' }
  ])

  const cotizarCripto = async ({
    criptomoneda,
    moneda,
    success = () => {},
    error = () => {},
    complete = () => {}
  }) => {
    // Consultar la API
    try {
      const { data } = await axios(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
      )
      success(data.DISPLAY[criptomoneda][moneda])
    } catch (e) {
      error(e)
    } finally {
      complete()
    }
  }

  const obtenerCriptos = async (state) => {
    const URL = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

    // Obtener criptomonedas
    try {
      const { data } = await axios.get(URL)

      if (typeof state === 'object' && state?.value) {
        state.value = data.Data.map((cripto) => {
          return {
            codigo: cripto.CoinInfo.Name,
            texto: cripto.CoinInfo.FullName
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    monedas,
    cotizarCripto,
    obtenerCriptos
  }
}

export default useCripto
