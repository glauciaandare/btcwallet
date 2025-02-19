// importando as depencências
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// definir a rede
// bitcoin - rede principal - mainnet
// testnet - rede de teste - testnet
const network = bitcoin.networks.testnet

//derivação de carteiras
const path = "m/49'/1'/0'/0"

//criando mnemônico para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//Criando uma conta - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAdress = bitcoin.payments.p2wpkh({
    pubkey: account.publicKey,
    network: network,
}).address

console.log('Carteira Gerada')
console.log('Endereço: ', btcAdress)
console.log('Chave Privada: ', account.toWIF())
console.log('Seed: ', mnemonic)
