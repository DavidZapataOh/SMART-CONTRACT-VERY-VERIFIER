# Smart Contract Very Verifier

[![npm version](https://img.shields.io/npm/v/smart-contract-very-verifier.svg)](https://www.npmjs.com/package/smart-contract-very-verifier)
[![downloads](https://img.shields.io/npm/dt/smart-contract-very-verifier.svg)](https://www.npmjs.com/package/smart-contract-very-verifier)

Una herramienta interactiva para verificar contratos inteligentes de manera sencilla y eficiente en múltiples blockchains.

---

## Tabla de Contenidos

- [Características](#características)
- [Instalación](#instalación)
- [Uso](#uso)
- [Ejemplos](#ejemplos)
- [Soporte de Blockchains](#soporte-de-blockchains)
- [Dependencias](#dependencias)
- [Contribución](#contribución)
- [Autor](#autor)
- [Notas Importantes](#notas-importantes)
- [Contacto](#contacto)

---

## Características

- **Verificación Automática de Contratos**: Permite la verificación de contratos en diversas blockchains seleccionando la versión de Solidity, la blockchain y otros parámetros de manera sencilla.
- **Detección Automática de Argumentos del Constructor**: Analiza el código fuente del contrato para detectar y codificar los parámetros del constructor automáticamente.
- **Soporte para Múltiples Blockchains**: Verifica contratos en Ethereum, Avalanche, Binance Smart Chain, Polygon, Arbitrum, Scroll, Base, Optimism y sus respectivas testnets.
- **Interfaz Interactiva**: Prompts y menús intuitivos que facilitan la interacción del usuario con la herramienta.
- **Comentarios y Explicaciones Detalladas**: Código comentado y documentado para facilitar su comprensión y personalización.

---

## Instalación

### Requisitos Previos

- **Node.js** (versión 14 o superior)
- **npm** (versión 6 o superior)

### Instalación Global

Puedes instalar `smart-contract-very-verifier` de manera global usando npm:

```bash
npm install -g smart-contract-very-verifier
```

---

## Uso

Una vez instalado, puedes ejecutar la herramienta desde la línea de comandos con:

```bash
smart-contract-very-verifier
```


Sigue las instrucciones en pantalla para verificar tus contratos inteligentes en la blockchain de tu elección.

---

## Ejemplos

### Verificar un Contrato en Avalanche Fuji Testnet

1. Ejecuta `smart-contract-very-verifier`.
2. Selecciona la opción **"Fuji (Avalanche Testnet)"**.
3. Ingresa tu API Key de Snowscan.
4. Ingresa la dirección del contrato y el nombre exactamente como aparece en el código fuente.
5. Selecciona la versión del compilador usada y la licencia deseada.
6. La herramienta detectará automáticamente los argumentos del constructor y procederá a verificar el contrato.

### Verificar un Contrato en Ethereum Mainnet

1. Ejecuta `smart-contract-very-verifier`.
2. Selecciona la opción **"Ethereum"**.
3. Ingresa tu API Key de Etherscan.
4. Ingresa la dirección del contrato y el nombre exactamente como aparece en el código fuente.
5. Selecciona la versión del compilador usada y la licencia deseada.
6. La herramienta realizará el resto del proceso automáticamente.

---

## Soporte de Blockchains

La herramienta soporta las siguientes blockchains y sus testnets:

- **Ethereum**: Mainnet y Sepolia Testnet.
- **Avalanche**: Mainnet y Fuji Testnet.
- **Binance Smart Chain**: Mainnet y BSC Testnet.
- **Polygon**: Mainnet y Mumbai Testnet.
- **Arbitrum**: Mainnet y Arbitrum Goerli Testnet.
- **Scroll**: Mainnet y Testnet.
- **Base**: Mainnet y Base Goerli Testnet.
- **Optimism**: Mainnet y Optimism Goerli Testnet.

---

## Dependencias

El proyecto utiliza las siguientes librerías:

- [axios](https://www.npmjs.com/package/axios) - Cliente HTTP para interactuar con las APIs de los exploradores de bloques.
- [chalk](https://www.npmjs.com/package/chalk) - Estilización de la salida en la consola.
- [figlet](https://www.npmjs.com/package/figlet) - Creación de texto en ASCII art.
- [inquirer](https://www.npmjs.com/package/inquirer) - Creación de interfaces interactivas en la línea de comandos.
- [ora](https://www.npmjs.com/package/ora) - Indicadores de carga y spinners.
- [solc](https://www.npmjs.com/package/solc) - Compilador de Solidity para generar ABI y bytecode.
- [web3](https://www.npmjs.com/package/web3) - Interacción con Ethereum y codificación de argumentos ABI.

---

## Contribución

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu función o arreglo de bug (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Sube tus cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request en el repositorio original.

---

## Autor

**David Zapata**

- [GitHub](https://github.com/DavidZapataOh)
- [Correo Electrónico](mailto:davidzapata5885@gmail.com)
- [Twitter](https://x.com/DavidZapataOh)
- [Instagram](https://www.instagram.com/davidzapatao/)

---

## Notas Importantes

- **Actualizaciones**: Revisa regularmente si hay actualizaciones disponibles para garantizar que estás utilizando la versión más reciente y segura de la herramienta.

---

## Contacto

Si tienes preguntas, problemas o sugerencias, por favor abre un issue en GitHub o contáctame directamente.

---

¡Gracias por utilizar **Smart Contract Very Verifier**! Espero que esta herramienta te sea útil en tu aprendizaje y gestión de contratos inteligentes.
