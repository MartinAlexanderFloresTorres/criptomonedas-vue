<script setup>
import { ref, onMounted } from 'vue'
import Alerta from './components/Alerta.vue'
import Resultado from './components/Resultado.vue'
import Spinner from './components/Spinner.vue'
import useCripto from './composables/useCripto'

const moneda = ref('')
const criptomoneda = ref('')
const alerta = ref('')
const criptomonedas = ref([])
const cotizacion = ref(null)
const cargando = ref(false)

const { monedas, obtenerCriptos, cotizarCripto } = useCripto()

onMounted(() => {
  obtenerCriptos(criptomonedas)
})

const handleSubmit = async () => {
  // Validar
  if (moneda.value === '' || criptomoneda.value === '') {
    alerta.value = 'Selecciona una moneda y criptomoneda'
    return
  }

  // Limpiar alerta previa
  alerta.value = ''
  cotizacion.value = null

  // Mostrar spinner
  cargando.value = true

  // Consultar la API
  cotizarCripto({
    moneda: moneda.value,
    criptomoneda: criptomoneda.value,
    success: (data) => {
      cotizacion.value = data
      cargando.value = false
    },
    complete: () => {
      cargando.value = false
    },
    error: (error) => {
      console.log(error);
      alerta.value = 'Ha ocurrido un error'
      cargando.value = false
    }
  })
}
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Contizador de <span>Criptomonedas</span></h1>
    <div class="contenido">
      <Alerta v-if="alerta.length > 0">
        {{ alerta }}
      </Alerta>

      <form class="formulario" @submit.prevent="handleSubmit">
        <div class="campo">
          <label for="moneda">Moneda</label>
          <select name="moneda" id="moneda" v-model="moneda">
            <option value="" disabled selected>Elige tu moneda</option>
            <option v-for="moneda in monedas" :key="moneda.codigo" :value="moneda.codigo">
              {{ moneda.texto }}
            </option>
          </select>
        </div>

        <div class="campo">
          <label for="criptomoneda">Criptomoneda</label>
          <select name="criptomoneda" id="criptomoneda" v-model="criptomoneda">
            <option value="" disabled selected>Elige tu criptomoneda</option>
            <option v-for="cripto in criptomonedas" :key="cripto.codigo" :value="cripto.codigo">
              {{ cripto.texto }}
            </option>
          </select>
        </div>

        <input type="submit" class="btn btn-primario" value="Calcular" />
      </form>
      <Spinner v-if="cargando" />
      <Resultado v-if="cotizacion" :cotizacion="cotizacion" />
    </div>
  </div>
</template>
