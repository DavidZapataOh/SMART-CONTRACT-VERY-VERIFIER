import axios from 'axios';

/**
 * Verifica el contrato inteligente en la blockchain seleccionada.
 * @param {Object} data - Información del contrato a verificar.
 * @returns {Promise<Object>} Resultado de la verificación.
 */
export async function verifyContract(data) {
    // Determinar la URL del API de verificación según la blockchain seleccionada
    let apiUrl;
    switch (data.blockchain) {
        case 'Ethereum':
            apiUrl = `https://api.etherscan.io/api`;
            break;
        case 'Sepolia (Ethereum Testnet)':
            apiUrl = `https://api-sepolia.etherscan.io/api`;
            break;
        case 'Polygon':
            apiUrl = `https://api.polygonscan.com/api`;
            break;
        case 'Amoy (Polygon Testnet)':
            apiUrl = `https://api-testnet.polygonscan.com/api`;
            break;
        case 'Arbitrum':
            apiUrl = `https://api.arbiscan.io/api`;
            break;
        case 'Arbitrum Goerli Testnet':
            apiUrl = `https://api-goerli.arbiscan.io/api`;
            break;
        case 'Scroll':
            apiUrl = `https://blockscout.scroll.io/api`;
            break;
        case 'Scroll Testnet':
            apiUrl = `https://blockscout.scroll.io/api?testnet`;
            break;
        case 'Base':
            apiUrl = `https://api.basescan.org/api`;
            break;
        case 'Base Goerli Testnet':
            apiUrl = `https://api-goerli.basescan.org/api`;
            break;
        case 'Optimism':
            apiUrl = `https://api-optimistic.etherscan.io/api`;
            break;
        case 'Optimism Goerli Testnet':
            apiUrl = `https://api-goerli-optimistic.etherscan.io/api`;
            break;
        case 'Avalanche':
            apiUrl = `https://api.snowtrace.io/api`;
            break;
        case 'Fuji (Avalanche Testnet)':
            apiUrl = `https://api-testnet.snowtrace.io/api`;
            break;
        case 'Binance Smart Chain':
            apiUrl = `https://api.bscscan.com/api`;
            break;
        case 'BSC Testnet':
            apiUrl = `https://api-testnet.bscscan.com/api`;
            break;
        default: throw new Error('Blockchain no soportada.');
    }

    // Configurar los parámetros de la solicitud de verificación
    const params = new URLSearchParams();
    params.append('apikey', data.apiKey);
    params.append('module', 'contract');
    params.append('action', 'verifysourcecode');
    params.append('contractaddress', data.contractAddress);
    params.append('sourceCode', data.sourceCode);
    params.append('contractname', data.contractName);
    params.append('compilerversion', data.compilerVersion);
    params.append('optimizationUsed', data.optimizer ? '1' : '0');
    params.append('runs', data.optimizer ? data.runs.toString() : '200');
    params.append('constructorArguements', data.constructorArgs);
    params.append('codeformat', 'solidity-single-file');
    params.append('licenseType', data.licenseType.toString());

    //console.log("Parámetros enviados:", params);

    // Enviar la solicitud de verificación al explorador de bloques
    try {
        const response = await axios.post(apiUrl, params);
        //console.log("Respuesta completa de la API:", response.data);
      
        // Verificar si el contrato ya está verificado aunque devuelva 'NOTOK'
        if (response.data.status === '0' && response.data.result === 'Contract source code already verified') {
            return { success: true, message: 'Contrato ya está verificado en el explorador de bloques.' };
        } else if (response.data.status === '1') {
            return { success: true, message: '¡Contrato verificado exitosamente!' };
        } else {
            return { success: false, message: response.data.result };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
}
