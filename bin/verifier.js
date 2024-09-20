#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';
import ora from 'ora';
import { compileContract, getConstructorArgsABI, solidityVersions } from '../src/utils.js';
import { verifyContract } from '../src/index.js';

/**
 * Muestra el título de la aplicación junto con información del desarrollador.
 */
function displayTitle() {
    console.log(
        chalk.cyan(figlet.textSync('Contract Verifier', { horizontalLayout: 'default' }))
    );
    console.log(
        chalk.greenBright('Desarrollado por ') +
        chalk.redBright('DavidZO') +
        chalk.greenBright(' | ') +
        chalk.blueBright('Twitter: ') +
        chalk.cyanBright('https://x.com/DavidZapataOh') +
        '\n'
    );
}

/**
 * Solicita al usuario los datos necesarios para la verificación del contrato.
 * @returns {Promise<Object>} Respuestas proporcionadas por el usuario.
 */
async function promptUser() {
    const questions = [
        {
            type: 'list',
            name: 'blockchain',
            message: 'Selecciona la blockchain donde está desplegado tu contrato:',
            choices: [
                'Ethereum', 'Sepolia (Ethereum Testnet)',
                'Polygon', 'Amoy (Polygon Testnet)',
                'Arbitrum', 'Arbitrum Goerli Testnet',
                'Scroll', 'Scroll Testnet',
                'Base', 'Base Goerli Testnet',
                'Optimism', 'Optimism Goerli Testnet',
                'Avalanche', 'Fuji (Avalanche Testnet)',
                'Binance Smart Chain', 'BSC Testnet'
            ]
        },
        {
            type: 'input',
            name: 'apiKey',
            message: 'Introduce tu API Key del explorador de bloques (Etherscan, Snowtrace, BscScan, etc.):',
        },
        {
            type: 'input',
            name: 'contractAddress',
            message: 'Introduce la dirección del contrato que deseas verificar:',
        },
        {
            type: 'input',
            name: 'contractName',
            message: 'Introduce el nombre del contrato (exactamente como está en el código fuente):',
        },
        {
            type: 'list',
            name: 'compilerMajorVersion',
            message: 'Selecciona el segundo dígito de la versión del compilador:',
            choices: Object.keys(solidityVersions)
        },
        {
            type: 'list',
            name: 'compilerVersion',
            message: 'Selecciona la versión completa del compilador:',
            choices: (answers) => solidityVersions[answers.compilerMajorVersion]
        },
        {
            type: 'confirm',
            name: 'optimizer',
            message: '¿Usaste el optimizador del compilador?',
        },
        {
            type: 'input',
            name: 'runs',
            message: '¿Cuántas ejecuciones (runs) configuraste para el optimizador?',
            when: (answers) => answers.optimizer,
            default: 200
        },
        {
            type: 'list',
            name: 'licenseType',
            message: 'Selecciona la licencia para tu contrato:',
            choices: [
                { name: 'No License', value: 1 },
                { name: 'MIT', value: 3 },
                { name: 'GPL-2.0', value: 4 },
                { name: 'GPL-3.0', value: 5 },
                { name: 'LGPL-2.1', value: 6 },
                { name: 'LGPL-3.0', value: 7 },
                { name: 'BSD-2-Clause', value: 8 },
                { name: 'BSD-3-Clause', value: 9 },
                { name: 'MPL-2.0', value: 10 },
                { name: 'Unlicense', value: 11 }
            ],
            default: 3
        },
        {
            type: 'editor',
            name: 'sourceCode',
            message: 'Introduce el código fuente de tu contrato en Solidity:',
        }
    ];
  
    return await inquirer.prompt(questions);
  }

/**
 * Muestra mensajes explicativos con un spinner y un retraso simulado.
 * @param {ora.Ora} spinner - Instancia del spinner de ora.
 * @param {string} message - Mensaje a mostrar.
 * @param {number} delay - Tiempo en milisegundos para simular el retraso.
 */
async function explainStep(spinner, message, delay = 3000) {
    spinner.text = message;
    await new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * Función principal que ejecuta la lógica del verificador de contratos inteligentes.
 */
async function main() {
    displayTitle();
    const userInputs = await promptUser();
    const spinner = ora().start();

    try {
        // Compilar el contrato para obtener ABI y bytecode
        const contract = await compileContract(userInputs.sourceCode, userInputs.contractName, userInputs.compilerVersion);
        const abi = contract.abi;

        // Obtener los argumentos codificados del constructor
        const constructorArgs = getConstructorArgsABI(abi);
        userInputs.constructorArgs = constructorArgs;

        await explainStep(spinner, 'Verificando contrato...');
        const verificationResult = await verifyContract(userInputs);

        if (verificationResult.success) {
            spinner.succeed('¡Contrato verificado exitosamente!');
        } else {
            spinner.fail(`Error al verificar el contrato: ${verificationResult.message}`);
        }
    } catch (error) {
        spinner.fail(`Ocurrió un error: ${error.message}`);
    }
}

main();
