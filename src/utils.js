import solc from 'solc';
import Web3 from 'web3'; 

/**
 * Compila el código fuente de un contrato inteligente y retorna su ABI y bytecode.
 * @param {string} sourceCode - Código fuente del contrato en Solidity.
 * @param {string} contractName - Nombre del contrato tal como está definido en el código fuente.
 * @param {string} compilerVersion - Versión del compilador de Solidity a utilizar.
 * @returns {Object} ABI y bytecode del contrato compilado.
 */
export async function compileContract(sourceCode, contractName, compilerVersion) {
    const input = {
        language: 'Solidity',
        sources: {
            'Contract.sol': {
                content: sourceCode
            }
      },
      settings: {
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode']
                }
            }
        }
    };
  
    // Compilar el contrato usando la versión especificada
    const compiled = JSON.parse(solc.compile(JSON.stringify(input)));
    return compiled.contracts['Contract.sol'][contractName];
}

/**
 * Codifica los argumentos del constructor de un contrato inteligente en formato ABI.
 * @param {Object[]} abi - Definición de la interfaz del contrato.
 * @param {Array} constructorArgs - Argumentos del constructor del contrato (opcional).
 * @returns {string} Argumentos del constructor codificados en ABI.
 */
export function getConstructorArgsABI(abi, constructorArgs = []) {
    const web3 = new Web3(); // Crear instancia de Web3 para codificar los argumentos
    const constructor = abi.find(item => item.type === 'constructor');

    // Si el contrato no tiene constructor definido, retorna una cadena vacía
    if (!constructor) return '';
  
    const types = constructor.inputs.map(input => input.type);

    // Si no hay valores de argumentos, proporcionamos valores predeterminados.
    if (constructorArgs.length === 0) {
        constructorArgs = types.map(type => {
        if (type === 'string') return ''; 
        if (type.match(/^uint[0-9]*$/)) return '0';
        if (type.match(/^int[0-9]*$/)) return '0';
        if (type === 'address') return '0x0000000000000000000000000000000000000000'; 
        if (type.startsWith('bytes')) return '0x'; 
        if (type === 'bool') return false; 
        if (type.endsWith('[]')) return []; // Para arrays de cualquier tipo
        if (type.startsWith('tuple')) return [];
        return ''; 
        });
    }
    // Codificar los parámetros del constructor y devolverlos como una cadena
    return web3.eth.abi.encodeParameters(types, constructorArgs).slice(2);
}

// Opciones de versiones de Solidity disponibles
export const solidityVersions = {
    '0.8': [
        'v0.8.27+commit.40a35a09',
        'v0.8.26+commit.8a97fa7a',
        'v0.8.25+commit.b61c2a91',
        'v0.8.24+commit.e11b9ed9',
        'v0.8.23+commit.f704f362',
        'v0.8.22+commit.4fc1097e',
        'v0.8.21+commit.d9974bed',
        'v0.8.20+commit.a1b79de6',
        'v0.8.19+commit.7dd6d404',
        'v0.8.18+commit.87f61d96',
        'v0.8.17+commit.8df45f5f',
        'v0.8.16+commit.07a7930e',
        'v0.8.15+commit.e14f2714',
        'v0.8.14+commit.80d49f37',
        'v0.8.13+commit.abaa5c0e',
        'v0.8.12+commit.f00d7308',
        'v0.8.11+commit.d7f03943',
        'v0.8.10+commit.fc410830',
        'v0.8.9+commit.e5eed63a',
        'v0.8.8+commit.dddeac2f',
        'v0.8.7+commit.e28d00a7',
        'v0.8.6+commit.11564f7e',
        'v0.8.5+commit.a4f2e591',
        'v0.8.4+commit.c7e474f2',
        'v0.8.3+commit.8d00100c',
        'v0.8.2+commit.661d1103',
        'v0.8.1+commit.df193b15',
        'v0.8.0+commit.c7dfd78e'
    ],
    '0.7': [
        'v0.7.6+commit.7338295f',
        'v0.7.5+commit.eb77ed08',
        'v0.7.4+commit.3f05b770',
        'v0.7.3+commit.9bfce1f6',
        'v0.7.2+commit.51b20bc0',
        'v0.7.1+commit.f4a555be',
        'v0.7.0+commit.9e61f92b'
    ],
    '0.6': [
        'v0.6.12+commit.27d51765',
        'v0.6.11+commit.5ef660b1',
        'v0.6.10+commit.00c0fcaf',
        'v0.6.9+commit.3e3065ac',
        'v0.6.8+commit.0bbfe453',
        'v0.6.7+commit.b8d736ae',
        'v0.6.6+commit.6c089d02',
        'v0.6.5+commit.f956cc89',
        'v0.6.4+commit.1dca32f3',
        'v0.6.3+commit.8dda9521',
        'v0.6.2+commit.bacdbe57',
        'v0.6.1+commit.e6f7d5a4',
        'v0.6.0+commit.26b70077'
    ],
    '0.5': [
        'v0.5.17+commit.d19bba13',
        'v0.5.16+commit.9c3226ce',
        'v0.5.15+commit.6a57276f',
        'v0.5.14+commit.01f1aaa4',
        'v0.5.13+commit.5b0b510c',
        'v0.5.12+commit.7709ece9',
        'v0.5.11+commit.22be8592',
        'v0.5.11+commit.c082d0b4',
        'v0.5.10+commit.5a6ea5b1',
        'v0.5.9+commit.c68bc34e',
        'v0.5.9+commit.e560f70d',
        'v0.5.8+commit.23d335f2',
        'v0.5.7+commit.6da8b019',
        'v0.5.6+commit.b259423e',
        'v0.5.5+commit.47a71e8f',
        'v0.5.4+commit.9549d8ff',
        'v0.5.3+commit.10d17f24',
        'v0.5.2+commit.1df8f40c',
        'v0.5.1+commit.c8a2cb62',
        'v0.5.0+commit.1d4f565a'
    ],
    '0.4': [
        'v0.4.26+commit.4563c3fc',
        'v0.4.25+commit.59dbf8f1',
        'v0.4.24+commit.e67f0147',
        'v0.4.23+commit.124ca40d',
        'v0.4.22+commit.4cb486ee',
        'v0.4.21+commit.dfe3193c',
        'v0.4.20+commit.3155dd80',
        'v0.4.19+commit.c4cbbb05',
        'v0.4.18+commit.9cf6e910',
        'v0.4.17+commit.bdeb9e52',
        'v0.4.16+commit.d7661dd9',
        'v0.4.15+commit.8b45bddb',
        'v0.4.15+commit.bbb8e64f',
        'v0.4.14+commit.c2215d46',
        'v0.4.13+commit.0fb4cb1a',
        'v0.4.12+commit.194ff033',
        'v0.4.11+commit.68ef5810'
    ]
};